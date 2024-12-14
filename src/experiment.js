import path from 'path'
import fs from 'fs'

import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser"

let xmlData = fs.readFileSync(path.resolve("../testing/pages/index.uhtml"), "utf-8")

const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix : "@_"
});
let jObj = parser.parse(xmlData);

let imports = []
for(let key of Object.keys(jObj)){
    if(key!="import")continue;
    let importItem = {
        from: path.resolve(jObj[key]["@_from"]),
        as: jObj[key]["@_as"],
    }
    delete jObj[key]

    imports.push(importItem)
}
console.log(imports)

const builder = new XMLBuilder({
    ignoreAttributes: false
});
const xmlContent = builder.build(jObj);

console.log(xmlContent)