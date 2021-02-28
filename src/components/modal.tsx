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
        ev.preventDefault();
        if(ev.currentTarget === ev.target) this.props.onClose();
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.isOpen &&
                    <div className="dialog-wrapper" onClick={this.onClose}>
                        <div className="dialog" style={createChildStyle(this.props.position)} >
                            {this.props.children}
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }

}

const childDefaultStyle: React.CSSProperties = {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
}

function createChildStyle(pos?: number[]): React.CSSProperties {
    if(!pos || pos.length < 2) return childDefaultStyle;
    return {
        left: `${pos[0]}px`,
        top: `${pos[1]}px`,
    }
}