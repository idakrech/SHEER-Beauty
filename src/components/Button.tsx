const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  return (
    <button onClick={onClick} className="h-12 w-auto px-4 py-2 border border-zinc-500 rounded-md font-sans font-semibold text-md bg-accent/50 hover:bg-accent">
    {children}
  </button>
  )
}

export default Button