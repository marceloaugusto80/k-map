import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import MapBrowserEvent from "ol/MapBrowserEvent";
import { IconConfig, Marker, MarkerLayer } from "./models";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Geometry from "ol/geom/Geometry";
import Fill from "ol/style/Fill";
import { fromLonLat } from "ol/proj";
import Icon from "ol/style/Icon"
import * as OlControl from "ol/control"
import { IconFactory } from "./icon-factory";



export default class MapEx {

    private map: OlMap;
    private view: View;

    constructor() {
        let mapLayers = [
            new TileLayer({
                source: new OSM()
            })];
        
        this.view = new View({
            center: [0, 0],
            zoom: 1
        });

        this.map = new OlMap({
            view: this.view,
            layers: mapLayers,
            controls: OlControl.defaults({
                attribution: false,
                zoom: false,
                rotate: false
            })
        });

        this.map.on("click", this.onMapClick)
    }
    
    addLayer(layer: MarkerLayer) {
        
        const olIcon = new Icon({
            src: IconFactory.createSvgUrlData(layer.icon)
        });

        let olFeatures = layer.markers.map(
            m => this.convertMakerToFeature(m.point.lon, m.point.lat, m.name, layer.icon.width / 2, olIcon));

        let olLayer = new VectorLayer({
            className: layer.name,
            source: new VectorSource<Geometry>({
                features: olFeatures
            }),
        });

        this.map.addLayer(olLayer);

    }

    removeLayer(layerName: string) {
        let targetOlLayer = this.map.getLayers().getArray().find((l => l.getClassName() == layerName));
        if(!targetOlLayer) {
            throw new Error(`Could not find layer named '${layerName}'`);
        }
        this.map.removeLayer(targetOlLayer);
    }

    exportImage() {
        // use ol-ext
    }

    render(element: HTMLElement){
        this.map.setTarget(element);
    }

    private onMapClick = (ev: MapBrowserEvent) => {
        console.log("map clicked!!");
    }
    
    private convertMakerToFeature(lon: number, lat: number, caption: string, captionOffset: number, icon: Icon): Feature {
    
        let point = new Point(fromLonLat([lon, lat], this.view.getProjection()));
    
        let feature = new Feature(point);
        
        let text = new Text({
            offsetX: captionOffset,
            text: caption,
            textAlign: "left",
            fill: new Fill({color: "black"})
        }); 
        
        feature.setStyle(new Style({ 
            image: icon,
            text: text 
        }));
    
        return feature;
    }
}


