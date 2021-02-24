export {};

declare global {
    interface String {
        autoRename(possibleMatches: string[]): string
    }
}

/**
 * Returns a name name for this string if theres a match in the provided array.
 */
String.prototype.autoRename = function(possibleMatches: string[]): string {
    
    if(!possibleMatches || possibleMatches.length == 0) return this.toString();
    
    let regexExpression = `^(${this})(\\d*)$`;

    const matches = possibleMatches
        .map(item => item.match(regexExpression))
        .filter(match => match != null)
        .sort((m1, m2) => {
            if(!m1 || !m2) return 0;
            if(m1[2] > m2[2]) return 1;
            else return -1;
        });
        
        if(matches.length == 0) return this.toString();
        
        const lastMatch = matches[matches.length -1];
        if(!lastMatch) return this.toString();

        let lastItemNumericSufix = parseInt(lastMatch[2]);
        return isNaN(lastItemNumericSufix) ? 
            `${lastMatch[1]}1`:
            `${lastMatch[1]}${lastItemNumericSufix + 1}`;

}
