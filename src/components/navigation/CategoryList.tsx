/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom"
import { productTypes } from "../constants/productTypes"
import { formatParamName } from "../utils/formatParamNames"

const CategoryList = () => {
  const types = productTypes

  return (
    <ul className="p-2">
    {types.map((type, index) => (
      <li key={index} className="hover:bg-gray-200">
        <Link to={`/category-page?type=${type.name}`}>
          <strong>{formatParamName(type.name)}</strong>
        </Link>
        <ul className="ml-4">
          {type.categories?.map((cat, i) => (
            <li key={i}>
              <Link to={`/category-page?type=${type.name}&category=${cat}`}>
                {formatParamName(cat)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
  )
}

export default CategoryList
