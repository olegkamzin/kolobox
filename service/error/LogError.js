import fs from "fs"

const log = (error) => {
    fs.appendFileSync('log.txt', error)
}

export default log