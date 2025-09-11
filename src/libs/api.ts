import { API_URL, ACCESS_TOKEN } from "@env"

export const API_BASE_URL = API_URL
const API_TOKEN = `Bearer ${ACCESS_TOKEN}`


const defaultHeaders = {
  'accept': 'application/json',
  'Authorization': API_TOKEN,
  'Content-Type': 'application/json',
}

export const apiGet = async (endpoint: string, params?: Record<string, any>) => {
  try {
    const url = new URL(`${API_BASE_URL}/${endpoint}`)
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString())
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: defaultHeaders,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API GET Error:', error)
    throw error
  }
}

export const apiPost = async (
  endpoint: string, 
  body?: any, 
  params?: Record<string, any>
) => {
  try {
    const url = `${API_BASE_URL}/${endpoint}`

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API POST Error:', error)
    throw error
  }
}
