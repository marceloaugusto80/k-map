import { clipboard, nativeImage, Rectangle } from "electron";
import html2canvas from "html2canvas";
import Html2ToCanvas from "html2canvas";

export namespace ImageManager {

    async function crop(dataUrl: string, x: number, y: number, w: number, h: number): Promise<Buffer> {
        return new Promise<Buffer>((res, rej) => {
            try {
                
            }
            catch(e) {
                rej(e);
            }
        });
    }

    export async function screenshotElement(element: HTMLElement) {
        try {
            const canvas = await html2canvas(element);
            return canvas.toDataURL("image/jpeg", 1);
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Crop image and paste into the clipboard.
     * @param dataUrl The image data.
     * @param x crop x coordinates in percentage.
     * @param y crop y coordinates in percentage.
     * @param w crop width in percentage
     * @param h crop height in percentage
     * @returns Async action.
     */
    export async function cropToClipboard(dataUrl: string, x: number, y: number, w: number, h: number): Promise<void> {
        return new Promise<void>((res, rej) => {
            
            try {
                const image = nativeImage.createFromDataURL(dataUrl);
                if(x == 0 && y == 0 && w == 0 && h == 0) {
                    clipboard.writeImage(image, "clipboard");
                    res();
                    return;
                }

                const imageSize = image.getSize();
                const croppedImage = image.crop({
                    height: Math.floor(h * imageSize.height / 100), 
                    width: Math.floor(w * imageSize.width / 100), 
                    x: Math.floor(x * imageSize.width / 100), 
                    y: Math.floor(y * imageSize.height / 100)
                });
                clipboard.writeImage(croppedImage, "clipboard");
                res();

            } catch (error) {
                rej(error);
            }

        }); // end promise
    }

}