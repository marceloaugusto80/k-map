import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import * as React from "react";
import FileOpenDialog from "./components/file-opener-dialog";
import LayerList from "./components/layer-list";
import MapView from "./components/map-view";
import { LayerFactory } from "./core/layer-factory";
import { MarkerIconStyle, MarkerLayer } from "./core/models";
import "./core/string-extensions";
import _ from "lodash";

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
       this.setState(prevState => {
           const updatedMarkers = _.remove(prevState.markerLayers, i => i.name != layerName);
           return { markerLayers: updatedMarkers };
       });
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
        this.setState(prevState => {
            const { markerLayers } = prevState;
            const targetIdx = _.findIndex(markerLayers, l => l.name == layerName);
            if(targetIdx < 0) return null;
            let targetLayer = markerLayers[targetIdx];
            targetLayer.icon = style;
            const updatedLayers = markerLayers.splice(targetIdx, 1, targetLayer);            
            return { markerLayers: updatedLayers };
        });
    }

    render() {
        return (
            <React.Fragment>

                <MapView layers={this.state.markerLayers}/>
            
                <LayerList 
                    onAddLayer={this.toggleOpenFileDialog}
                    onLayerRemove={this.onLayerRemove} 
                    onApplyLayerStyle={this.onApplyLayerStyle}
                    layerNames={this.state.markerLayers.map(l => l.name)} />

                <Dialog 
                    open={this.state.isImportWindowOpen} 
                    onClose={()=>this.setState({isImportWindowOpen: false})}>
                    <DialogTitle>Import file</DialogTitle>
                    <DialogContent>
                        <FileOpenDialog onOpenFiles={this.onOpenFiles} />
                    </DialogContent>
                </Dialog>
            
            </React.Fragment>

        )
    }

}