import fs from "node:fs";

export class FileUtil {
    public static getFileAsStream(file: fs.PathLike): fs.ReadStream {
        return fs.createReadStream(file);
    }
}
