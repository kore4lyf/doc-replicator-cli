
const fs = require("fs")
const path = require("path")
const createReport = require("docx-templates").createReport
const setDate = require("./date").setDate
const cmbData = require("./cmbReplacementData")
const getTemplatePaths = require("./cmbTemplatePaths").getTemplatePaths

// Template details
const currentPath = __dirname


const create = async () => {
  try {
    
    // Manual config
    const date = setDate(14, "March", 2025)
    const xlsFilename = "March 2025 - Valuation 90.xlsx" 
    
    const createFolderIfNotExistsSync = (folderPath) => {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true })
        console.log(`Folder created at: ${folderPath}`)
      } else {
        console.log(`Folder already exists at: ${folderPath}`)
      }
    }

    const outputPaths = {
      notStamped: path.join(currentPath, "out"),
      stamped: path.join(currentPath, "out", "stamped"),
    }
    
    // Ensure out folders are created
    createFolderIfNotExistsSync(outputPaths["notStamped"])
    createFolderIfNotExistsSync(outputPaths["stamped"])
    
      
    // Excel file path
    const xlsFilePath = path.join(currentPath, "xls", xlsFilename)
    
    // Get data
    const getXlsDetails = cmbData.getXlsDetails(xlsFilePath)
    const { data , headerIndex } = getXlsDetails
    


    
    
    // Create the reports from data
    for([index, row] of data.entries() ) {
      console.log(row[0], " ", row[1])
      // End report creation on the first empty cell
      if (row[headerIndex["full name"]] === "" || 
        row[headerIndex["full name"]] === null ||
        row[headerIndex["full name"]] === undefined) break
        

        const propertyType = row[headerIndex["property type"]]
        
        for(const [index, templatePath] of getTemplatePaths(propertyType).entries()) {

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
          
          // Write the output file
          let outputPath = index === 0 ? outputPaths.notStamped : outputPaths.stamped
          outputPath = path.join(outputPath, `${rowData.fullName}.docx`)
          fs.writeFileSync(outputPath, buffer)

          console.log(`${rowData.fullName} Report generated successfully.`)
        }
      }
    } catch (error) {
      console.error("Error generating report:", error)
    }
}

create()

