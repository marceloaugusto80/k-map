export default class ChunkReader {

    private readonly blob: Blob;
    readonly chunkSize: number;

    constructor(blob: Blob, chunkSize: number = 64 * 1024) {
        this.blob = blob;
        this.chunkSize = chunkSize;
    }

    async* readAsync(): AsyncGenerator<string> {
        const fileSize = this.blob.size;
        
        if(fileSize == 0) {
            yield "";
            return;
        }
        
        let offset = 0;
        while(offset < fileSize) {
            let chunk = await ChunkReader.readChunkAsync(this.blob, offset, this.chunkSize);
            offset += this.chunkSize;
            yield chunk;
        }
    }

    private static readChunkAsync(file: Blob, offsett: number, lenght: number) : Promise<string> {

        return new Promise<string>((res, rej) => {
            let reader = new FileReader();
            let chunk = file.slice(offsett, lenght + offsett);
            reader.onload = (ev => {
                if(!ev.target || ev.target.error) {
                    rej("Error reading chunk.");
                    return;
                }
                let result = ev.target.result as string;
                res(result);
            });
            reader.readAsText(chunk);
        });
    }
}

