/** The 12-column grid, drawn as hairlines behind a section on desktop. */
export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="wrap grid-12 h-full">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-full border-x border-foreground/[0.06]" />
        ))}
      </div>
    </div>
  )
}
