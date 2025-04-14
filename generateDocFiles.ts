import * as fs from "fs"
import * as path from "path"
import { IheaderIndex, IsetDate } from "./utils/interface"
import { getTemplatePath } from "./getTemplatePath"
import { createReport } from "docx-templates"

export const generateDocFiles = async (
  date: IsetDate, 
  outputPath: string, 
  imagePath: {[key: string]: string},
  headerIndex: IheaderIndex, 
  data: string[][]) => {
  
  // Create the reports from data
  for(const [index, row] of data.entries() ) {

    // End report generation on the first empty cell
    if (row[headerIndex["full name"]] === "" || 
      row[headerIndex["full name"]] === null ||
      row[headerIndex["full name"]] === undefined) break
    
    console.log(index + 1, " ", row[headerIndex["full name"]]) // 1 Tope Adewale

    const propertyType = row[headerIndex["property type"]]


    
    const templatePath: string = getTemplatePath(propertyType)

    console.log(templatePath)

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
      },
      dateImg: {
        data: fs.readFileSync(imagePath.dateImg, {encoding: "base64"}),
        width: 2.7,
        height: 1.2,
        extension: ".png"
      },
      signature: {
        data: fs.readFileSync(imagePath.signature, {encoding: "base64"}),
        width: 5.85,
        height: 1.43,
        extension: ".png"
      },
      smSignature: {
        data: fs.readFileSync(imagePath.signature, {encoding: "base64"}),
        width: 4.5,
        height: 1.1,
        extension: ".png"
      },
      stamp: {
        data: fs.readFileSync(imagePath.stamp, {encoding: "base64"}),
        width: 5,
        height: 2.108,
        extension: ".png"
      },
      esvStamp: {
        data: fs.readFileSync(imagePath.esvStamp, {encoding: "base64"}),
        width: 5.5705,
        height: 11.5,
        extension: ".png"
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
    fs.writeFileSync( path.join(outputPath, `${rowData.fullName}.docx`), buffer)

    console.log(`${rowData.fullName} Report generated successfully.`)


  }
}