import {
    useState,
    useCallback,
    useContext
} from 'react';
import { AuthContext } from "../context/AuthContext";
const storageName = 'userData';


export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = useContext(AuthContext);
    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            headers['authorization'] = localStorage.getItem(storageName);

            const response = await fetch(url, {
                method,
                body,
                headers
            })
            const data = await response.json()
            if (!response.ok) {
                if (response.status === 401) {
                    auth.logout();
                    return;
                }
                throw new Error(data.message || 'Something went wrong.')
            }
            setLoading(false)
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])
    const clearError = () => {
        setError(null);
    }
    return {
        loading,
        request,
        error,
        clearError
    }
}