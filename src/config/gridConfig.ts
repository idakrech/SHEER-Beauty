import cloudImg from "../assets/grid-images/cloud-woman.jpg"
import blushImg from "../assets/grid-images/model-blush.jpg"
import gradient1 from "../assets/gradients/v904-nunny-029-g.jpg"
import gradient2 from "../assets/gradients/v904-nunny-015-l.jpg"
import gradient3 from "../assets/gradients/v904-nunny-035-l.jpg"
import gradient4 from "../assets/gradients/v904-nunny-005-l.jpg"
import blushCheeks2 from "../assets/grid-images/blush-cheeks-2.jpg"
import faceFlower from "../assets/grid-images/face-flower.jpg"


export interface IGridConfig {
  title: string
  type: string
  category: string
  brand: string
  tags: string[]
  priceRange: { min: number; max: number },
  images: string[]
  imgStyle: string
  imgOverlayStyle: string
}

export const gridConfig: IGridConfig[] = [
    {
      title: "Selection of our vegan products 🌱",
      type: "",
      category: "",
      brand: "",
      tags: ["vegan"],
      priceRange: {min: 0, max: Infinity},
      images: ["v904-nunny-015-l.jpg", "face-flower.jpg"],
      imgStyle: "object-cover w-[calc(100%-0.5rem)]",
      imgOverlayStyle: "h-full border border-zinc-500 bg-accent/25 translate-y-2 translate-x-2 w-[calc(100%-0.5rem)]"
    },
    {
      title: "Our cheapest powder blushes 🍒",
      type: "blush",
      category: "powder",
      brand: "",
      tags: [],
      priceRange: {min: 0, max: 12.0},
      images: ["v904-nunny-035-l.jpg", "blush-cheeks-2.jpg"],
      imgStyle: "h-full w-[calc(100%-0.5rem)]",
      imgOverlayStyle: "h-full border border-zinc-500 bg-accent/25 translate-y-2 translate-x-2 w-[calc(100%-0.5rem)]"
    },
    {
      title: "Look at these Maybelline mascaras! 👀",
      type: "mascara",
      category: "",
      brand: "maybelline",
      tags: [],
      priceRange: {min: 0, max: Infinity},
      images: ["v904-nunny-029-g.jpg"],
      imgStyle: "h-full w-[calc(100%-0.5rem)]",
      imgOverlayStyle: "h-full border border-zinc-500 bg-accent/25 translate-y-2 translate-x-2 w-[calc(100%-0.5rem)]"
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
    "face-flower.jpg": faceFlower
  }
  