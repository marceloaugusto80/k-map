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
    iconUrl: string;
    markers: Marker[];
}