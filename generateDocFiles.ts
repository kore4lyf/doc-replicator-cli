import * as fs from "fs"
import * as path from "path"
import { IheaderIndex, IsetDate } from "./utils/interface"
import { getTemplatePath } from "./getTemplatePath"
import { createReport } from "docx-templates"

export const generateDocFiles = async (
  date: IsetDate, 
  outputPath: string, 
  imagePath: {[key: string]: string},
  renderImages: boolean,
  headerIndex: IheaderIndex, 
  data: string[][]) => {

    console.log(renderImages)
    console.log(imagePath)
  
  // Create the reports from data
  for(const [index, row] of data.entries() ) {

    // End report generation on the first empty cell
    if (row[headerIndex["full name"]] === "" || 
      row[headerIndex["full name"]] === null ||
      row[headerIndex["full name"]] === undefined) break
    
    console.log(index + 1, " ", row[headerIndex["full name"]]) // 1 Tope Adewale

    const propertyType = row[headerIndex["property type"]]


    
    const templatePath: string = getTemplatePath(propertyType, renderImages)

    console.log(templatePath)

    // Load the DOCX file
    const template = fs.readFileSync(templatePath)

    // Match data to placeholder
    const rowData = {
      renderImages: "",
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
        data:  renderImages ? fs.readFileSync(imagePath.dateImg, {encoding: "base64"}) : imagePath.dateImg,
        width: 2.7,
        height: 1.2,
        extension: ".png"
      },
      signature: {
        data: renderImages ? fs.readFileSync(imagePath.signature, {encoding: "base64"}) : imagePath.signature,
        width: 5.85,
        height: 1.43,
        extension: ".png"
      },
      smSignature: {
        data: renderImages ? fs.readFileSync(imagePath.signature, {encoding: "base64"}) : imagePath.signature,
        width: 4.5,
        height: 1.1,
        extension: ".png"
      },
      stamp: {
        data: renderImages ? fs.readFileSync(imagePath.stamp, {encoding: "base64"}) : imagePath.stamp,
        width: 5,
        height: 2.108,
        extension: ".png"
      },
      esvStamp: {
        data: renderImages ? fs.readFileSync(imagePath.esvStamp, {encoding: "base64"}) : imagePath.esvStamp,
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