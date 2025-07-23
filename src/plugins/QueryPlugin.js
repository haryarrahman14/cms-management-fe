import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { unref } from 'vue'

/**
 * Wrapper for useQuery with standardized error handling and response validation
 * @param {Array|string} queryKey - Query key
 * @param {Function} queryFn - Function to fetch data
 * @param {Object} options - Additional options for useQuery
 */
export const useAppQuery = (queryKey, queryFn, options = {}) => {
  const resolvedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey]

  return useQuery({
    queryKey: resolvedQueryKey,
    queryFn: async () => {
      const response = await queryFn(unref(options.payload))

      // Standard response validation
      if (response.code !== 200) {
        throw new Error(response.message || 'Request failed')
      }

      return response.data
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 3, // max retry 3 times
    onError: (error) => {
      console.error('Query error:', error)
      options.onError?.(error)
    },
    ...options,
  })
}

/**
 * Wrapper for useMutation with standardized error handling and response validation
 * @param {Function} mutationFn - Function to call for mutation
 * @param {Object} options - Additional options for useMutation
 */
export const useAppMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload) => {
      const response = await mutationFn(unref(payload))

      // Standard response validation
      if (response.code !== 200) {
        throw new Error(response.message || 'Request failed')
      }

      return response.data
    },
    onSuccess: (data) => {
      // Auto invalidate related queries
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
      options.onSuccess?.(data)
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      options.onError?.(error)
    },
    ...options,
  })
}

/**
 * Helper to create consistent query key
 * @param {string} baseKey - Base key for query
 * @param {*} params - Additional parameters for query key
 */
export const createQueryKey = (baseKey, params = null) => {
  return params ? [baseKey, unref(params)] : [baseKey]
}

/**
 * Helper to create mutation with reactive payload
 * @param {Function} mutationFn - Function mutation
 * @param {Object} options - Options for mutation
 */
export const createReactiveMutation = (mutationFn, options = {}) => {
  return useAppMutation((payload) => mutationFn(unref(payload)), options)
}
