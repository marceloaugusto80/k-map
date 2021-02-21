export {};

declare global {
    interface String {
        indexOfAny(search: string[], start: number): number;
    }
}

String.prototype.indexOfAny = function(search: string[], start: number = 0): number {
    for (let i = start; i < this.length; i++) {
        for (let j = 0; j < search.length; j++) {
            if(search[j] == this[i]) return i;;
        }
    }
    return -1;
}