import cloudImg from "../assets/grid-images/cloud-woman.jpg"
import blushImg from "../assets/grid-images/model-blush.jpg"
import gradient1 from "../assets/gradients/v904-nunny-029-g.jpg"
import gradient2 from "../assets/gradients/v904-nunny-015-l.jpg"
import gradient3 from "../assets/gradients/v904-nunny-035-l.jpg"
import gradient4 from "../assets/gradients/v904-nunny-005-l.jpg"
import blushCheeks2 from "../assets/grid-images/blush-cheeks-2.jpg"
import faceFlower from "../assets/grid-images/face-flower.jpg"

import blush from "../assets/grid-images/blush.jpg"
import candy from "../assets/grid-images/candy.jpg"
import mascara from "../assets/grid-images/mascara.jpg"
import smiley from "../assets/grid-images/smiley.jpg"


export interface IGridConfig {
  title: string
  subtitle: string
  type: string
  category: string
  brand: string
  tags: string[]
  priceRange: { min: number; max: number },
  image: string
}

export const gridConfig: IGridConfig[] = [
    {
      title: "Selection", 
      subtitle: "of our vegan lip products 🌱",
      type: "lipstick",
      category: "",
      brand: "",
      tags: ["vegan"],
      priceRange: {min: 0, max: Infinity},
      image: "smiley.jpg"
    },
    {
      title: "Our cheapest",
      subtitle: "powder blushes 🍒",
      type: "blush",
      category: "powder",
      brand: "",
      tags: [],
      priceRange: {min: 0, max: 12.0},
      image: "blush.jpg"
    },
    {
      title: "Look at these",
      subtitle: "Maybelline mascaras! 👀",
      type: "mascara",
      category: "",
      brand: "maybelline",
      tags: [],
      priceRange: {min: 0, max: Infinity},
      image: "mascara.jpg"
    },
  ]

  export const imageMap: Record<string, string> = {
    "cloud-woman.jpg": cloudImg,
    "model-blush.jpg": blushImg,
    "v904-nunny-029-g.jpg": gradient1,
    "v904-nunny-015-l.jpg": gradient2,
    "v904-nunny-035-l.jpg": gradient3,
    "v904-nunny-005-l.jpg": gradient4,
    "blush-cheeks-2.jpg": blushCheeks2,
    "face-flower.jpg": faceFlower,
    "blush.jpg": blush,
    "candy.jpg": candy,
    "mascara.jpg": mascara,
    "smiley.jpg": smiley
  }
  
  //<a href="https://www.freepik.com/free-photo/flirty-dark-haired-girl-pink-headband-massive-earrings-covers-eye-with-candy_12727462.htm">Image by lookstudio on Freepik</a>
  //<a href="https://www.freepik.com/free-photo/beautiful-young-woman-portrait-with-make-up-product_17861190.htm">Image by freepik</a>
  //<a href="https://www.freepik.com/free-photo/high-angle-beautiful-woman-wearing-pink-makeup_25967301.htm">Image by freepik</a>
  //<a href="https://www.freepik.com/free-photo/side-view-smiley-woman-posing-with-pink-background_25967304.htm">Image by freepik</a>