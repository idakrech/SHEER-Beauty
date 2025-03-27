import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../redux"
import {
  toggleCategory,
  toggleBrand,
  toggleColor,
  toggleTag,
} from "../redux/filterSlice"
import { useExtractFilters } from "../hooks/useExtractFilters"
import { useState } from "react"
import { Close } from "@mui/icons-material"

const Sidebar = ({
  type,
  category,
  isOpen,
  onClose,
}: {
  type: string
  category?: string
  isOpen?: boolean
  onClose?: () => void
}) => {
  const { uniqueCategories, uniqueBrands, uniqueTags, uniqueColors } =
    useExtractFilters(type, category)
  const dispatch = useDispatch<AppDispatch>()
  const selectedColors = useSelector(
    (state: AppState) => state.productFilter.selectedColors
  )
  const [showAllColors, setShowAllColors] = useState<boolean>(false)
  const visibleColors = showAllColors ? uniqueColors : uniqueColors.slice(0, 12)

  return (
    <div
      className={`
     border border-zinc-300 p-5 lg:p-3 h-auto lg:z-70
    ${
      isOpen
        ? "fixed top-0 left-0 md:w-1/2 h-full bg-primary z-[100] max-h-[100vh] overflow-y-auto"
        : "hidden"
    }
    lg:block lg:w-64 lg:relative lg:h-auto lg:bg-secondary/25 lg:mt-5 lg:mr-3
  `}
    >
      {isOpen && (
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          <Close />
        </button>
      )}

      {!category && uniqueCategories.length > 0 && (
        <div className="mb-2">
          <h3 className="font-semibold mb-1">Subcategories</h3>
          <ul>
            {uniqueCategories.map((cat) => (
              <li key={cat}>
                <input
                  type="checkbox"
                  onChange={() => dispatch(toggleCategory(cat || ""))}
                />
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

      {uniqueTags.length > 0 && (
        <div className="mb-2">
          <h3 className="font-semibold mb-1">Tags</h3>
          <ul>
            {uniqueTags.map((tag) => (
              <li key={tag} className="mb-1">
                <input
                  type="checkbox"
                  onChange={() => dispatch(toggleTag(tag))}
                />
                {` ${tag}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {uniqueColors.length > 0 && (
        <div className="mb-2">
          <h3 className="font-semibold mb-1">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {visibleColors.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full border border-zinc-300 cursor-pointer 
          ${selectedColors?.includes(color) ? "ring-2 ring-accent" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => dispatch(toggleColor(color))}
              ></div>
            ))}
          </div>
          {uniqueColors.length > 12 && (
            <button
              onClick={() => setShowAllColors(!showAllColors)}
              className="mt-2 text-sm hover:underline"
            >
              {showAllColors ? "Show less" : "More"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
export default Sidebar
