import cloudImg from "../assets/grid-images/cloud-woman.jpg"
import blushImg from "../assets/grid-images/model-blush.jpg"
import mascaraImg from "../assets/grid-images/model-mascara.jpg"
import gradient1 from "../assets/gradients/v904-nunny-029-g.jpg"
import gradient2 from "../assets/gradients/v904-nunny-015-l.jpg"
import gradient3 from "../assets/gradients/v904-nunny-035-l.jpg"
import gradient4 from "../assets/gradients/v904-nunny-005-l.jpg"
import blushCheeks2 from "../assets/grid-images/blush-cheeks-2.jpg"
import catEyes2 from "../assets/grid-images/cat-eyes-2.jpg"
import catEyes from "../assets/grid-images/cat-eyes.jpg"
import dramaticMakeup from "../assets/grid-images/dramatic-makeup.jpg"
import eyeshadowArt from "../assets/grid-images/eyeshadow-art.jpg"
import eyeshadowPink2 from "../assets/grid-images/eyeshadow-pink-2.jpg"
import eyeshadowRedProfile from "../assets/grid-images/eyeshadow-red-profile.jpg"
import eyeshadowsFrost from "../assets/grid-images/eyeshadows-frost.jpg"
import eyeshadowPink1 from "../assets/grid-images/eyeshadow-pink-1.jpg"
import eyeshadowsRed from "../assets/grid-images/eyeshadows-red.jpg"
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
      title: "Vegan Sante products",
      type: "",
      category: "",
      brand: "sante",
      tags: ["vegan"],
      priceRange: {min: 0, max: Infinity},
      images: ["v904-nunny-015-l.jpg", "face-flower.jpg"],
      imgStyle: "object-cover w-[calc(100%-0.5rem)]",
      imgOverlayStyle: "h-full border border-gray-500 bg-accent/25 translate-y-2 translate-x-2 w-[calc(100%-0.5rem)]"
    },
    {
      title: "Our cheapest powder blushes",
      type: "blush",
      category: "powder",
      brand: "",
      tags: [],
      priceRange: {min: 0, max: 12.0},
      images: ["v904-nunny-035-l.jpg", "blush-cheeks-2.jpg"],
      imgStyle: "h-full w-[calc(100%-0.5rem)]",
      imgOverlayStyle: "h-full border border-gray-500 bg-accent/25 translate-y-2 translate-x-2 w-[calc(100%-0.5rem)]"
    },
    {
      title: "Maybelline mascaras",
      type: "mascara",
      category: "",
      brand: "maybelline",
      tags: [],
      priceRange: {min: 0, max: Infinity},
      images: ["v904-nunny-029-g.jpg"],
      imgStyle: "h-full w-[calc(100%-0.5rem)]",
      imgOverlayStyle: "h-full border border-gray-500 bg-accent/25 translate-y-2 translate-x-2 w-[calc(100%-0.5rem)]"
    },
  ]

  export const imageMap: Record<string, string> = {
    "cloud-woman.jpg": cloudImg,
    "model-blush.jpg": blushImg,
    "model-mascara.jpg": mascaraImg,
    "v904-nunny-029-g.jpg": gradient1,
    "v904-nunny-015-l.jpg": gradient2,
    "v904-nunny-035-l.jpg": gradient3,
    "v904-nunny-005-l.jpg": gradient4,
    "blush-cheeks-2.jpg": blushCheeks2,
    "cat-eyes-2.jpg": catEyes2,
    "cat-eyes.jpg": catEyes,
    "dramatic-makeup.jpg": dramaticMakeup,
    "eyeshadow-art.jpg": eyeshadowArt,
    "eyeshadow-pink-2.jpg": eyeshadowPink2,
    "eyeshadow-red-profile.jpg": eyeshadowRedProfile,
    "eyeshadows-frost.jpg": eyeshadowsFrost,
    "eyeshadow-pink-1.jpg": eyeshadowPink1,
    "eyeshadows-red.jpg": eyeshadowsRed,
    "face-flower.jpg": faceFlower
  }
  