import * as React from "react";
import FileOpenDialog from "./components/file-opener-dialog";
import LayerList from "./components/layer-list";
import MapView from "./components/map-view";
import { LayerFactory } from "./core/layer-factory";
import { MarkerIconStyle, MarkerLayer } from "./core/models";
import "./core/string-extensions";
import _ from "lodash";
import ImageCrop from "./components/image-crop";
import Modal from "./components/modal";
import { ImageManager } from "./core/image-manager";

interface AppState {
    markerLayers: MarkerLayer[];
    isImportWindowOpen: boolean;
    mapScreenShot?: string;
    crop?: ReactCrop.Crop;
}

export default class App extends React.PureComponent<{}, AppState> {

    private mapRef: HTMLElement | null;

    constructor(props: any) {
        super(props);

        this.mapRef = null;
        
        this.state = {
            markerLayers: [],
            isImportWindowOpen: false
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

    onMapCapture = async () => {
        if(!this.mapRef) throw Error("Can't find reference of map wrapper.");
        const dataUrl = await ImageManager.screenshotElement(this.mapRef);
        this.setState({mapScreenShot: dataUrl})
    }


    render() {
        return (
            <React.Fragment>

                <div style={mapWrapperStyle} ref={(e) => this.mapRef = e}>
                    <MapView layers={this.state.markerLayers} onCapture={this.onMapCapture}/>
                </div>

                <div style={layerListWrapperStyle}>
                    <LayerList 
                        onAddLayer={this.toggleOpenFileDialog}
                        onLayerRemove={this.onLayerRemove} 
                        onApplyLayerStyle={this.onApplyLayerStyle}
                        layerNames={this.state.markerLayers.map(l => l.name)} />
                </div>
               
                <Modal isOpen={this.state.isImportWindowOpen} onClose={() => this.setState({isImportWindowOpen: false})}>
                    <div style={fileDialogWrapperStyle}>
                        <FileOpenDialog onOpenFiles={this.onOpenFiles} />
                    </div>
                </Modal>

                <Modal isOpen={!!this.state.mapScreenShot} onClose={() => this.setState({mapScreenShot: undefined})}>
                    <div className="crop-modal">
                        <ImageCrop source={this.state.mapScreenShot}/>
                    </div>
                </Modal>

                <div style={captureButtonWrapperStyle} >
                    <button onClick={this.onMapCapture}>Capture</button>
                </div>

            </React.Fragment>

        )
    }
}

const mapWrapperStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    margin: "0px"
};

const layerListWrapperStyle: React.CSSProperties = {
    position: "absolute",
    width: "200px",
    top: "8px",
    left: "8px",
};


const captureButtonWrapperStyle: React.CSSProperties = {
    position: "absolute",
    right: "8px",
    bottom: "8px",
};

const fileDialogWrapperStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "8px",
}