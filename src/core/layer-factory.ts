import KmlReader from "./kml-reader";
import { MarkerLayer } from "./models";
import "./file-extensions";

export namespace LayerFactory {

    export async function createFormKmlFileAsync(kmlFile: File) {

        try {
            
            if(!kmlFile.name.endsWith(".kml")) throw new Error("File must have a .kml extension.");

            const kmlReader = new KmlReader();
            const markers = await kmlReader.parseFileAsync(kmlFile.path);
            
            const layer: MarkerLayer = {
                icon: { type: "circle", width: 40, height: 40, color: "red" },
                markers: markers,
                name: kmlFile.getFilenameWithoutExtension()
            };

            return layer;

        } catch (error) {
            throw error;
        }

    }


} // end namespace