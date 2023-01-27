import { useState, useEffect, useRef } from 'react'

export default function useAxios(config) {
  const {axiosInstance, method, url, extraConfigs = {}} = config
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const effectRun = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    
    const fetch = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...extraConfigs,
          signal: controller.signal
        })
        setData(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if(effectRun.current) { // make sure we only run this once
      fetch()  
    }
    
    return () => {
      controller.abort() // clean up function
      effectRun.current = true // prevent the useEffect to run again
    }
  }, [])
  
  return [data, loading, error]
}