import React from 'react'
import { Typography } from "@material-ui/core";
import { DeleteForever, Palette } from '@material-ui/icons';
import LayerStyleDialog from './layer-style-dialog';
import { MarkerIconStyle } from '../core/models';
import Modal from './modal';

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
            <div style={listWrapperStyle}>
                <button onClick={this.props.onAddLayer} >Add layer...</button>
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
                    <Modal 
                    isOpen={this.state.isIconStyleWindowOpen} 
                    onClose={() => this.setState({isIconStyleWindowOpen: false})} 
                    position={this.state.styleWindowPosition}>
                        <LayerStyleDialog onApply={this.onApplyIconStyle}/>
                    </Modal>
            </div>
        );
    }

}

const listWrapperStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "white",
    padding: "4px"
}
