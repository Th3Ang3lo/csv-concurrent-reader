import csvParser from "csv-parser";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Callback<T = any> = (data?: T) => Promise<void>;
export type Options = csvParser.Options | string[];
