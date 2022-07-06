import { useEffect, useRef, useState } from "react"

const useDebounce = (callback, delay) => {
  const savedCallback = useRef()
  const [value, setValue] = useState("")
  const onChange = e => {
    setValue(e.target.value)
  }
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // if (value !== "") {
      savedCallback.current()
      // }
    }, delay)

    return () => clearTimeout(delayDebounceFn)
  }, [value])

  return { value, onChange }
}

export default useDebounce
