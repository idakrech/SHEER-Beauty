import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {

const navigate = useNavigate()
    
  return (
    <div className="flex text-center justify-center items-center w-full h-full mt-5" style={{ height: "45vh" }}>
      <div className="flex flex-col justify-center items-center bg-white p-5 w-2/3 h-full border border-zinc-300 my-4 text-zinc-700">
        <h3 className="text-xl text-zinc-700 font-serif font-bold mt-2 mb-4">
          {`Page not found :(`}
        </h3>
       
          <button
            onClick={() => {
              navigate("/")
            }}
            className="w-auto border border-zinc-300 text-center text-zinc-700 px-3 mt-6 rounded-md bg-accent/50 hover:bg-accent duration-200 ease-in w-1/2 mx-1 py-1"
          >
            Go to home page
          </button>
      </div>
    </div>
  )
}

export default NotFoundPage