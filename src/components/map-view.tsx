import * as React from "react";
import MapEx from "../core/map-ex";
import { MarkerLayer } from "../core/models";


interface Props {
    layers?: MarkerLayer[];
    onCapture?: (imgData: string)=>void;
}

export default class MapView extends React.PureComponent<Props, any> {

    map: MapEx;
    target: HTMLDivElement | null;

    constructor(props: any) {
        super(props);
        this.target = null;
        this.map = new MapEx();
    }


    componentDidMount = () => {
        if(!this.target) throw new Error("Map ref is not defined.");
        this.map.render(this.target);
    }

    componentDidUpdate = (prevProps: Props) => {
        this.map.clearLayers();
        if(this.props.layers) {
            for(const layer of this.props.layers) {
                this.map.tryAddLayer(layer);
            }
        }
    }

    onCapture = (imgData: string) => {
        if(this.props.onCapture) this.props.onCapture(imgData);
    }
    
    render() {
            return (
                <div style={mapStyle} ref={(e) => this.target = e} ></div>
            );
    }

}

const mapStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%"
}

