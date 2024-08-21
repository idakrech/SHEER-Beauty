import { FetchProductParams } from "../types/interfaces"

function buildURL (baseURL: string, params: FetchProductParams) {
    const url = new URL(baseURL)
    const urlParams = new URLSearchParams()

    Object.keys(params).forEach((key) => {
        const value = params[key as keyof FetchProductParams]
        if (value !== undefined && value !== null) {
            urlParams.append(key, String(value))
        }
    })

    url.search = urlParams.toString()

    return url.toString()
}

export default buildURL