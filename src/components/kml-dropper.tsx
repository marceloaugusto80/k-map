import * as React from "react";
import { KmlReader } from "../core/kml-reader";
import { Marker, MarkerLayer } from "../core/models";
import path from "path";

interface Props {
    onDrop: (layer: MarkerLayer[]) => void;
}

interface State {
    isDragging: boolean;
    message: string;
}

export default class KmlDropper extends React.Component<Props, State> {
    
    private fileInputRef: React.RefObject<HTMLInputElement>;
    
    constructor(props: Props) {
        super(props);
        
        this.state = {
            isDragging: false,
            message: ""
        };
        
        this.fileInputRef = React.createRef<HTMLInputElement>();
        
    }
    
    createLayerFromFiless = async (fileList: FileList) => {
        
        let files = Array.from(fileList);
        let kmlFiles = files.filter(f => f.name.endsWith(".kml"));
        
        if(kmlFiles.length < 1){
            this.setState({message: "Error: No kml files detected"});
            return;
        }

        let layers = new Array<MarkerLayer>();

        for(let i = 0; i < kmlFiles.length; i++)
        {
            try {
                const curFile = kmlFiles[i];
                const reader = new KmlReader();
                
                this.setState({message: `Parsing file ${i+1}/${kmlFiles.length}...`});
                let markers = await reader.parseFileAsync(curFile.path);
                layers.push({
                    iconUrl: "resources/markers/circle.svg",
                    markers: markers,
                    name: path.basename(curFile.path)
                });
                this.setState({message: ""});
                
            } catch (error) {
                
                this.setState({message: `Error: ${error?.message}...`});
                
            }
            
        }
        
        this.props.onDrop(layers);

    }

    onOpenFileClick = () => {
        if(this.fileInputRef) {
            this.fileInputRef.current?.click()
        }
    }

    onFileChosen = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if(ev.currentTarget.files) {
            await this.createLayerFromFiless(ev.currentTarget.files);
        }
    }

    onDragEnter = () => {
        this.setState({ isDragging: true });
    }

    onDragExit = () => {
        this.setState({ isDragging: false})
    }

    onDrop = async (ev: React.DragEvent) => {
        ev.preventDefault();

        await this.createLayerFromFiless(ev.dataTransfer.files);
        
    }

    onDragOver = (ev: React.DragEvent) => {
        ev.preventDefault();
    }

    render() {
        return (
            <div 
                style={this.state.isDragging ? dragStyle : passiveStyle} 
                onDragEnter={this.onDragEnter} 
                onDragExit={this.onDragExit}
                onDragOver={this.onDragOver}
                onDrop={this.onDrop} >
                    {this.state.message}
                <div>
                    <button onClick={this.onOpenFileClick}>Open...</button>
                </div>
                <input type="file" style={{display: "none"}} onChange={this.onFileChosen} ref={this.fileInputRef} />
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