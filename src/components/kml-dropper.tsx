import * as React from "react";
import { KmlReader } from "../core/kml-reader";
import { Marker, MarkerLayer } from "../core/models";
import "../core/file-extensions";


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
    
    createLayerFromFiles = async (fileList: FileList) => {
        
        let files = Array.from(fileList);
        let kmlFiles = files.filter(f => f.name.endsWith(".kml"));
        
        if(kmlFiles.length < 1){
            this.setState({message: "Error: No kml files detected"});
            return;
        }

        const layers = new Array<MarkerLayer>();
        let fileIdx = 1;
        for(const file of kmlFiles)
        {
            this.setState({message: `Parsing file ${fileIdx++}/${kmlFiles.length}...`});
            try {
               
                const kmlReader = new KmlReader();
                
                let markers = await kmlReader.parseFileAsync(file.path);
                layers.push({
                    icon: { type: "circle", width: 40, height: 40, color: "red" },
                    markers: markers,
                    name: file.getFilenameWithoutExtension()
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
            await this.createLayerFromFiles(ev.currentTarget.files);
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

        await this.createLayerFromFiles(ev.dataTransfer.files);
        
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
                    {this.state.message}
                <div>
                    <button onClick={this.onOpenFileClick}>Open...</button>
                </div>
                <input 
                type="file" 
                accept=".kml"
                style={{display: "none"}} 
                onChange={this.onFileChosen} 
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