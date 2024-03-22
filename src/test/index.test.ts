import { describe, expect, it, vi } from "vitest";
import path from "path";

import { csvConcurrentReader } from "..";

const name = csvConcurrentReader.name;

describe(`Testing "${name}" function`, () => {
    it(`[${name}] Should process csv line by line 10 times`, async () => {
        const mock = {
            callback: vi.fn(),
        };

        const callbackMock = vi.spyOn(mock, "callback");

        const filePath = path.resolve(__dirname, "files", "test.csv");

        await csvConcurrentReader(filePath, mock.callback, 1);

        expect(callbackMock).toBeCalledTimes(10);
    });

    it(`[${name}] Should process csv line by line 10000 times`, async () => {
        const mock = {
            callback: vi.fn(),
        };

        mock.callback.mockImplementation(
            async () => new Promise((resolve) => setTimeout(resolve, 10)),
        );

        const callbackMock = vi.spyOn(mock, "callback");

        const filePath = path.resolve(
            __dirname,
            "files",
            "sample-10000-csv.csv",
        );

        await csvConcurrentReader(filePath, mock.callback, 1000);

        expect(callbackMock).toBeCalledTimes(10000);
    });

    it(`[${name}] Should handle error with invalid parameters.`, async () => {
        const mock = {
            callback: vi.fn(),
        };

        const filePath = path.resolve(
            __dirname,
            "files",
            "sample-10000-csv.csv",
        );

        expect(() =>
            csvConcurrentReader(undefined!, mock.callback, 1000),
        ).rejects.toThrow(`Missing "csvPath" parameter.`);

        expect(() =>
            csvConcurrentReader(filePath, undefined!, 1000),
        ).rejects.toThrow(`Missing "callback" parameter.`);

        expect(() =>
            csvConcurrentReader(filePath, mock.callback, undefined!),
        ).rejects.toThrow(`Missing "concurrency" parameter.`);
    });
});
