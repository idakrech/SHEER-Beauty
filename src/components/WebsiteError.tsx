import { imageMap } from "../config/gridConfig"

const WebsiteError = () => {
    
  return (
    <div className="relative bg-cover bg-center bg-no-repeat flex text-center justify-center items-center w-full h-[80vh] my-5" style={{ backgroundImage: `url(${imageMap["blush.jpg"]})` }}>
      <div className="bg-gradient-to-t from-accent to-transparent flex flex-col justify-center items-center absolute w-full h-full">
        <h3 className="text-4xl font-serif text-white font-bold">
          {`Oops, we are experiencing some technical issues.`}
        </h3>
        <h3 className="text-sm md:text-lg lg:text-xl uppercase font-extralight text-primary tracking-wider mt-5">Please try again later 💕</h3>
      </div>
    </div>
  )
}

export default WebsiteError