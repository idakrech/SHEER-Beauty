

const InitializationSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white border border-zinc-300 m-20">
      <div className="w-24 h-24 border-4 border-pink-500 border-dashed rounded-full slow-spinner"></div>
      <p className="text-md mt-10">Fetching the latest makeup collections... Please hold on! 💖</p>
    </div>
  )
}

export default InitializationSpinner