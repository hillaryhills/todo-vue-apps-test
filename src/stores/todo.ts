import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getApiData } from '@/api/todo'

export const useTodoStore = defineStore('todo', () => {
  // state
  const todoList = ref<Array<TodoItem>>([])
  const currentFilter = ref<Filters>('All')

  //getters
  const filteredList = computed(() => {
    if (currentFilter.value === 'All') {
      return getAllItems.value
    } else if (currentFilter.value === 'Active') {
      return getUncompletedItems.value
    } else if (currentFilter.value === 'Completed') {
      return getCompletedItems.value
    }
    return []
  })

  const getAllItems = computed(() => todoList.value)

  const getCompletedItems = computed(() => {
    return todoList.value.filter((item: TodoItem) => item.completed)
  })

  const getUncompletedItems = computed(() => {
    return todoList.value.filter((item: TodoItem) => !item.completed)
  })

  // actions
  const addTodoItem = (todo: TodoItem) => {
    todoList.value.unshift(todo)
    persistState()
  }

  const toggleStatus = (id: number) => {
    const idx = todoList.value.findIndex((todo) => todo.id === id)
    todoList.value[idx] = {
      ...todoList.value[idx],
      completed: !todoList.value[idx].completed
    }
    persistState()
  }

  const deleteTodoItem = (id: number) => {
    todoList.value = todoList.value.filter((item: TodoItem) => item.id !== id)
    persistState()
  }

  const deleteCompletedItems = () => {
    todoList.value = todoList.value.filter((item: TodoItem) => !item.completed)
    persistState()
  }

  const getTodoItems = async () => {
    try {
      if (!localStorage.getItem(btoa('isFirst'))) {
        const apiTodoList = (
          await getApiData('https://jsonplaceholder.typicode.com/users/1/todos')
        ).slice(0, 10)
        todoList.value = apiTodoList.map((todo, index) => ({
          id: todo.id,
          text: todo.title,
          completed: todo.completed,
          priority: index
        }))
        persistState()
        localStorage.setItem(btoa('isFirst'), btoa('true'))
      } else {
        todoList.value = JSON.parse(localStorage.getItem('todos') || JSON.stringify([]))
        persistState()
      }
    } catch (error) {
      console.log('Error fetching todo items:', error)
    }
  }

  const persistState = () => {
    localStorage.setItem('todos', JSON.stringify(todoList.value))
  }

  return {
    todoList,
    currentFilter,
    filteredList,
    getAllItems,
    getCompletedItems,
    getUncompletedItems,
    addTodoItem,
    toggleStatus,
    deleteTodoItem,
    deleteCompletedItems,
    getTodoItems
  }
})
