import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import * as React from "react";
import FileOpenDialog from "./components/file-opener-dialog";
import LayerList from "./components/layer-list";
import MapView from "./components/map-view";
import { LayerFactory } from "./core/layer-factory";
import { MarkerIconStyle, MarkerLayer } from "./core/models";
import "./core/string-extensions";

interface AppState {
    markerLayers: MarkerLayer[];
    isImportWindowOpen: boolean;
}

const defaultMarkerIconStyle: MarkerIconStyle = {
    color: "red",
    height: 16,
    width: 16,
    type: "circle",
};


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
    
    onOpenFiles = async (fileList: FileList) => {
        this.setState({isImportWindowOpen: false});
        const files = Array.from(fileList);
       
        const newLayers = new Array<MarkerLayer>();
        const alreadyUsedLayerNames = this.state.markerLayers.map(l => l.name);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            try {
                const layer = await LayerFactory.createFormKmlFileAsync(file);
                layer.name = layer.name.autoRename(alreadyUsedLayerNames);
                alreadyUsedLayerNames.push(layer.name);
                newLayers.push(layer);
            }
            catch(err) {
                // TODO handle exception
                console.error(err);
            }
            
        }

        this.setState((prev) => {
            return { markerLayers: [...prev.markerLayers, ...newLayers]};
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
                        <FileOpenDialog onOpenFiles={this.onOpenFiles} />
                    </DialogContent>
                </Dialog>
            
            </div>

        )
    }

}