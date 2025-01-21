export interface IGridConfig {
  title: string
  type: string
  category: string
  brand: string
  tags: string[]
  priceRange: { min: number; max: number }
}

export const gridConfig: IGridConfig[] = [
    {
      title: "Vegan products",
      type: "",
      category: "",
      brand: "",
      tags: ["vegan"],
      priceRange: {min: 0, max: Infinity},
    },
    {
      title: "Maybelline mascaras",
      type: "mascara",
      category: "",
      brand: "maybelline",
      tags: [],
      priceRange: {min: 0, max: Infinity},
    },
    {
      title: "Our cheapest powder blushes",
      type: "blush",
      category: "powder",
      brand: "",
      tags: [],
      priceRange: {min: 0, max: 12.0},
    },
  ]