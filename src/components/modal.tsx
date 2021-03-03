import { transform } from "lodash";
import * as React from "react";

interface Props {
    isOpen: boolean;
    onClose: ()=>void;
    position?: number[];
    children?: React.ReactNode;

}

export default class Modal extends React.PureComponent<Props, {}> {

    constructor(props: Props) {
        super(props);

    }

    onClose = (ev: React.MouseEvent) => {
        if(ev.currentTarget === ev.target) this.props.onClose();
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isOpen &&
                    <div style={wrapperStyle} onClick={this.onClose}>
                        <div style={createChildStyle(this.props.position)} >
                            {this.props.children}
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }

}



function createChildStyle(pos?: number[]): React.CSSProperties {
    let style: React.CSSProperties = {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    };

    if(pos && pos.length == 2) {
        style.left = `${pos[0]}px`;
        style.right = `${pos[1]}px`;
        style.transform = undefined;
    } 

    return style;
}

const childDefaultStyle: React.CSSProperties = {
    position: "relative",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
}

const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    backgroundColor: "#00000049",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}