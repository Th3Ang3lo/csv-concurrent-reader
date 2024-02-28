import fastq from "fastq";

import { Callback } from "@/types";

export class QueueUtil {
    public static queue(callback: Callback, concurrency: number) {
        return fastq.promise(callback, concurrency);
    }
}
