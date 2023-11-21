import fs from "fs"
import path from "path"

const getData = () => {
    const data = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "src/data/exam.json"), "utf-8")
    )
    return data
}

export default getData
