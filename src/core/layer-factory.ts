import KmlReader from "./kml-reader";
import { MarkerIconStyle, MarkerLayer } from "./models";
import "./file-extensions";

export namespace LayerFactory {
    
    const defaultMarkerIconStyle: MarkerIconStyle = {
        color: "red",
        height: 16,
        width: 16,
        type: "circle",
    };

    export async function createFormKmlFileAsync(kmlFile: File, style?: MarkerIconStyle) {

        try {
            
            if(!kmlFile.name.endsWith(".kml")) throw new Error("File must have a .kml extension.");

            const kmlReader = new KmlReader();
            const markers = await kmlReader.parseFileAsync(kmlFile.path);
            
            const layer: MarkerLayer = {
                icon: style || defaultMarkerIconStyle,
                markers: markers,
                name: kmlFile.getFilenameWithoutExtension()
            };

            return layer;

        } catch (error) {
            throw error;
        }

    }


} // end namespace