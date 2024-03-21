import { useEffect } from 'react'

export default function useScrollToTop(path) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [path])
}
