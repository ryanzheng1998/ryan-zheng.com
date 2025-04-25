import { Action, State } from './'

export const toggleTodoCompletionReducer = (
  state: State,
  action: Action & { type: 'ToggleTodoCompletion' }
) => {
  const { id } = action
  const { [id]: todo, ...rest } = state.todos
  if (todo === undefined) return state
  return {
    ...state,
    todos: {
      ...rest,
      [id]: {
        ...todo,
        completed: !todo.completed,
      },
    },
  }
}
