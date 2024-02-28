import csvParser from "csv-parser";

export class CSVUtil {
    public static csvParser(options?: csvParser.Options | string[]) {
        return csvParser(options);
    }
}
