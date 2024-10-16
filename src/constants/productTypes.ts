import { IProductType } from "../types/interfaces";

export const productTypes: IProductType[] = [
    {
        name: 'blush',
        categories: ['powder', 'cream']
    },
    {
        name: 'bronzer',
        categories: ['powder']
    },
    {
        name: 'eyebrow',
        categories: ['pencil']
    },
    {
        name: 'eyeliner',
        categories: ['liquid', 'pencil', 'gel', 'cream']
    },
    {
        name: 'eyeshadow',
        categories: ['palette', 'pencil', 'cream', '']
    },
    {
        name: 'foundation',
        categories: ['concealer', 'liquid', 'contour', 'bb_cc', 'cream', 'mineral', 'powder', 'highlighter']
    },
    {
        name: 'lip_liner',
        categories: ['pencil']
    },
    {
        name: 'lipstick',
        categories: ['lipstick', 'lip_gloss', 'liquid', 'lip_stain']
    },
    {
        name: 'mascara',
        categories: null
    },
    {
        name: 'nail_polish',
        categories: null
    }
]