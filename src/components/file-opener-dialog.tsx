import * as React from "react";


interface Props {
    onOpenFiles?: (fileList: FileList) => void;
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
    
    onOpenFileClick = (ev: React.MouseEvent<HTMLElement>) => {
        if(this.fileInputRef) {
            this.fileInputRef.current?.click()
        }
    }

    onFilesSelected = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = ev.currentTarget;
        const { onOpenFiles } = this.props;
        if(files && onOpenFiles) onOpenFiles(files);
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
        const { onOpenFiles } = this.props;
        if(onOpenFiles) onOpenFiles(files);
    }

    onDragOver = (ev: React.DragEvent) => {
        ev.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                
                <p>
                    <span> Open file: </span>
                    <button onClick={this.onOpenFileClick}>Open...</button> 
                </p>
                
                <p>or drag files below:</p>
                
                <div
                    onDragEnter={this.onDragEnter} 
                    onDragExit={this.onDragExit}
                    onDragOver={this.onDragOver}
                    onDrop={this.onDrop}>
                    drop files here
                </div>
                
                <p>{this.state.message}</p>
                
                <input 
                    type="file" 
                    accept=".kml"
                    style={{display: "none"}} 
                    onChange={this.onFilesSelected} 
                    ref={this.fileInputRef} />
            
            </React.Fragment>
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