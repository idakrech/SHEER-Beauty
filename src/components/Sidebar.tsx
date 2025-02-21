import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux"
import {
  toggleCategory,
  toggleBrand,
  toggleColor,
  toggleTag,
} from "../redux/filterSlice"
import { useExtractFilters } from "../hooks/useExtractFilters"

const Sidebar = ({ type, category }: { type: string; category?: string }) => {
  const { uniqueCategories, uniqueBrands, uniqueTags, uniqueColors } =
    useExtractFilters(type, category)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="font-sans text-left font-light w-64 text-zinc-700 mt-5 mr-2 bg-secondary/25 border border-zinc-300 p-3 h-auto">
      {!category && (
        <div className="mb-2">
          <h3 className="font-semibold mb-1">Subcategories</h3>
          <ul>
            {uniqueCategories.map((cat) => (
              <li key={cat}>
                <input type="checkbox" onChange={() => dispatch(toggleCategory(cat || ""))}/>
                {` ${cat && cat.charAt(0).toUpperCase() + cat.slice(1)}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-2">
        <h3 className="font-semibold mb-1">Brands</h3>
        <ul>
          {uniqueBrands.map((brand) => (
            <li key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                onChange={() => dispatch(toggleBrand(brand))}
                className="mr-2"
              />
              {` ${brand.charAt(0).toUpperCase() + brand.slice(1)}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <h3 className="font-semibold mb-1">Tags</h3>
        <ul>
          {uniqueTags.map((tag) => (
            <li key={tag}>
              <input
                type="checkbox"
                onChange={() => dispatch(toggleTag(tag))}
              />
              {` ${tag}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <h3 className="font-semibold mb-1">Colors</h3>
        <ul>
          {uniqueColors.map((color) => (
            <li key={color}>
              <input
                type="checkbox"
                onChange={() => dispatch(toggleColor(color))}
              />
              {color}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Sidebar
