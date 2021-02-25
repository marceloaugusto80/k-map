import * as React from "react";
import { LayerFactory } from "../core/layer-factory";
import { MarkerLayer } from "../core/models";


interface Props {
    onAddLayers?: (layers: MarkerLayer[]) => void;
}

interface State {
    isDragging: boolean;
    message: string;
}

export default class FileOpenDialog extends React.Component<Props, State> {
    
    private fileInputRef: React.RefObject<HTMLInputElement>;
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            isDragging: false,
            message: ""
        };
        
        this.fileInputRef = React.createRef<HTMLInputElement>();
        
    }
    
    addLayers = async (fileList: FileList) => {
        if(!this.props.onAddLayers) return;
        const files = Array.from(fileList);
        let counter = 0;
        const result = new Array<MarkerLayer>(files.length);
        for(const file of files) {
            try {
                const layer = await LayerFactory.createFormKmlFileAsync(file);
                result[counter] = layer;
                counter++
            }
            catch(err) {
                // TODO handle exception
            }
        }
        this.props.onAddLayers(result.filter(l => !!l));
    }

    onOpenFileClick = () => {
        if(this.fileInputRef) {
            this.fileInputRef.current?.click()
        }
    }

    onFilesSelected = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = ev.currentTarget;
        if(files) await this.addLayers(files);
    }

    onDragEnter = () => {
        this.setState({ isDragging: true });
    }

    onDragExit = () => {
        this.setState({ isDragging: false})
    }

    onDrop = async (ev: React.DragEvent) => {
        ev.preventDefault();
        const { files } = ev.dataTransfer;
        if(files) await this.addLayers(files);
    }

    onDragOver = (ev: React.DragEvent) => {
        ev.preventDefault();
    }

    render() {
        return (
            <div 
                style={{
                    display: "grid",
                    gridTemplateRows: "auto 1fr auto",
                    minWidth: "50%",
                    minHeight: "50%"
                }}
                onDragEnter={this.onDragEnter} 
                onDragExit={this.onDragExit}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop} >
                
                <div>
                    {this.state.message}
                </div>

                <div>
                    <button onClick={this.onOpenFileClick}>Open...</button>
                </div>
                
                <input 
                type="file" 
                accept=".kml"
                style={{display: "none"}} 
                onChange={this.onFilesSelected} 
                ref={this.fileInputRef} />
            
            </div>
        );
    }
}



const passiveStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderWidth: "2px",
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#00000088"
}


const dragStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderWidth: "2px",
    borderColor: "black",
    borderStyle: "dotted",
    backgroundColor: "#00000088"
}