import * as React from "react";
import { MarkerIconStyle, IconNames } from "../core/models";
import { FormControl, Select, MenuItem, Button } from "@material-ui/core";
import ColorPicker from "./color-picker";
import { IconFactory } from "../core/icon-factory";


const iconSizes = [8, 16, 32, 48, 64];

interface Props {
    onApply?: (iconConfig: MarkerIconStyle) => void;
    defaultConfig?: MarkerIconStyle;
}

interface State {
    color: string;
    w: number;
    h: number;
    type: IconNames;
}


export default class LayerStyleDialog extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        const config = this.props.defaultConfig || {
            color: "red",
            width: 16,
            height: 16,
            type: "circle"
        };

        this.state = {
            color: config.color,
            w: config.width,
            h: config.height,
            type: config.type
        }

    }

    onSizeChanged = (ev: React.ChangeEvent<{value: unknown}>) => {
        const { value } = ev.target;
        
        if(typeof value === "number") {
            this.setState({ w: value, h: value });
        }
    }

    onColorChanged = (color: string) => {
        this.setState({color: color});
    }

    onTypeChanged = (ev: React.ChangeEvent<{value: unknown}>) => {
        const { value } = ev.target;
        
        if(typeof value == "string") {
            this.setState({ type: value as IconNames });
        }
    }

    onAccept = () => {
        if(!this.props.onApply) return;
        this.props.onApply({
            color: this.state.color,
            height: this.state.h,
            width: this.state.w,
            type: this.state.type
        });
    }

    render() {
        return (
            <div>
                <FormControl>
                    <Select label="Size" value={this.state.w} onChange={this.onSizeChanged}>
                        {
                            iconSizes.map((size, i) => 
                            <MenuItem key={i} value={size}>
                                {`${size} x ${size}`}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
                    
                <FormControl>
                    <Select label="Type" value={this.state.type} onChange={this.onTypeChanged}>
                        <MenuItem value={"circle" as IconNames}>Circle</MenuItem>
                        <MenuItem value={"place" as IconNames}>Place</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <ColorPicker onColorChanged={this.onColorChanged} />
                </FormControl>
                <div>
                    <img 
                    src={IconFactory.createSvgUrlData({
                        color: this.state.color,
                        width: this.state.w,
                        height: this.state.h,
                        type: this.state.type
                    })} />
                </div>
                <Button onClick={this.onAccept}>Accept</Button>
            </div>
        );
    }
}
