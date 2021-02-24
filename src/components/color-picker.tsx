import * as React from 'react'


const palletColors = [
    "#112233", "#115533", "#116633", "#117733", "#118833", "#119933",
    "#442233", "#445533", "#446633", "#447733", "#448833", "#449933",
    "#4422aa", "#4455aa", "#4466aa", "#4477aa", "#4488aa", "#4499aa",
];



interface Props {
    onColorChanged: (color: string) => void;
}
interface State {

}

export default class ColorPicker extends React.PureComponent<Props, State> {
    
    constructor(props: Props) {
        super(props)

        this.state = {
            
        }
    }

    onColorClick = (ev: React.MouseEvent<HTMLDivElement>) => {
        this.props.onColorChanged(ev.currentTarget.style.background);
    }

    render(){
        return (
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 16px)",
                gridTemplateRows: "repeat(3, 16px)",
                columnGap: "2px",
                rowGap: "2px"
            }}>
            {
                palletColors.map(c => 
                    <div 
                    key={c} 
                    onClick={this.onColorClick} 
                    style={{background: c, cursor: "pointer"}}/>
                )
            }
            </div>
        );
    }
}
