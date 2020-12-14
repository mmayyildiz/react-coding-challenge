import { renderHook } from '@testing-library/react-hooks';
import * as server from '../back-end/server.js';
import { useData } from './useData';
import { when } from 'jest-when'
import { responseStatus } from '../constants';

const getControlledPromise = () => {
    let deferred;
    const promise = new Promise((resolve, reject) => {
        deferred = { resolve, reject };
    });

    return { deferred, promise }
}

describe('useData', () => {
    it('handles loading state correctly', async () => {
        const { deferred, promise } = getControlledPromise();
        server.mockFetch = jest.fn(() => promise);
        const { result, waitForNextUpdate } = renderHook(useData);
        expect(result.current.isLoading).toBe(true);
        deferred.resolve();
        await waitForNextUpdate();
        expect(result.current.isLoading).toBe(false);
    })
}
);

describe('when got data successfully', () => {
    it('handles successfull state correctly', async () => {
        server.mockFetch = jest.fn()
        when(server.mockFetch).calledWith('/variant').mockResolvedValue({ body: { id: "1", parent_frame_id: "2", key_name: '$BodyCopyText', isHidden: false } });
        when(server.mockFetch).calledWith('/columns').mockResolvedValue({
            body: [{
                id: '1',
                parent_frame_id: '2',
                size_id: 1,
                key_name: '$CtaSize',
                is_hidden: false,
                parent_creative_variant_id: 12
            }]
        });

        const { result, waitForNextUpdate } = renderHook(useData);
        await waitForNextUpdate();
        expect(result.current.variant).toMatchObject({ id: "1", parentFrameId: "2", keyName: '$BodyCopyText', isHidden: false });
        expect(result.current.columns).toMatchObject([{
            id: '1',
            parentFrameId: '2',
            sizeId: 1,
            keyName: '$CtaSize',
            isHidden: false,
            parentCreativeVariantId: 12
        }]);

    })
});

describe('when get error during the request', () => {

    it('handles error state correctly ', async () => {
        const { deferred, promise } = getControlledPromise();
        server.mockFetch = jest.fn(() => promise);
        const { result, waitForNextUpdate } = renderHook(useData);
        deferred.reject('Fetch error');
        await waitForNextUpdate();
        expect(result.current.error).toStrictEqual('Fetch error');
    })

    it('handles showPopup state correctly ', async () => {
        const { deferred, promise } = getControlledPromise();
        server.mockFetch = jest.fn(() => promise);
        const { result, waitForNextUpdate } = renderHook(useData);
        deferred.reject(new Error(responseStatus.UNAUTHORIZED));
        await waitForNextUpdate();
        expect(result.current.showPopup).toBe(true);
    })
});

