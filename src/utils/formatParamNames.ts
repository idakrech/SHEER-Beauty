export const formatParamName = (name: string) => {
    if (!name) return ''
    return name
      .split('_') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' ')
  }
  