import { useState, useEffect } from 'react';
import { mockFetch } from '../back-end/server';
import { responseStatus } from '../constants';
import { transformObject } from '../utils';

export function useData() {

    const [variant, setVariant] = useState();
    const [columns, setColumns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const variantData = await mockFetch('/variant');
                const transformedVar = transformObject(variantData.body);
                const colsData = await mockFetch('/columns');
                const transformedCols = transformObject(colsData.body);
                setVariant(transformedVar);
                setColumns(transformedCols);
            } catch (err) {
                setError(err);
                if (err.message == responseStatus.UNAUTHORIZED) {
                    setShowPopup(true);
                }
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return { variant, columns, isLoading, error, showPopup, setShowPopup };
}
