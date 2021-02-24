import React from 'react'
import { IconButton, Typography } from "@material-ui/core";
import { DeleteForever, Palette } from '@material-ui/icons';

interface Props {
    layerNames: string[];
    onLayerRemove: (layerName: string) => void;
    onLayerConfig?: (layerName: string, x: number, y: number) => void;
}

export default class LayerList extends React.PureComponent<Props> {
    
    constructor(props: Props) {
        super(props);
    }

    onIconStyleClick = (ev: React.MouseEvent<HTMLElement>) => {
        if(this.props.onLayerConfig)
            this.props.onLayerConfig("", ev.clientX, ev.clientY);
    }

    render() {
        return (
            <div>
                {
                    this.props.layerNames.map((name, i) => 
                    <div key={i}>
                        <DeleteForever className="hand in-line" onClick={()=> this.props.onLayerRemove(name)} />
                        <Typography className="in-line">{name}</Typography>
                        <IconButton className="hand in-line" onClick={this.onIconStyleClick} />
                    </div>)
                }
            </div>
        );
    }

}

