export const formatDescription = (description: string) => {
    const parts = description.split(/Ingredients:/i)
  
    return (
      <>
        <p>{parts[0].trim()}</p>
        {parts[1] && (
          <p className="mt-4">
            <strong>Ingredients:</strong> {parts[1].trim()}
          </p>
        )}
      </>
    )
  }
  