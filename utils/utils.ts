import * as fs from "fs"
import { IsetDate } from "./interface"

export const createFoldersIfNotExist = (folderPaths: string[]) => {
  for (let path of folderPaths) {

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
      console.log(`Folder created at: ${path}`)
    } else {
      console.log(`Folder already exists at: ${path}`)
    }
  }
}

export const setDate = (day: number, month: string, year: number): IsetDate => {
  
  // Get ordinal suffix of day
  const getOrdinal = (day:number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = day % 100;

    return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
  }

  return {
    day: day,
    ordinalDay: getOrdinal(day),
    month: month,
    year: year
  }
}