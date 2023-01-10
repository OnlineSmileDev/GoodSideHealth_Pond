import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectJwtToken } from 'src/infrastructure/userContext'

const ERROR = 'Error'

export const useFetch = <TData, TVariables>(
  query: string
): ((variables?: TVariables) => Promise<TData>) => {
  const token = useSelector(selectJwtToken)

  return useCallback(
    async (variables?: TVariables) => {
      // environment variable
      const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })

      const json = await res.json()

      if (json.errors) {
        const { message } = json.errors[0] || ERROR
        throw new Error(message)
      }

      return json.data
    },
    [query, token]
  )
}
