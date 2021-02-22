import React from "react";
import MapEx from "../core/map-ex";
import { MarkerLayer } from "../core/models";
import KmlDropper from "./kml-dropper";
import LayerList from "./layer-list";
import "../core/string-extensions";


interface State {
    layerNames: string[]
}

let counter = 0;

export default class MapView extends React.PureComponent<{}, State> {

    map: MapEx;

    constructor(props: any) {
        super(props);

        this.state = {
            layerNames: []
        };

        this.map = new MapEx();
    }

    onMapRender = (instance: HTMLDivElement | null) => {
        
        if(!instance) {
            console.error("map ref is not defined, dumbass!")
            return;
        }

        this.map.render(instance);

        console.log("Map rendered");
    }

    addLayer = (layer: MarkerLayer) => {
       
        layer.name = layer.name.autoRename(this.state.layerNames);
        this.setState({ layerNames: [... this.state.layerNames, layer.name]});
        this.map.addLayer(layer);
    }
    
    onDropKml = async (layers: MarkerLayer[]) => {
        for(const layer of layers) {
            this.addLayer(layer);
        }
    }

    onLayerAdd = () => {

        let layer: MarkerLayer = {
            icon: { color: "blue", height: 30, width: 30, type: "circle"},
            name: `Layer`,
            markers: [
                { name: "Marker 1", description: "Marker 1", point: {lon: 30, lat: 10 }},
                { name: "Marker 2", description: "Marker 2", point: {lon: 40, lat: 40 }},
                { name: "Marker 3", description: "Marker 3", point: {lon: 20, lat: 30 }},
            ]
        };

        this.addLayer(layer);


    }

    onLayerRemove = (layerName: string) => {

        if(!confirm(`Remove layer ${layerName}?`)) return;

        try {

            this.map.removeLayer(layerName);
            this.setState({ layerNames: this.state.layerNames.filter(l => l != layerName)});
        }
        catch(error: unknown) {
            console.error(error);
        }
    }

    render() {

            return (
                
                <div>

                    <div id="map" style={mapStyle} ref={this.onMapRender}></div>

                    <div style={uiGridStyle} >
                        <div>
                            <LayerList 
                                layerNames={this.state.layerNames} 
                                onLayerRemove={this.onLayerRemove} 
                                onAddNewLayer={this.onLayerAdd}/>
                        </div>
                        <div>
                            <KmlDropper onDrop={this.onDropKml} />
                        </div>
                    </div>

                </div>
            );
    }
}


const mapStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%"
}

const uiGridStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    margin: "8px"

}

