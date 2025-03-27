

const InitializationSpinner = ({type} : {type: "single" | "plural"}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full md:w-2/3 h-[50vh] bg-white border border-zinc-300 my-5 p-5 md:p-0">
      <div className="w-24 h-24 border-4 border-pink-500 border-dashed rounded-full slow-spinner"></div>
      {type === "plural" ? 
      <p className="text-md mt-10 text-center">Loading the latest makeup collections... Please hold on! 💖</p>
      : <p className="text-md mt-10 text-center">Loading product details... Please hold on! 💖</p>
    }
      
    </div>
  )
}

export default InitializationSpinner