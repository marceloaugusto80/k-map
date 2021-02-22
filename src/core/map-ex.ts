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
            src: createSvgUrlData(layer.icon)
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
            scale: 2,
            fill: new Fill({color: "black"})
        }); 
        
        feature.setStyle(new Style({ 
            image: icon,
            text: text 
        }));
    
        return feature;
    }
}




function createSvgUrlData(iconConfig: IconConfig) {

    let rawSvg = "";

    switch (iconConfig.type) {
        case "place":
            rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="${iconConfig.width}px" height="${iconConfig.height}px" viewBox="0 0 600 600">
        <g><path d="M263.278,0.107C158.977-3.408,73.323,80.095,73.323,183.602c0,117.469,112.73,202.72,175.915,325.322
                c3.208,6.225,12.169,6.233,15.388,0.009c57.16-110.317,154.854-184.291,172.959-290.569
                C456.331,108.387,374.776,3.866,263.278,0.107z M256.923,279.773c-53.113,0-96.171-43.059-96.171-96.171
                s43.059-96.171,96.171-96.171c53.113,0,96.172,43.059,96.172,96.171S310.036,279.773,256.923,279.773z"/></g></svg>`;
            // needs to set color
            break;
            
        default:
            rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="iconBase" width="${iconConfig.width}px" height="${iconConfig.height}px"><circle cx="${iconConfig.width / 2}px" cy="${iconConfig.height / 2}px" r="${(iconConfig.width / 2) - 1}px" stroke="${iconConfig.color}px" stroke-width="1" fill="red" /></svg>`;
            break;
    }
    
    return `data:image/svg+xml;utf8,${rawSvg}`;

};
