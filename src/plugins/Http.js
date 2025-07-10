import axios from 'axios'
import queryString from 'query-string'
import MapResponse from './MapResponse'

axios.defaults.headers.common['Authorization'] = `Bearer ${window?.keycloak?.idToken}`

const get = async (url, payload, customConfig = {}) => {
  const queryParams = queryString.stringify(payload || {})
  const urlWithQueries = queryParams ? `${url}?${query}` : url
  try {
    const response = await axios.get(urlWithQueries, customConfig)
    return MapResponse.mapResponse(response.data)
  } catch (error) {
    return MapResponse.mapErrorResponse(error)
  }
}

const post = async (url, payload, customConfig = {}) => {
  const config = { timeout: 300000, ...customConfig }
  try {
    const response = await axios.post(url, payload, config)
    return MapResponse.mapResponse(response.data)
  } catch (error) {
    return MapResponse.mapErrorResponse(error)
  }
}

const put = async (url, payload, customConfig = {}) => {
  const config = { timeout: 300000, ...customConfig }
  try {
    const response = await axios.put(url, payload, config)
    return MapResponse.mapResponse(response.data)
  } catch (error) {
    return MapResponse.mapErrorResponse(error)
  }
}

export default { get, post, put }
