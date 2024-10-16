/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom"
import { productTypes } from "../constants/productTypes"
import { formatParamName } from "../utils/formatParamNames"

const NavigationList = () => {
  const types = productTypes

  return (
    <ul>
      {types.map((type, index) => (
        <li key={index}>
          <Link to={`/category-page?type=${type.name}`}>
            <strong>{formatParamName(type.name)}</strong>
          </Link>
          <ul>
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

export default NavigationList
