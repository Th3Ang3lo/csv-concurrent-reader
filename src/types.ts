import csvParser from "csv-parser";

export type Callback<T = any> = (data?: T) => Promise<void>;
export type Options = csvParser.Options | string[];
