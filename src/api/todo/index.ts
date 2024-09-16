interface ApiTodo {
  id: number
  title: string
  completed: boolean
  priority: string
}

export const getApiData = async (apiPath: string): Promise<ApiTodo[]> => {
  try {
    const response: ApiTodo[] = await fetch(apiPath).then((res) => res.json())
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
