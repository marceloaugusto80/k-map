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
        if(!instance) {
            console.error("map ref is not defined, dumbass!")
            return;
        }
        this.map.render(instance);
    }
    
    render() {
            return (
                <div id="map" ref={this.onMapRender} className="map"></div>
            );
    }

}



