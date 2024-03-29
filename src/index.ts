import { ReadStream } from "fs";
import { Callback, Options } from "./types";

import { CSVUtil } from "./utils/csv-util";
import { FileUtil } from "./utils/file-util";
import { QueueUtil } from "./utils/queue-util";

export async function csvConcurrentReader(
    csvPath: string | ReadStream,
    callback: Callback,
    concurrency: number,
    maxQueueLength: number = 10000,
    options?: Options,
): Promise<void> {
    if (!csvPath) {
        throw new Error(`Missing "csvPath" parameter.`);
    }

    await new Promise((resolve, reject) => {
        const csvParser = CSVUtil.csvParser(options!);
        const fileStream =
            typeof csvPath === "string"
                ? FileUtil.getFileAsStream(csvPath)
                : csvPath;

        const queue = QueueUtil.queue(callback, concurrency);

        const interval = setInterval(() => {
            if (queue.length() <= maxQueueLength) {
                fileStream.resume();
            }
        }, 10);

        fileStream.pipe(csvParser).on("data", async (data) => {
            if (queue.length() >= maxQueueLength) {
                fileStream.pause();
            }

            queue.push(data);
        });

        fileStream.on("error", (error) => {
            clearInterval(interval);
            reject(error);
        });

        queue.drain = () => {
            clearInterval(interval);
            resolve(null);
        };
    });
}
