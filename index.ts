import * as path from "path"
import { generateDocFiles } from './generateDocFiles'
import { setDate, createFolderIfNotExist } from "./utils/utils"
import { getDataFromXls } from "./getDataFromXls"
import readline from "readline/promises"
import { stdin as input, stdout as output} from "node:process"

const rl = readline.createInterface({ input, output })

// -------------------------------------------------------

// Modify the following data
const day = 23
let month = "may"
const year = 2025
const xlsFilename = "data.xlsx"
const imagePath = {
  dateImg: "./assets/date.png",
  signature: "./assets/signature.png",
  esvStamp: "./assets/esvStamp.png",
  stamp: "./assets/stamp.png"
}
const emptyImagePath = {
  dateImg: Buffer.from("").toString("base64"),
  signature: Buffer.from("").toString("base64"),
  esvStamp: Buffer.from("").toString("base64"),
  stamp: Buffer.from("").toString("base64")
}

// All folders are stored in the out/ folder of the current directory
// Modify stamped and unstamped folder name

const UnstampedFolderName = "unstamped"
const StampedFolderName = "stamped"

// XLS filename 
const xlsFilePath = path.join(__dirname, "xls", xlsFilename)

// -------------------------------------------------------

try {
  let successfullyGenerated = false
  
  // Transforms month to a proper case
  month = `${month.substring(0, 1).toUpperCase()}${month.substring(1)}`

  const outputDir = {
    unstamped: path.join(__dirname, "out", UnstampedFolderName), // Doesn't contain the stamp
    stamped: path.join(__dirname, "out", StampedFolderName), // Contains stamp
  }

  const date = setDate(day, month, year)

  // Get Excel data
  const {headerIndex, data} = getDataFromXls(xlsFilePath);
    
  (async () => {
  while(!successfullyGenerated) {
    let answer = await rl.question(`\nSelect the type of document you want. (Reply with a number e.g. 1)
      1. Stamped
      2. Unstamped
      (type "exit" to quit )\n`)

    if(answer){
      if(answer.includes("exit")) {
        console.log("Bye!")
        process.exit()
      }
      else if(answer.includes("1") && answer.includes("2")) {
        console.log("You can only select one of the two options at a time.")
        continue
      }
      else if(answer.includes("1")) {
        console.log("Kindly wait for the STAMPED documents to be generate.")
      }
      else if(answer.includes("2")) {
        console.log("Kindly wait for the UNSTAMPED documents to be generate.")
      }
      else {
        console.log("Wrong selection, kindly type: \n'1' to generate a STAMPED documents \nOR \n'2' to generate an UNSTAMPED ")
        continue
      }

      const docType = answer.includes("1") ? "stamped" : "unstamped"
      const renderImages = answer.includes("1") ? true : false
      
      // Ensure out/ and subfolder folder are created
      createFolderIfNotExist(outputDir[docType])
      
      // Generate Documents
      generateDocFiles(
        date, 
        outputDir[docType], 
        renderImages ? imagePath : emptyImagePath ,
        renderImages,
        headerIndex, 
        data as string[][]
      )
    }

    successfullyGenerated = true
    rl.close()
  }
  })()

} catch(error) {
  console.log("Error generating report: ", error)
}

