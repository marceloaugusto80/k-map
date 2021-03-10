import * as ol from "ol";
import * as olStyle from "ol/style";
import * as olGeom from "ol/geom";
import * as olSource from "ol/source";
import TileLayer from "ol/layer/Tile";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import * as OlControl from "ol/control"
import _ from "lodash";
import { MarkerLayer } from "./models";
import { IconFactory } from "./icon-factory";


export default class MapEx {
    private layerNames: string[];
    private map: ol.Map;
    private view: ol.View;

    constructor() {
        this.layerNames = [];
        let mapLayers = [
            new TileLayer({
                source: new olSource.OSM()
            })];
        
        this.view = new ol.View({
            center: [0, 0],
            zoom: 1
        });
        
        this.map = new ol.Map({
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
    
    /**
     * Add a layer to the map, if there's no name collision.
     * @param layer layer to add, if there's no name collision.
     */
    tryAddLayer(layer: MarkerLayer) {
        
        if(this.layerNames.indexOf(layer.name) != -1) return; 

        const olIcon = new olStyle.Icon({
            src: IconFactory.createSvgUrlData(layer.icon)
        });

        let olFeatures = layer.markers.map(
            m => this.convertMakerToFeature(m.point.lon, m.point.lat, m.name, layer.icon.width / 2, olIcon));

        let olLayer = new VectorLayer({
            className: layer.name,
            source: new VectorSource<olGeom.Geometry>({
                features: olFeatures
            }),
        });

        this.map.addLayer(olLayer);
        this.layerNames.push(layer.name);

    }

    clearLayers() {
        for(const layerName of this.layerNames) {
            this.removeLayer(layerName);
        }
        this.layerNames = [];
    }

    hasLayer(layeName: string) {
        return this.layerNames.indexOf(layeName) != -1;
    }

    removeLayer(layerName: string) {
        let targetOlLayer = this.map.getLayers().getArray().find((l => l.getClassName() == layerName));
        if(!targetOlLayer) {
            throw new Error(`Could not find layer named '${layerName}'`);
        }
        this.map.removeLayer(targetOlLayer);
        this.layerNames = _.remove(this.layerNames, layerName);
    }

    render(element: HTMLElement){
        this.map.setTarget(element);
    }

    private onMapClick = (ev: ol.MapBrowserEvent) => {
        console.log("map clicked!!");
    }
    
    private convertMakerToFeature(
        lon: number, lat: number, caption: string, captionOffset: number, icon: olStyle.Icon): ol.Feature {
    
        let point = new olGeom.Point(fromLonLat([lon, lat], this.view.getProjection()));
    
        let feature = new ol.Feature(point);
        
        let text = new olStyle.Text({
            offsetX: captionOffset,
            text: caption,
            textAlign: "left",
            fill: new olStyle.Fill({color: "black"})
        }); 
        
        feature.setStyle(new olStyle.Style({ 
            image: icon,
            text: text 
        }));
    
        return feature;
    }
}


