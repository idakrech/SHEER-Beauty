import insta from "../assets/instagram.png"
import fb from "../assets/facebook.png"
import x from "../assets/x.png"

const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-accent footer">
      <div className="w-3/4">
        <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-2 py-8">
          <div className="flex gap-2 items-start justify-start">
            <a href="https://instagram.com">
              <img src={insta} className="w-8" />
            </a>
            <a href="https://facebook.com">
              <img src={fb} className="w-8" />
            </a>
            <a href="https://x.com">
              <img src={x} className="w-8" />
            </a>
          </div>

          <div className="flex flex-col">
            <a href="/">About Us</a>
            <a href="/">Careers</a>
            <a href="/">Blog</a>
          </div>

          <div className="flex flex-col">
            <a href="/">Contact Us</a>
            <a href="/">Returns & Exchanges</a>
            <a href="/">FAQ</a>
            <a href="/">Shipping Information</a>
          </div>

          <div className="flex flex-col">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms & Conditions</a>
            <a href="/">Gift Cards</a>
          </div>

          <div className="flex flex-col gap-2 items-start justify-start">
            <h3 className="font-bold">Image credits:</h3>
            <a
              href="https://www.freepik.com/free-photo/beautiful-young-woman-portrait-with-make-up-product_17861190.htm"
              className="underline"
            >
              Image by freepik
            </a>
            <a
              href="https://www.freepik.com/free-photo/high-angle-beautiful-woman-wearing-pink-makeup_25967301.htm"
              className="underline"
            >
              Image by freepik
            </a>
            <a
              href="https://www.freepik.com/free-photo/side-view-smiley-woman-posing-with-pink-background_25967304.htm"
              className="underline"
            >
              Image by freepik
            </a>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold">About me & this project</h3>
            <p className="mb-2 text-sm">
              Hi! My name is Ida and I'm a frontend & mobile developer with
              basic backend skills. This project is part of my portfolio — feel
              free to explore and connect!
            </p>
            <a href="https://www.linkedin.com/in/ida-krech/" className="text-sm">
              LinkedIn Profile
            </a>
            <a href="https://github.com/idakrech" className="text-sm">GitHub</a>
            <a href="https://github.com/idakrech/SHEER-Beauty" className="text-sm">
              Project Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
