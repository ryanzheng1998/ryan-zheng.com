import { Action, State } from './'

export const editInputReducer = (
  state: State,
  action: Action & { type: 'EditInput' }
) => {
  const { text } = action
  return {
    ...state,
    todoInput: text,
  }
}
