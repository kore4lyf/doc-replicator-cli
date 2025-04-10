const XLSX = require("xlsx")



const getXlsDetails = (filePath) => {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath)

  // Get the first sheet name
  const sheetName = workbook.SheetNames[0]

  // Get the first sheet
  const worksheet = workbook.Sheets[sheetName]

  // Convert the sheet to JSON
  const sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  // headers (first row)
  const headers = sheet[0]

  // data
  const data = sheet.slice(1)

  // init headerIndex
  const headerIndex = {
    "full name": "",
    "property type": "",
    "house number": "",
    "customer address": "",
    "serial no": 0,
  }

  const expectedHeadersList = Object.keys(headerIndex)

  // Set index to expectedHeaderObj from Headers
  for(let [index, header] of headers.entries()) {
    header = header.toLowerCase()

    for(let expectedHeader of expectedHeadersList) {  
      expectedHeader = expectedHeader.toLowerCase()

      if(header.includes(expectedHeader)) {
        headerIndex[expectedHeader] = index
      }
    }
  }

  return { headerIndex, data}
}


module.exports = { getXlsDetails }

