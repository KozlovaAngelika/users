import {
    useCallback,
    useState,
    useEffect
} from "react"
const storageName = 'userData';
export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const login = useCallback((jwtToken, id) => {
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
        setToken(jwtToken);
        setUserId(id);
    })
    const logout = useCallback(() => {
        setToken(null);
        setToken(null)
        localStorage.removeItem(storageName)
    })
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return {
        login,
        logout,
        token,
        userId
    }
}