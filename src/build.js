import path from 'path'
import fs, { stat } from 'fs'

import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser"

export function BuildApp(appPath, buildPath){
    console.log("Beginning build")

    const pagePath = path.join(appPath, "pages")
    const staticPath = path.join(appPath, "static")

    console.log("Re-creating build directory")
    if(fs.existsSync(buildPath))fs.rmSync(buildPath, {recursive: true})
    fs.mkdirSync(buildPath)

    console.log("Copying static files")
    fs.cpSync(staticPath, buildPath, {recursive: true})

    console.log("Building pages")
    fs.readdirSync(pagePath, {recursive: true}).forEach(filePath=>{
        console.log("Building "+filePath)
        let resolvedPagePath = path.join(pagePath, filePath)
        let resolvedBuildPath = path.join(buildPath, filePath.replace(/(?=.*).uhtml$/, ".html"))

        let builtComponent = BuildComponent(fs.readFileSync(resolvedPagePath, "utf-8"))
        fs.writeFileSync(resolvedBuildPath, builtComponent, "utf-8")
    })
}

function BuildComponent(componentText){
    return " "
}