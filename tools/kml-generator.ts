import fs from "fs";
import path from "path";

function getAppRootDirAsync() {
    return new Promise<string>((res, rej) => {
        let curDir = __dirname;
        while(curDir != "") {
            
            try {
                const files = fs.readdirSync(curDir);
                if(files.indexOf("package.json") > -1) {
                    res(curDir);
                    return;
                }
                else {
                    curDir = path.resolve(curDir, "..");
                }

            }
            catch(err) {
                rej(err);
                return;
            }

        } // end while
        
        res(__dirname);

    });
}

async function deleteFileIfExistsAsync(filePath: string): Promise<boolean> {
    try {
        await fs.promises.unlink(filePath);
        return true;
    }
    catch(err) {
        return false;
    }
    
}

function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomLatLon() {
    const latMin = -90;
    const latMax = 90;
    const lonMin = -180;
    const lonMax = 180;
    return [getRandom(latMin, latMax), getRandom(lonMin, lonMax)]; 
}

function createPlacemarkTag(name: string, description: string, lat: number, lon: number): string {
    return `
    <placemark>
    <name>${name}</name>
    <description>${description}</description>
    <point>
    <coordinates>${lat},${lon},0</coordinates>
    </point>
    </placemark>`;
}

async function generateRandonKmlFileAsync(placemarksCount: number, fileName: string) {
    
    console.log(`Starting generating kml file...`);
    let filePath = "";
    try {

        const header = `<?xml version="1.0" encoding="UTF-8"?>`;
        const kmlOpenRoot = `<kml xmlns="http://www.opengis.net/kml/2.2">`;
        const kmlCloseRoot = `</kml>`;
        
        filePath = path.resolve(await getAppRootDirAsync(), "temp", fileName);
        console.log(`-> generating file ${filePath}`);
        if(await deleteFileIfExistsAsync(filePath)) {
            console.log("-> removing previous file with the same name")
        }
        await fs.promises.appendFile(filePath, [header, kmlOpenRoot].join("\n"), {flag: "a"});
        
        let counter = 0;
        while(counter++ < placemarksCount) {
            process.stdout.write(`-> creating placemark ${counter}/${placemarksCount}\r`);

            const latLon = getRandomLatLon();
            const description = `Description #${counter}`;
            const name = `Name #${counter}`;
            const placemark = createPlacemarkTag(name, description, latLon[0], latLon[1]);

            await fs.promises.appendFile(filePath, placemark)
        }
        
        await fs.promises.appendFile(filePath, kmlCloseRoot);
        console.log("\nDone!");
    }
    catch(err) {
        deleteFileIfExistsAsync(filePath);
        console.error(err);
    }
        
}
    
    
(async function(){

    const { argv } = process;
    if(argv.length < 3) {
        throw Error("Argumens: placemark_count:number [file_name:string]")
    }
    const placeCount = parseInt(argv[2]);
    if(isNaN(placeCount)) throw Error("Argument must be a number");

    const fileName = process.argv.length < 4 ? "test.kml" : process.argv[3];
    await generateRandonKmlFileAsync(placeCount, fileName);

})();