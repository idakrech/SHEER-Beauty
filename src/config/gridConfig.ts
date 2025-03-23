import blush from "../assets/grid-images/blush.jpg"
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
    "blush.jpg": blush,
    "mascara.jpg": mascara,
    "smiley.jpg": smiley
  }
  