import KmlReader from "../core/kml-reader";
import { Marker } from "../core/models";
import { Readable } from "stream";

const kmlXml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Placemark>
    <name>some name</name>
    <description>some description</description>
    <Point>
      <coordinates>1.1,-1.1,0</coordinates>
    </Point>
  </Placemark>
  <Placemark>
    <name>some name</name>
    <description>some description</description>
    <Point>
      <coordinates>1.1,-1.1,0</coordinates>
    </Point>
  </Placemark>
</kml>`;

function createStream(content: string) : Readable {
  const stream = new Readable();
  stream.push(content);
  stream.push(null);
  return stream;
}


test("should convert xml string to object array", async () => {

    const stream = createStream(kmlXml);
    const expected: Marker[] = [
        {
            name: "some name",
            description: "some description",
            point: {
                lat: 1.1,
                lon: -1.1,
            }
        },
        {
            name: "some name",
            description: "some description",
            point: {
                lat: 1.1,
                lon: -1.1,
            }
        }
    ];
    const reader = new KmlReader();

    const actual = await reader.parseAsync(stream);

    expect(actual).toStrictEqual(expected);
    
});


