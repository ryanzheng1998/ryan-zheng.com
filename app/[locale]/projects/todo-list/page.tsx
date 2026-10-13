'use client'
import { useParams } from 'next/navigation'
import { DemoIntro } from '@/components/DemoIntro'
import { useStore } from './useStore'

export default function Todo() {
  const [state, dispatch] = useStore()
  const { locale } = useParams<{ locale: string }>()
  const zh = locale === 'zh'
  const entries = Object.entries(state.todos)
  const remaining = entries.filter(([, todo]) => !todo.completed).length
  return (
    <main className="demo-surface">
      <div className="demo-content max-w-xl">
        <DemoIntro id="todo-list" />
        <form
          className="mb-6 flex gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            const text = state.todoInput.trim()
            if (!text) return
            dispatch({
              type: 'AddTodo',
              id: crypto.randomUUID(),
              description: text,
            })
            dispatch({ type: 'EditInput', text: '' })
          }}
        >
          <input
            aria-label={zh ? '新增待辦事項' : 'New task'}
            value={state.todoInput}
            className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm"
            placeholder={zh ? '接下來要做什麼？' : 'What do you need to do?'}
            onChange={(e) =>
              dispatch({ type: 'EditInput', text: e.target.value })
            }
          />
          <button className="button-primary" disabled={!state.todoInput.trim()}>
            {zh ? '新增' : 'Add'}
          </button>
        </form>
        <p className="mb-5 text-xs text-neutral-500" role="status">
          {zh
            ? `${remaining} 項未完成`
            : `${remaining} ${remaining === 1 ? 'task' : 'tasks'} remaining`}
        </p>
        {!entries.length && (
          <p className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500">
            {zh
              ? '清單還是空的，新增第一個待辦事項吧。'
              : 'A clear slate. Add your first task above.'}
          </p>
        )}
        <ul className="space-y-3">
          {entries.map(([id, todo]) => (
            <li
              key={id}
              className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-4"
            >
              <label className="flex min-w-0 items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="h-5 w-5 shrink-0 accent-[#183e35]"
                  onChange={() =>
                    dispatch({ type: 'ToggleTodoCompletion', id })
                  }
                />
                <span
                  className={`break-words text-sm ${todo.completed ? 'text-neutral-400 line-through' : ''}`}
                >
                  {todo.description}
                </span>
              </label>
              <button
                className="shrink-0 text-xs text-[#924327]"
                aria-label={`${zh ? '刪除' : 'Delete'}: ${todo.description}`}
                onClick={() => dispatch({ type: 'DeleteTodo', id })}
              >
                {zh ? '刪除' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
