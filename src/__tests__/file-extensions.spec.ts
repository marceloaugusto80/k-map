import "../core/file-extensions";
import path from "path";


function createFile(filePath: string[]) {
    let file = new File(["foo"],filePath[filePath.length -1]);
    if(filePath.length > 1) file.path = filePath.join(path.sep);
    return file;
}

test("getFileNameWithoutExtension", () => {
    
    const file1 = createFile(["foo", "bar", "baz.txt"]);
    const file2 = createFile(["foo", "bar", "baz"]);

    expect(file1.getFilenameWithoutExtension()).toBe("baz");
    expect(file2.getFilenameWithoutExtension()).toBe("baz");
    
});