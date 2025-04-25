import { Action, State } from './'

export const addTodoReducer = (
  state: State,
  action: Action & { type: 'AddTodo' }
) => {
  const { id, description } = action
  return {
    ...state,
    todos: {
      ...state.todos,
      [id]: {
        description,
        completed: false,
      },
    },
  }
}
