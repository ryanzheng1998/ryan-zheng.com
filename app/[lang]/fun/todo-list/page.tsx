'use client'
import { useStore } from './useStore'

export default function Todo() {
  const [state, dispatch] = useStore()

  return (
    <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
        📝 Todo List
      </h1>

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={state.todoInput}
          className={styledInput}
          placeholder="What do you need to do?"
          onChange={(e) =>
            dispatch({ type: 'EditInput', text: e.target.value })
          }
        />
        <button
          className={styledButton}
          onClick={() => {
            if (state.todoInput === '') return console.log('empty')
            dispatch({
              type: 'AddTodo',
              id: crypto.randomUUID(),
              description: state.todoInput,
            })
          }}
        >
          ➕ Add
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(state.todos).map(([id, todo]) => (
          <div
            key={id}
            className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                className="h-5 w-5"
                onChange={() => dispatch({ type: 'ToggleTodoCompletion', id })}
              />
              <p
                className={`text-sm ${
                  todo.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-800 dark:text-white'
                }`}
              >
                {todo.description}
              </p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => dispatch({ type: 'DeleteTodo', id })}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const styledInput =
  'flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'

const styledButton =
  'rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors'
