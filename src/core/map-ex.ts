import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import MapBrowserEvent from "ol/MapBrowserEvent";
import { Marker, MarkerLayer } from "./models";
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

    render(element: HTMLElement){
        this.map.setTarget(element);
    }

    onMapClick = (ev: MapBrowserEvent) => {
        console.log("map clicked!!");
    }

    addLayer(layer: MarkerLayer) {
        
        let olFeatures = layer.markers.map(m => this.convertMakerToFeature(m, layer.iconUrl));

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
    
    private convertMakerToFeature(marker: Marker, iconUrl: string): Feature {
        let point = new Point(fromLonLat([marker.point.lon, marker.point.lat], this.view.getProjection()));
        console.log(point);
        let feature = new Feature(point);
        
        let text = new Text({ 
            text: marker.name, 
            fill: new Fill({color: "black"})
        }); 
        
        feature.setStyle(new Style({ 
            image: new Icon({
                src: iconUrl
            }),
            text: text 
        }));

        return feature;
    }

    

}
