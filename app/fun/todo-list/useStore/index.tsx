import React from 'react'
import { addTodoReducer } from './addTodoReducer'
import { deleteTodoReducer } from './deleteTodoReducer'
import { editInputReducer } from './editInputReducer'
import { toggleTodoCompletionReducer } from './toggleTodoCompletionReducer'

interface Todo {
  description: string
  completed: boolean
}

export interface State {
  todos: { [id: string]: Todo }
  todoInput: string
}

const initState: State = {
  todos: {},
  todoInput: '',
}

export type Action =
  | { type: 'EditInput'; text: string }
  | { type: 'AddTodo'; id: string; description: string }
  | { type: 'ToggleTodoCompletion'; id: string }
  | { type: 'DeleteTodo'; id: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'EditInput':
      return editInputReducer(state, action)
    case 'AddTodo':
      return addTodoReducer(state, action)
    case 'ToggleTodoCompletion':
      return toggleTodoCompletionReducer(state, action)
    case 'DeleteTodo':
      return deleteTodoReducer(state, action)
  }
}

export const useStore = () => {
  return React.useReducer(reducer, initState)
}
