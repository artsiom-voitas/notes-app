export function findTags(string: string): string[] {
    const pattern = /([#])\w+/g;
    const tags = string.match(pattern);
    let result: string[] = [];
    tags?.map((tag) => {
        result.push(tag.toLowerCase().slice(1));
    });
    return result;
}

export function removeDuplicatesFromArray(arr: string[]): string[] {
    return arr.filter((value, index) => arr.indexOf(value) === index);
}
