import * as path from "path"

export const getTemplatePath = (propertyType: string, renderImages: boolean) => {
  propertyType = propertyType.toLowerCase()

  const properties: {[key: string]: string}[] = [
    {
      type: "1 Bedroom 4-in-1 Bungalow".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "1 bedroom 4 in 1 bungalow - template.docx")
    },
    {
      type: "1 Bedroom 2-in-1 Bungalow".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "1 bedroom 2 in 1 bungalow - template.docx")
    },
    {
      type: "1 Bedroom 8-in-1 Flat".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "1 bed 8 in 1 Flat - template.docx")
    },
    {
      type: "2 bedroom Semi-detached Bungalow".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "2 Bedroom Semi Detached Bungalow - template.docx")
    },
    {
      type: "3 bedroom Semi-detached Bungalow".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "3 Bedroom Semi Detached Bungalow - template.docx")
    },
    {
      type: "4 bedroom detached duplex".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "4 Bedroom Detached Duplex - template.docx")
    },
    {
      type: "4 bedroom detached bungalow".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "4 Bedroom Detached Bungalow - template.docx")
    },
    {
      type: "4 bedroom detached luxury bungalow".toLowerCase(),
      path: path.join(__dirname, "templates", renderImages ? "stamped" : "unstamped", "4 Bedroom Detached Luxury Bungalow - template.docx")
    }
  ]

  const index = properties.findIndex((property) => property.type === propertyType)
  
  if(index < 0) {
    throw new Error(`Template: ${propertyType} not found!`)
  }

  return properties[index].path
}