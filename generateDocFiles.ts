import * as fs from "fs"
import * as path from "path"
import { IheaderIndex, IsetDate } from "./utils/interface"
import { getTemplatePaths } from "./getTemplatePaths"

const createReport = require("docx-templates")

export const generateDocFiles = async (date: IsetDate, outputPaths: {[key:string]: string}, headerIndex: IheaderIndex, data: string[][]) => {
  
  // Create the reports from data
  for(const [index, row] of data.entries() ) {

    // End report generation on the first empty cell
    if (row[headerIndex["full name"]] === "" || 
      row[headerIndex["full name"]] === null ||
      row[headerIndex["full name"]] === undefined) break
    
    console.log(index, " ", row[headerIndex["full name"]]) // 1 Tope Adewale

    const propertyType = row[headerIndex["property type"]]

    for(const templatePath of getTemplatePaths(propertyType)) {

      // Load the DOCX file
      const template = fs.readFileSync(templatePath)

      // Match data to placeholder
      const rowData = {
        fullName: row[headerIndex["full name"]],
        houseNumber: row[headerIndex["house number"]],
        customerAddress: row[headerIndex["customer address"]],
        serialNo: row[headerIndex["serial no"]],
        getSalutation() {
          if(this.fullName !== "") {
            const title = this.fullName.split(" ")
            return title[0].toLowerCase() === "mr." ? "sir" : "ma"
          }
        }
      }

      
      const buffer = await createReport({
        template: template,
        data: {
          ...date,
          ...rowData,
          salutation: rowData.getSalutation()
        },
        cmdDelimiter: ["{", "}"]
      })
      
      // Write file to output path 
      let outputPath = index === 0 ? outputPaths.unStamped : outputPaths.stamped
      outputPath = path.join(outputPath, `${rowData.fullName}.docx`)
      fs.writeFileSync(outputPath, buffer)

      console.log(`${rowData.fullName} Report generated successfully.`)
    }
  }
}