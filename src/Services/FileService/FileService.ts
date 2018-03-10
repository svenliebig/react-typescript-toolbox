import * as fs from "fs"
import * as mkdirp from "mkdirp"
import * as Path from "path"
import File from "../../Models/File/File"

/**
 * Static Service to Write and Check Files in the Filesystem.
 */
export default class FileService {

    /**
     * Write an array of file or a single file to the filesystem. 
     * Array indexes that have the value `null` will be skipped.
     * 
     * @param file A single file or a file Array
     */
    public static write(...files: Array<File>) {
        files.forEach(file => {
            if (file) {
                if (fs.existsSync(file.path)) {
                    fs.writeFileSync(file.completePath, file.content)
                } else {
                    mkdirp(file.path, err => fs.writeFileSync(file.completePath, file.content))
                }
            }
        })
    }
}