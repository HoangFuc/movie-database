export const API_BASE_URL = `https://api.themoviedb.org/3/`
const API_TOKEN = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2Q1YTk5YmI4NTc4ODQ0NTY5YjgzODlmOGZiZTM5YyIsIm5iZiI6MTc1NzQxODI2MC43Niwic3ViIjoiNjhjMDEzMTQ3ZDNhMTgwMzE5MDZhODJkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.3da1puOyptNACgM50-ksLOYVetV18urOwP24wZLU5Oc`

const defaultHeaders = {
  'accept': 'application/json',
  'Authorization': API_TOKEN,
  'Content-Type': 'application/json',
}

export const apiGet = async (endpoint: string, params?: Record<string, any>) => {
  try {
    const url = new URL(`${API_BASE_URL}${endpoint}`)
    
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
    const url = new URL(`${API_BASE_URL}${endpoint}`)
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString())
        }
      })
    }

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
