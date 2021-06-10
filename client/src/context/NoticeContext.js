import {
    createContext
} from 'react'

function noop() {}
export const NoticeContext = createContext({
    show: false,
    error: null
})