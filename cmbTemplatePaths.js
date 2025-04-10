const path = require("path")
const currentPath = __dirname


const getTemplatePaths = (propertyType) => {
  propertyType = propertyType.toLowerCase()
  
  // Expected names for each property
  // const ONE_BEDROOM_4_IN_1_BUNGALOW = "1 bedroom 4 in 1 bungalow"
  // const ONE_BEDROOM_2_IN_1_BUNGALOW = "1 bedroom 2 in 1 bungalow"
  // const ONE_BEDROOM_8_IN_1_FLAT = "1 bedroom 8 in 1 flat"
  // const TWO_BEDROOM_BUNGALOW = "2 bedroom bungalow"
  // const THREE_BEDROOM_BUNGALOW = "3 bedroom bungalow"
  // const FOUR_BEDROOM_DETACHED_DUPLEX = "4 bedroom detached duplex"
  // const FOUR_BEDROOM_DETACHED_BUNGALOW = "4 bedroom detached bungalow"

  const ONE_BEDROOM_4_IN_1_BUNGALOW = "1 Bedroom 4-in-1 Bungalow".toLowerCase()
  const ONE_BEDROOM_2_IN_1_BUNGALOW = "1 Bedroom 2-in-1 Bungalow".toLowerCase()
  const ONE_BEDROOM_8_IN_1_FLAT = "1 Bedroom 8-in-1 Flat".toLowerCase()
  const TWO_BEDROOM_BUNGALOW = "2 bedroom Semi-detached Bungalow".toLowerCase()
  const THREE_BEDROOM_BUNGALOW = "3 bedroom Semi-detached Bungalow".toLowerCase()
  const FOUR_BEDROOM_DETACHED_DUPLEX = "4 bedroom detached duplex".toLowerCase()
  const FOUR_BEDROOM_DETACHED_BUNGALOW = "4 bedroom detached bungalow".toLowerCase()
  const FOUR_BEDROOM_DETACHED_LUXURY_BUNGALOW = "4 bedroom detached luxury bungalow".toLowerCase()
  
  // Paths for for the docx templates without stamp 
  const ONE_BEDROOM_4_IN_1_BUNGALOW_PATH = path.join(__dirname, "template", "1 bedroom 4 in 1 bungalow - template.docx")
  const ONE_BEDROOM_2_IN_1_BUNGALOW_PATH = path.join(__dirname, "template", "1 bedroom 2 in 1 bungalow - template.docx")
  const ONE_BEDROOM_8_IN_1_FLAT_PATH = path.join(__dirname, "template", "1 bed 8 in 1 Flat - template.docx")
  const TWO_BEDROOM_BUNGALOW_PATH = path.join(__dirname, "template", "2 Bedroom Semi Detached Bungalow - template.docx")
  const THREE_BEDROOM_BUNGALOW_PATH = path.join(__dirname, "template", "3 Bedroom Semi Detached Bungalow - template.docx")
  const FOUR_BEDROOM_DETACHED_DUPLEX_PATH = path.join(__dirname, "template", "4 Bedroom Detached Duplex - template.docx")
  const FOUR_BEDROOM_DETACHED_BUNGALOW_PATH = path.join(__dirname, "template", "4 Bedroom Detached Bungalow - template.docx")
  const FOUR_BEDROOM_DETACHED_LUXURY_BUNGALOW_PATH = path.join(__dirname, "template", "4 Bedroom Detached Luxury Bungalow - template.docx")
  
  // Paths for for the docx templates without stamp 
  const STAMPED_ONE_BEDROOM_4_IN_1_BUNGALOW_PATH = path.join(__dirname, "template", "stamped", "stamped - 1 bedroom 4 in 1 bungalow - template.docx")
  const STAMPED_ONE_BEDROOM_2_IN_1_BUNGALOW_PATH = path.join(__dirname, "template", "stamped", "stamped - 1 bedroom 2 in 1 bungalow - template.docx")
  const STAMPED_ONE_BEDROOM_8_IN_1_FLAT_PATH = path.join(__dirname, "template", "stamped", "stamped - 1 bed 8 in 1 Flat - template.docx")
  const STAMPED_TWO_BEDROOM_BUNGALOW_PATH = path.join(__dirname, "template", "stamped", "stamped - 2 Bedroom Semi Detached Bungalow - template.docx")
  const STAMPED_THREE_BEDROOM_BUNGALOW_PATH = path.join(__dirname, "template", "stamped", "stamped - 3 Bedroom Semi Detached Bungalow - template.docx")
  const STAMPED_FOUR_BEDROOM_DETACHED_DUPLEX_PATH = path.join(__dirname, "template", "stamped", "stamped - 4 Bedroom Detached Duplex - template.docx")
  const STAMPED_FOUR_BEDROOM_DETACHED_BUNGALOW_PATH = path.join(__dirname, "template", "stamped", "stamped - 4 Bedroom Detached Bungalow - template.docx")
  const STAMPED_FOUR_BEDROOM_DETACHED_LUXURY_BUNGALOW_PATH = path.join(__dirname, "template", "stamped", "stamped - 4 Bedroom Detached Luxury Bungalow - template.docx")
  
  
  const propertyTypeList = [ONE_BEDROOM_2_IN_1_BUNGALOW, ONE_BEDROOM_4_IN_1_BUNGALOW, ONE_BEDROOM_8_IN_1_FLAT, TWO_BEDROOM_BUNGALOW, THREE_BEDROOM_BUNGALOW, FOUR_BEDROOM_DETACHED_DUPLEX, FOUR_BEDROOM_DETACHED_BUNGALOW, FOUR_BEDROOM_DETACHED_LUXURY_BUNGALOW]

  // The only reason, the property type has to be looped through is because of the data is not always consistent. 
  // The loop on checks for expected characters in a property.
  for(let item of propertyTypeList) {
      item = item.toLowerCase()
    if(propertyType.includes(item) && item == ONE_BEDROOM_4_IN_1_BUNGALOW) {
      return [ONE_BEDROOM_4_IN_1_BUNGALOW_PATH, STAMPED_ONE_BEDROOM_4_IN_1_BUNGALOW_PATH]
    }
    else if(propertyType.includes(item) && item == ONE_BEDROOM_2_IN_1_BUNGALOW) {
      return [ONE_BEDROOM_2_IN_1_BUNGALOW_PATH, STAMPED_ONE_BEDROOM_2_IN_1_BUNGALOW_PATH]
    }
    else if(propertyType.includes(item) && item == ONE_BEDROOM_8_IN_1_FLAT) {
      return [ONE_BEDROOM_8_IN_1_FLAT_PATH, STAMPED_ONE_BEDROOM_8_IN_1_FLAT_PATH]
    } 
    else if(propertyType.includes(item) && item == TWO_BEDROOM_BUNGALOW) {
      return [TWO_BEDROOM_BUNGALOW_PATH, STAMPED_TWO_BEDROOM_BUNGALOW_PATH]
    } 
    else if(propertyType.includes(item) && item == THREE_BEDROOM_BUNGALOW) {
      return [THREE_BEDROOM_BUNGALOW_PATH, STAMPED_THREE_BEDROOM_BUNGALOW_PATH]
    } 
    else if (propertyType.includes(item) && item == FOUR_BEDROOM_DETACHED_DUPLEX) {
      return [FOUR_BEDROOM_DETACHED_DUPLEX_PATH, STAMPED_FOUR_BEDROOM_DETACHED_DUPLEX_PATH]
    } 
    else if (propertyType.includes(item) && item == FOUR_BEDROOM_DETACHED_BUNGALOW) {
      return [FOUR_BEDROOM_DETACHED_BUNGALOW_PATH, STAMPED_FOUR_BEDROOM_DETACHED_BUNGALOW_PATH]
    }
    else if (propertyType.includes(item) && item == FOUR_BEDROOM_DETACHED_LUXURY_BUNGALOW) {
      return [FOUR_BEDROOM_DETACHED_LUXURY_BUNGALOW_PATH, STAMPED_FOUR_BEDROOM_DETACHED_LUXURY_BUNGALOW_PATH]
    }
  }
  
  console.log("File not found!")
  return []
}

module.exports = {getTemplatePaths}