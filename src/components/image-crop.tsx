import React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import { ImageManager } from "../core/image-manager";


interface Props {
    source?: string;
}
interface State {
    crop?: ReactCrop.Crop;
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
        this.setState({crop: crop});
        
    }

    onComplete = (crop: ReactCrop.Crop, percentCrop: ReactCrop.PercentCrop) => {
        console.log([crop, percentCrop]);
    }

    onCrop = async () => {
        const { crop } = this.state;
        const { source } = this.props;
        if(!crop || !source) return;
        const {x, y, width, height} = crop;
        if(!x || !y || !width || !height) return;
        try {
            await ImageManager.cropToClipboard(source, x, y, width, height);
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
                            src={this.props.source} 
                            onComplete={this.onComplete} />
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
    position: "absolute",
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
