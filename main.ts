import * as path from "path"
import { generateDocFiles } from './generateDocFiles'
import { setDate, createFoldersIfNotExist } from "./utils/utils"
import { getDataFromXls } from "./getDataFromXls"

// -------------------------------------------------------

// Modify the following data
const day = 14
let month: string = "march"
const year = 2025
const xlsFilename = "March 2025 - Valuation 90.xlsx"


// All folders are stored in the out/ folder of the current directory
// Modify stamped and unstamped folder name

const UnstampedFolderName = "unstamped"
const StampedFolderName = "stamped"

// XLS filename 
const xlsFilePath = path.join(__dirname, "xls", xlsFilename)

// -------------------------------------------------------

try {
  // Transforms month to a proper case
  month = `${month.substring(0, 1).toUpperCase()}${month.substring(1)}`

  const outputPaths = {
    unStamped: path.join(__dirname, "out", UnstampedFolderName), // Doesn't contain the stamp
    stamped: path.join(__dirname, "out", StampedFolderName), // Contains stamp
  }

  const date = setDate(day, month, year)

  // Ensure out/ folders are created
  createFoldersIfNotExist(Object.values(outputPaths))

  // Get Excel data
  const {headerIndex, data} = getDataFromXls(xlsFilePath)

  // Generate 
  generateDocFiles(date, outputPaths, headerIndex, data as string[][])

} catch(error) {
  console.log("Error generating report: ", error)
}