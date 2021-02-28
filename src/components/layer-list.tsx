import React from 'react'
import { Typography } from "@material-ui/core";
import { DeleteForever, Palette } from '@material-ui/icons';
import LayerStyleDialog from './layer-style-dialog';
import { MarkerIconStyle } from '../core/models';

interface Props {
    layerNames: string[];
    onAddLayer?: ()=> void;
    onLayerRemove?: (layerName: string) => void;
    onApplyLayerStyle?: (layerName: string, style: MarkerIconStyle) => void;
}

interface State {
    isIconStyleWindowOpen: boolean;
    styleWindowPosition: [number, number];
    currentLayerName: string | undefined;
}

export default class LayerList extends React.PureComponent<Props, State> {
    
    constructor(props: Props) {
        super(props);

        this.state = {
            isIconStyleWindowOpen: false,
            styleWindowPosition: [0, 0],
            currentLayerName: undefined
        };
    }

    onIconStyleClick = (layerName: string, itemX: number, itemY: number) => {
        if(this.state.isIconStyleWindowOpen) {
            this.setState({
                currentLayerName: undefined,
                isIconStyleWindowOpen: false,
                styleWindowPosition: [0, 0]
            })
        }
        else {
            this.setState({
                currentLayerName: layerName,
                isIconStyleWindowOpen: true,
                styleWindowPosition: [itemX, itemY],
            })
        }
    }

    onApplyIconStyle = (iconConfig: MarkerIconStyle) => {
        if(!this.state.currentLayerName || !this.props.onApplyLayerStyle) return;
        this.setState({isIconStyleWindowOpen: false});
        this.props.onApplyLayerStyle(this.state.currentLayerName, iconConfig);
    }

    onLayerRemove = (layerName: string) => {
        const {onLayerRemove} = this.props;
        if(onLayerRemove) onLayerRemove(layerName);
    }

    render() {
        return (
            <div className="layer-list float-container lv1">
                <button onClick={this.props.onAddLayer} className="block">Add layer...</button>
                <hr/>
                {
                    this.props.layerNames.map((name, i) => 
                    <div key={i}>
                        <DeleteForever 
                        className="hand in-line v-center" 
                        onClick={()=> this.onLayerRemove(name)} />
                        <Typography 
                        className="in-line v-center">{name}</Typography>
                        <Palette 
                        className="hand in-line v-center" 
                        onClick={(ev)=>this.onIconStyleClick(name, ev.clientX, ev.clientY)} />
                    </div>)
                }
                {
                    this.state.isIconStyleWindowOpen &&
                    <div 
                        className="float-container lv2"
                        style={{
                            position: "absolute", 
                            left: this.state.styleWindowPosition[0],
                            top: this.state.styleWindowPosition[1], 
                        }}>
                        <LayerStyleDialog onApply={this.onApplyIconStyle}/>
                    </div>
                }
            </div>
        );
    }

}

