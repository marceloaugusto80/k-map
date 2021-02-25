export interface Marker {
    point: {
        lat: number,
        lon: number
    },
    name: string;
    description: string;
}



export interface MarkerLayer {
    name: string;
    icon: MarkerIconStyle;
    markers: Marker[];
}



export type IconNames = "circle" | "place";



export interface MarkerIconStyle {
    type: IconNames,
    width: number;
    height: number;
    color: string;
}



const defaultIconConfig: MarkerIconStyle = {
    type: "circle",
    width: 22,
    height: 22,
    color: "red"
}
