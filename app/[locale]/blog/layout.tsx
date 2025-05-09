export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-6 py-12">
      {children}
    </div>
  )
}
