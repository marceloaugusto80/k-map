import React from "react";
import MapEx from "../core/map-ex";
import { MarkerLayer } from "../core/models";


interface Props {
    layers?: MarkerLayer[];
    onCapture?: (imgData: string)=>void;
}

interface State {
    isRendered: boolean;
}

export default class MapView extends React.PureComponent<Props, State> {

    map: MapEx;
    target?: HTMLElement;

    constructor(props: any) {
        super(props);
        this.map = new MapEx();
        this.state = {
            isRendered: false
        };
    }

    onMapRender = (instance: HTMLDivElement | null) => {
        if(!instance) throw new Error("Map ref is not defined.");
        this.target = instance;
        this.map.render(instance);
        this.setState({isRendered: true});
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
                <div id="map" ref={this.onMapRender} className="map"></div>
            );
    }

}



