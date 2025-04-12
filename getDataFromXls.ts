import * as XLSX from "xlsx"
import { IheaderIndex } from "./utils/interface"

export const getDataFromXls = (filePath: string) => {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath)

  // Get the first sheet name
  const sheetName = workbook.SheetNames[0]

  // Get the first sheet
  const worksheet = workbook.Sheets[sheetName]

  // Convert the sheet to JSON
  const sheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

  // Get headers (first row)
  const headers = sheet[0] as string[]

  // data
  const data = sheet.slice(1)

  const headerIndex = getHeaderIndex(headers)

  return { headerIndex, data}
}

const getHeaderIndex = ([...headers]: string[]) => {
  // Identify and assign the needed header's index 

  // init headerIndex
  const headerIndex: IheaderIndex= {
    "full name": -1,
    "property type": -1,
    "house number": -1,
    "customer address": -1,
    "serial no": 0,
  }

  const headerIndexNames: string[] = Object.keys(headerIndex)

  // Map index to their appropriate header name from Headers to headerIndex
  for(let headerName of headers) {

    const index = headers.indexOf(headerName)
    headerName = headerName.toLowerCase()

    if(headerIndexNames.includes(headerName)) {
      headerIndex[headerName] = index
    }
  }

  validateHeader(headerIndex)
  return headerIndex
}

const validateHeader = (headerIndex: IheaderIndex) => {
  // Ensure no header index data is undefined
  for(const headerName in headerIndex) {
    if(headerIndex[headerName] === -1) throw new Error(`${headerIndex[headerName]} is missing or not correctly spelt in the excel sheet`)
  }
}