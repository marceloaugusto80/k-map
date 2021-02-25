export {};

declare global {
    interface Array<T> {
        remove<T>(item: T): void;
    }
}


Array.prototype.remove = function<T>(item: T): void {
    const idx = this.indexOf(item);
    if(idx > -1) {
        this.splice(idx, 1);
    }
}