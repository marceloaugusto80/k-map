import path from "path";

export {};

declare global {
    interface File {
        getFilenameWithoutExtension(): string;
    }
}

File.prototype.getFilenameWithoutExtension = function getFileNameWhithoutExtension() {
    const fileName = path.basename(this.path)
    const lastDotIdx = fileName.lastIndexOf('.');
    if(lastDotIdx == -1) return fileName;
    return fileName.substring(0, lastDotIdx);

}