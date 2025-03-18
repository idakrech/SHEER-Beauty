const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  return (
    <button onClick={onClick} className="h-12 w-auto px-4 py-2 border border-zinc-500 font-sans font-semibold text-md text-gray-500 bg-primary hover:bg-accent/50">
    {children}
  </button>
  )
}

export default Button