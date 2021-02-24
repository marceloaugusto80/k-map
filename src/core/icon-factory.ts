import { IconConfig } from "./models";

export namespace IconFactory {


    
export function createSvgUrlData(iconConfig: IconConfig) {

    let rawSvg = "";

    switch (iconConfig.type) {
        case "place":
            rawSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" 
            x="0px" y="0px" 
            width="${iconConfig.width}px" 
            height="${iconConfig.height}px" 
            viewBox="0 0 600 600">
                <g><path fill="${iconConfig.color}" d="M263.278,0.107C158.977-3.408,73.323,80.095,73.323,183.602c0,117.469,112.73,202.72,175.915,325.322
                    c3.208,6.225,12.169,6.233,15.388,0.009c57.16-110.317,154.854-184.291,172.959-290.569
                    C456.331,108.387,374.776,3.866,263.278,0.107z M256.923,279.773c-53.113,0-96.171-43.059-96.171-96.171
                    s43.059-96.171,96.171-96.171c53.113,0,96.172,43.059,96.172,96.171S310.036,279.773,256.923,279.773z"/>
                </g>
            </svg>`;
            // needs to set color
            break;
            
        default:
            rawSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="${iconConfig.width}px" 
            height="${iconConfig.height}px">
                <circle 
                cx="${iconConfig.width / 2}px" 
                cy="${iconConfig.height / 2}px" 
                r="${(iconConfig.width / 2) - 1}px" 
                fill="${iconConfig.color}"/>
            </svg>`;
            break;
    }
    
    return `data:image/svg+xml;utf8,${rawSvg}`;

};


}
