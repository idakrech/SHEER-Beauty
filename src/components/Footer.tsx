import insta from "../assets/instagram.png"
import fb from "../assets/facebook.png"
import x from "../assets/x.png"

const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-accent footer">
      <div className="w-2/3">
        <div className="w-full grid grid-cols-5 gap-2 py-8">
          <div className="flex flex-col">
            <a href="/about-us">About Us</a>
            <a href="/careers">Careers</a>
            <a href="/blog">Blog</a>
          </div>

          <div className="flex flex-col">
            <a href="/contact-us">Contact Us</a>
            <a href="/returns-and-exchanges">Returns & Exchanges</a>
            <a href="/faq">FAQ</a>
            <a href="/shipping-information">Shipping Information</a>
          </div>

          <div className="flex flex-col">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms & Conditions</a>
            <a href="/gift-cards">Gift Cards</a>
          </div>

          <div className="flex flex-col gap-2 items-start justify-start">
            <h3 className="font-bold">Image credits:</h3>
            <a href="https://www.freepik.com/free-photo/beautiful-young-woman-portrait-with-make-up-product_17861190.htm" className="underline">
              Image by freepik
            </a>
            <a href="https://www.freepik.com/free-photo/high-angle-beautiful-woman-wearing-pink-makeup_25967301.htm" className="underline">
              Image by freepik
            </a>
            <a href="https://www.freepik.com/free-photo/side-view-smiley-woman-posing-with-pink-background_25967304.htm" className="underline">
              Image by freepik
            </a>
          </div>

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
        </div>
      </div>
    </div>
  )
}

export default Footer
