import { useEffect } from 'react'
import type { DebounceProps } from './hooks.types'

const useDebounceEffect = ({ fn, waitTime, deps }: DebounceProps): void => {
    useEffect(() => {
        const time = setTimeout((): void => fn.apply(deps), waitTime)
        return () => clearTimeout(time)
    }, [deps, fn, waitTime])
}

export default useDebounceEffect
