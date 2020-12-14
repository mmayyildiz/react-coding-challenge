import { capitalizeFirstLetter, convertToCamelCase, transformObject, cloneObject, isUpperCase, normalizeStr } from './index';

describe("capitalizeFirstLetter", () => {
    it('capitalizes the first letter of the given string', () => {
        expect(capitalizeFirstLetter('terms')).toEqual('Terms');
    })
})

describe("convertToCamelCase", () => {
    it('converts the given string from snake case to camel case', () => {
        expect(convertToCamelCase('is_link_out_url_overridden')).toEqual('isLinkOutUrlOverridden');
    })
})

describe("transformObject", () => {
    it('converts the given object  from snake case to camel case', () => {
        const obj = {
            last_updated: '2020-01-13T17:33:54+00:00',
            creative_list: [
                {
                    date_created: '2020-01-13T17:33:53+00:00',
                    last_updated: '2020-01-14T15:42:03+00:00',
                    is_link_out_url_overridden: false,
                    weight: 1,
                    creative_size: {
                        date_created: '2017-11-02T15:19:01+00:00',
                        last_updated: '2019-07-30T15:05:28+00:00',
                        full_name: '160x600 (160x600)',
                        id: 1,
                        name: '160x600',
                        ratio_name: '4:15',
                        width: 160,
                        is_manta_enabled: false,
                        height: 600
                    }
                }
            ]
        };
        const transformedObj = {
            lastUpdated: '2020-01-13T17:33:54+00:00',
            creativeList: [
                {
                    dateCreated: '2020-01-13T17:33:53+00:00',
                    lastUpdated: '2020-01-14T15:42:03+00:00',
                    creativeSize: {
                        dateCreated: '2017-11-02T15:19:01+00:00',
                        lastUpdated: '2019-07-30T15:05:28+00:00',
                        fullName: '160x600 (160x600)',
                        id: 1,
                        name: '160x600',
                        ratioName: '4:15',
                        width: 160,
                        isMantaEnabled: false,
                        height: 600
                    }
                }
            ]
        };
        expect(transformObject(obj)).toMatchObject(transformedObj);
    })
})

describe("cloneObject", () => {
    it('clones the given object', () => {
        const obj = { a: 1, b: { c: 2, d: 4 } }
        expect(cloneObject(obj)).toMatchObject(obj);
    })
})

describe("isUpperCase", () => {
    it('controls if the given character is upper', () => {
        expect(isUpperCase('c')).toEqual(false);
    })
})

describe("normalizeStr", () => {
    it('normalizes the given string', () => {
        expect(normalizeStr('$PrefixText')).toEqual('Prefix Text');
    })
})



