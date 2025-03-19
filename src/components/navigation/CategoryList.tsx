import { Link } from "react-router-dom"
import { productTypes } from "../../constants/productTypes"
import { formatParamName } from "../../helpers/formatParamNames"

const CategoryList = () => {
  const types = productTypes

  return (
    <ul className="p-5 text-left font-sans font-light grid gap-5 grid-cols-10">
    {types.map((type, index) => (
      <li key={index} className="mb-2">
        <Link to={`/category-page?type=${type.name}`}>
          <p className="font-sans font-semibold mb-1 underline">{formatParamName(type.name)}</p>
        </Link>
        <ul className="text-left">
          <li className="hover:text-dark"><Link to={`/category-page?type=${type.name}`}>All</Link></li>
          {type.categories?.map((cat, i) => (
            <li key={i} className="hover:text-dark">
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
