import * as path from "path"
import { generateDocFiles } from './generateDocFiles'
import { setDate, createFolderIfNotExist } from "./utils/utils"
import { getDataFromXls } from "./getDataFromXls"
import * as readline from "readline"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// -------------------------------------------------------

// Modify the following data
const day = 14
let month: string = "march"
const year = 2025
const xlsFilename = "March 2025 - Valuation 90.xlsx"
const imagePath = {
  dateImg: "./assets/date.png",
  signature: "./assets/signature.png",
  esvStamp: "./assets/esvStamp.png",
  stamp: "./assets/stamp.png"
}


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

  const outputPath = {
    unstamped: path.join(__dirname, "out", UnstampedFolderName), // Doesn't contain the stamp
    stamped: path.join(__dirname, "out", StampedFolderName), // Contains stamp
  }

  const date = setDate(day, month, year)

  
  // Get Excel data
  const {headerIndex, data} = getDataFromXls(xlsFilePath)
  
  rl.question(
    "\nSelect the type of document you want. (Reply with a number e.g. 1 \n1. Stamped\n2. Unstamped\n",
    (answer: string) => {
      answer = answer.trim()
      
      if(Number(answer)){
        const docType = Number(answer) === 1 ? "stamped" : "unstamped"
        
        // Ensure out/ and subfolder folder are created
        createFolderIfNotExist(outputPath[docType])
        
        // Generate Documents
        generateDocFiles(date, outputPath[docType], imagePath, headerIndex, data as string[][])

      } 
      rl.close()
    }
  )

  // Generate 

} catch(error) {
  console.log("Error generating report: ", error)
}

