import { Action, State } from './'

export const deleteTodoReducer = (
  state: State,
  action: Action & { type: 'DeleteTodo' }
) => {
  const { id } = action
  const { [id]: deleted, ...rest } = state.todos
  return {
    ...state,
    todos: rest,
  }
}
