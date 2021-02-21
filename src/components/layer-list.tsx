import React from 'react'

interface Props {
    layerNames: string[];
    onLayerRemove: (layerName: string) => void;
    onAddNewLayer: () => void;
}

export default function LayerList(props: Props) {
    const {} = props

    return (
        <div style={wrapperStyle}>
            
            <div>
                <a href="#"  onClick={props.onAddNewLayer}>Add...</a>
            </div>
            
            {
                props.layerNames.map((name, i) => <div key={i}>
                    <button onClick={()=> props.onLayerRemove(name)}>X</button>
                    <span >{name}</span>
                </div>)
            }
            
        </div>
    );
}


const wrapperStyle: React.CSSProperties = {
    padding: "8px",
    backgroundColor: "#444444",
    minWidth: "200px"
}

const itemStyle: React.CSSProperties = {

}