import React from "react";
import MapEx from "../core/map-ex";
import { MarkerLayer } from "../core/models";


interface Props {
    layers?: MarkerLayer[];
}

export default class MapView extends React.PureComponent<Props, any> {

    map: MapEx;

    constructor(props: any) {
        super(props);
        this.map = new MapEx();
    }

    onMapRender = (instance: HTMLDivElement | null) => {
        if(!instance) throw new Error("Map ref is not defined.");
        this.map.render(instance);
    }

    componentDidUpdate = (prevProps: Props) => {
        this.map.clearLayers();
        if(this.props.layers) {
            for(const layer of this.props.layers) {
                this.map.tryAddLayer(layer);
            }
        }
    }
    
    render() {
            return (
                <div id="map" ref={this.onMapRender} className="map"></div>
            );
    }

}



