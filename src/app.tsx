import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import * as React from "react";
import FileOpenDialog from "./components/file-opener-dialog";
import LayerList from "./components/layer-list";
import MapView from "./components/map-view";
import { MarkerIconStyle, MarkerLayer } from "./core/models";

interface AppState {
    markerLayers: MarkerLayer[];
    isImportWindowOpen: boolean;
}


export default class App extends React.PureComponent<{}, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            markerLayers: [],
            isImportWindowOpen: false,
        };
    }

    toggleOpenFileDialog = () => {
        this.setState(prev => {
            return {isImportWindowOpen: !prev.isImportWindowOpen};
        });
    }

    onLayerRemove = (layerName: string) => {
        console.error("not implemented");
    }
    
    onAddLayers = (layers: MarkerLayer[]) => {
        const foo = [1, 3];
        const bar = [3, 4];
        const foobar = [...foo, bar];
        this.setState((prev) => {
            return { markerLayers: [...prev.markerLayers, ...layers]};
        });
    }
    
    onApplyLayerStyle = (layerName: string, style: MarkerIconStyle) => {
        console.error("not implemented");
    }

    render() {
        return (
            <div>
                
                <div style={{position: "absolute", width: "100%", height: "100%" }}>
                    <MapView layers={this.state.markerLayers}/>
                </div>
                
                <div style={{ position: "absolute", top: 12, left: 12, width: 100, height: 100 }}>
                    <LayerList 
                        onAddLayer={this.toggleOpenFileDialog}
                        onLayerRemove={this.onLayerRemove} 
                        onApplyLayerStyle={this.onApplyLayerStyle}
                        layerNames={this.state.markerLayers.map(l => l.name)} />
                </div>

                <Dialog 
                    open={this.state.isImportWindowOpen} 
                    onClose={()=>this.setState({isImportWindowOpen: false})}>
                    <DialogTitle>Import file</DialogTitle>
                    <DialogContent>
                        <FileOpenDialog onAddLayers={this.onAddLayers} />
                    </DialogContent>
                </Dialog>
            
            </div>

        )
    }

}