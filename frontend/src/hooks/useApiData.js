import { useCallback, useEffect, useState } from 'react'

export function useApiData(loader) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [requestId, setRequestId] = useState(0)

  const reload = useCallback(() => {
    setRequestId((value) => value + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    loader()
      .then((response) => {
        if (!cancelled) {
          setData(response)
          setError(null)
        }
      })
      .catch((requestError) => {
        if (!cancelled) {
          setError(requestError.message)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [loader, requestId])

  return { data, loading, error, reload }
}
