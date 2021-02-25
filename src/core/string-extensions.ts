import { rename } from "fs";

export {};

declare global {
    interface String {
        autoRename(possibleMatches: string[]): string
    }
}

const renamedStringPattern = /^(.+?)_(\d+)$/;

/**
 * Returns a name name for this string if theres a match in the provided array.
 */
String.prototype.autoRename = function(possibleMatches: string[]): string {
    const original = this.toString();    

    if(!possibleMatches || possibleMatches.length == 0) return original;

    let matchCount = 0;
    let renamed = original;

    while(true) {
        
        const matchIdx = possibleMatches.findIndex(m => m == renamed);
        if(matchIdx < 0) break;

        const matchMatch = renamedStringPattern.exec(possibleMatches[matchIdx]);
        if(matchMatch) {
            const numberSufix = matchMatch[2];
            matchCount = parseInt(numberSufix);
            const renameMatch = renamedStringPattern.exec(renamed);
            renamed = renameMatch ? renameMatch[1] : renamed;
        }

        renamed = `${renamed}_${++matchCount}`;
        
    }

    return renamed;
}
