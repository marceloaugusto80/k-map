import React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import { ImageManager } from "../core/image-manager";


interface Props {
    source?: string;
}
interface State {
    crop?: ReactCrop.Crop;
    percentCrop?: ReactCrop.PercentCrop;
    unit?: string;
    width?: number;
    aspect?: number;
}

export default class ImageCrop extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
           
        };
    }
    
    onChange = (crop: ReactCrop.Crop, percentCrop: ReactCrop.PercentCrop) => {
        this.setState({crop: crop, percentCrop: percentCrop});
        
    }

    onCrop = async () => {
        try {
            const { percentCrop } = this.state;
            const { source } = this.props;
            if(!source) throw Error("Could not resolve image source to crop.");
            if(!percentCrop) throw Error("Could not resolve crop area.");
            
            const x = percentCrop.x || 0;
            const y = percentCrop.y || 0;
            const w = percentCrop.width || 0;
            const h = percentCrop.height || 0;
        
            await ImageManager.cropToClipboard(source, x, y, w, h);
        } catch (error) {
            console.error(error);
        }

    }

    render() {
        return (
            <div style={wrapperStyle}>
                {
                    this.props.source &&
                    <React.Fragment>
                        <div style={imagePlaceholderStyle}>
                            <ReactCrop 
                            crop={this.state.crop}
                            onChange={this.onChange} 
                            src={this.props.source} />
                        </div>
                        <div className="crop-tool-bar">
                            <button onClick={this.onCrop}>Copy image</button>
                        </div>
                    </React.Fragment>
                }
            </div>
        )
    }
}

const wrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "1fr auto",
    padding: "8px",
    backgroundColor: "white"
};

const imagePlaceholderStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%"
};
