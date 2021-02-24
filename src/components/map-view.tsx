import React from "react";
import MapEx from "../core/map-ex";
import { IconConfig, MarkerLayer } from "../core/models";
import KmlDropper from "./kml-dropper";
import LayerList from "./layer-list";
import { Button, Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import "../core/string-extensions";
import IconConfigurator from "./icon-configurator";


interface State {
    layerNames: string[];
    isImportWindowOpen: boolean;
    isLayerConfigOpen: boolean;
    layerConfigLocation: [number, number];
}

let counter = 0;

export default class MapView extends React.PureComponent<{}, State> {

    map: MapEx;

    constructor(props: any) {
        super(props);

        this.state = {
            layerNames: [],
            isImportWindowOpen: false,
            isLayerConfigOpen: false,
            layerConfigLocation: [0, 0]
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
    
    onDropKml = async (layers: MarkerLayer[]) => {
        for(const layer of layers) {
            layer.name = layer.name.autoRename(this.state.layerNames);
            this.setState({ layerNames: [... this.state.layerNames, layer.name]});
            this.map.addLayer(layer);
        }
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

    onImportClick = () => {
        this.setState({isImportWindowOpen: !this.state.isImportWindowOpen});
    }

    onLayerConfig = (layerName: string, x: number, y: number) => {
        
        this.setState({isLayerConfigOpen: !this.state.isLayerConfigOpen, layerConfigLocation: [x, y]});
    }

    onLayerConfigAccept = (config: IconConfig) => {
        console.log(config);
    }

    render() {

            return (
                
                <div>

                    <div id="map" ref={this.onMapRender} className="map"></div>
                
                    <div className="layer-list">
                        <Button style={{display: "block"}} onClick={this.onImportClick} >Import</Button>
                        <LayerList 
                            layerNames={this.state.layerNames} 
                            onLayerRemove={this.onLayerRemove}
                            onLayerConfig={this.onLayerConfig}/>
                    </div>

                    <Dialog 
                    open={this.state.isImportWindowOpen} 
                    onClose={()=>this.setState({isImportWindowOpen: false})}>
                        <DialogTitle>Import file</DialogTitle>
                        <DialogContent>
                            <KmlDropper onDrop={this.onDropKml} />
                        </DialogContent>
                    </Dialog>
                    { this.state.isLayerConfigOpen && 
                        <div style={{
                            position: "absolute",
                            left: this.state.layerConfigLocation[0],
                            top: this.state.layerConfigLocation[1],
                        }}>
                            <IconConfigurator onAccept={this.onLayerConfigAccept} /> 
                        </div>
                    }
                </div>
            );
    }
}



const uiGridStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    margin: "8px"

}

