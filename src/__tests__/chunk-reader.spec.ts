import ChunkReader from "../core/chunk-reader";

describe("ChunkReader", () => {

    test("readAsync reads blob content", async () => {

        const expected = "This is a test text!";
        let blob = new Blob([expected]);

        let actual = "";
        const reader = new ChunkReader(blob, 5);
        for await(let s of reader.readAsync()) {
            actual += s;
        }

        expect(actual).toBe(expected);

    });

    
    test("readAsync reads empty blob", async () => {

        let blob = new Blob([""]);

        let actual = "";
        const reader = new ChunkReader(blob, 5);
        for await(let s of reader.readAsync()) {
            actual += s;
        }

        expect(actual).toBe("");

    });

     
    test("readAsync reads empty null blobs", async () => {

        let blob = new Blob([]);

        let actual: string | undefined;
        const reader = new ChunkReader(blob, 5);
        for await(let s of reader.readAsync()) {
            actual = s;
        }

        expect(actual).toBe("");

    });

});