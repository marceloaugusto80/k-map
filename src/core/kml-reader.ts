import * as Sax from "sax";
import { Readable } from "stream";
import fs from "fs";
import { Marker } from "./models";

export default class KmlReader {

    private tagStack = new Array<string>();
    private currMarker: Marker | undefined;
    private markers = new Array<Marker>();

    parseAsync(stream: Readable) {

        this.tagStack = [];
        this.currMarker = undefined;
        this.markers = [];
        
        return new Promise<Marker[]>((res, rej) => {

            const sax = Sax.createStream(true);
            sax.on("opentag", tag => this.onTagOpen(tag.name, tag.isSelfClosing));
            sax.on("text", this.onInnerText);
            sax.on("closetag", this.onTagClose)
            sax.on("error", err => rej(err));
            sax.on("end", () => res(this.markers));

            try {
                stream.pipe(sax);
            }
            catch(err) {
                rej(err);
            }

        });
    }

    parseFileAsync(filePath: string) {
        const stream = fs.createReadStream(filePath);
        return this.parseAsync(stream);
    }

    private onTagClose = (tagName: string) => {
        if (tagName.toLowerCase() == "placemark" && this.currMarker) {
            this.markers.push(this.currMarker);
        }
        this.tagStack.pop();
    }

    private onInnerText = (text: string) => {
        if (!this.currMarker) return;
        const tagName = this.tagStack[this.tagStack.length - 1];

        switch (tagName) {

            case "coordinates":
                const coords = KmlReader.stringToCoordinates(text);
                this.currMarker.point = { lat: coords[0], lon: coords[1] };
                break;

            case "name":
                this.currMarker.name = text;
                break;

            case "description":
                this.currMarker.description = text;
                break;

        }
    }

    private onTagOpen = (tagName: string, isSelfClosing: boolean) => {

        if (isSelfClosing) return;
        const tagLower = tagName.toLowerCase();
        if (tagLower == "placemark") {
            this.currMarker = {
                description: "",
                name: "",
                point: {
                    lat: 0,
                    lon: 0
                }
            };

        }
        this.tagStack.push(tagLower);
    }

    private static stringToCoordinates(coords: string) {
        const arr = coords.split(',');
        if(arr.length < 2) throw new Error("Malformed coordinates string");
        return [
            parseFloat(arr[0]),
            parseFloat(arr[1])
        ];
    }
}
