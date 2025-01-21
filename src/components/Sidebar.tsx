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
    <div>
      {!category && (
        <div>
          <h3>Subcategories</h3>
          <ul>
            {uniqueCategories.map((cat) => (
              <li key={cat}>
                <input type="checkbox" onChange={() => dispatch(toggleCategory(cat || ""))}/>
                {cat}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3>Brands</h3>
        <ul>
          {uniqueBrands.map((brand) => (
            <li key={brand}>
              <input
                type="checkbox"
                onChange={() => dispatch(toggleBrand(brand))}
              />
              {brand}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Tags</h3>
        <ul>
          {uniqueTags.map((tag) => (
            <li key={tag}>
              <input
                type="checkbox"
                onChange={() => dispatch(toggleTag(tag))}
              />
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Colors</h3>
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
