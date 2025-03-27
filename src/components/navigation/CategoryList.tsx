import { Link } from "react-router-dom"
import { productTypes } from "../../constants/productTypes"
import { formatParamName } from "../../helpers/formatParamNames"
import { useState } from "react"
import { Add, Remove } from "@mui/icons-material"

const CategoryList = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggleCategory = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (  
    <ul className="w-full lg:mt-5 p-5 text-left font-sans font-light grid md:gap-5 grid-cols-1 md:grid-cols-5 lg:grid-cols-10 max-h-[80vh] overflow-y-auto">
    {productTypes.map((type, index) => (
      <li key={index} className="mb-2">
        <div className="hidden md:block">
        <Link to={`/category-page?type=${type.name}`}>
          <p className="font-serif font-bold mb-2">{formatParamName(type.name)}</p>
        </Link>
        <ul className="text-left">
          <li className="hover:text-dark"><Link to={`/category-page?type=${type.name}`}>All</Link></li>
          {type.categories?.map((cat, i) => (
            <li key={i} className="hover:text-dark mb-1">
              <Link to={`/category-page?type=${type.name}&category=${cat}`}>
                {formatParamName(cat)}
              </Link>
            </li>
          ))}
        </ul>
        </div>

        <div className="md:hidden">
            <button
              className="flex justify-between items-center w-full text-left p-2 border-b border-gray-300"
              onClick={() => toggleCategory(index)}
            >
              <span className="font-semibold">{formatParamName(type.name)}</span>
              {openIndexes.includes(index) ? <Remove /> : <Add />}
            </button>
            {openIndexes.includes(index) && (
              <ul className="pl-4 pt-2">
                <li className="hover:text-dark mb-1">
                  <Link to={`/category-page?type=${type.name}`}>All</Link>
                </li>
                {type.categories?.map((cat, i) => (
                  <li key={i} className="hover:text-dark mb-1">
                    <Link to={`/category-page?type=${type.name}&category=${cat}`}>
                      {formatParamName(cat)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
      </li>
    ))}
  </ul>


  )
}

export default CategoryList
