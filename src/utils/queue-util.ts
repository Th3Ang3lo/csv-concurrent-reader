import fastq from "fastq";

import { Callback } from "@/types";

export class QueueUtil {
    public static queue(callback: Callback, concurrency: number) {
        if (!callback) {
            throw new Error(`Missing "callback" parameter.`);
        }

        if (!concurrency) {
            throw new Error(`Missing "concurrency" parameter.`);
        }

        async function handleCallback(data: any) {
            await new Promise((resolve) => setTimeout(resolve, 5));

            await callback(data);
        }

        return fastq.promise(handleCallback, concurrency);
    }
}
