import { clipboard, nativeImage } from "electron";
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
    
    export async function cropToClipboard(dataUrl: string, x: number, y: number, w: number, h: number): Promise<void> {
        return new Promise<void>((res, rej) => {
            
            try {
                const image = nativeImage.createFromDataURL(dataUrl);
                clipboard.writeImage(image, "clipboard");
                res();
            } catch (error) {
                rej(error);
            }

        });
    }

}