export function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function convertToCamelCase(snakeCase) {
    if (snakeCase.includes('_')) {
        return snakeCase.split('_').map((word, index) => index === 0 ? word : capitalizeFirstLetter(word, index)).join('');
    }
    return snakeCase;
}

export function transformObject(object) {
    const result = {};
    if (Array.isArray(object)) {
        return object.map(o => transformObject(o));
    }
    const keys = Object.keys(object);

    for (const key of keys) {
        let value;
        if (object[key] instanceof Object) {
            const val = object[key];

            if (Array.isArray(val)) {
                value = val.map(v => transformObject(v));
            } else {
                value = transformObject(object[key]);
            }
        } else {
            value = object[key];
        }
        const camelCaseKey = convertToCamelCase(key);
        result[camelCaseKey] = value;
    }

    return result;
}

export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function isUpperCase(chr) {
    return chr === chr.toUpperCase();
}

export function normalizeStr(str) {
    let normalizedStr = str[1];
    for (let i = 2; i < str.length; i++) {
        if (isUpperCase(str[i])) {
            normalizedStr += " " + str[i];
        } else {
            normalizedStr += str[i];
        }
    }
    return normalizedStr;
}