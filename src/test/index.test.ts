import { describe, expect, it, vi } from "vitest";
import path from "path";

import csvConcurrentReader from "..";

const name = csvConcurrentReader.name;

describe(`Testing "${name}" function`, () => {
    it(`[${name}] Should process csv line by line 10 times`, async () => {
        const mock = {
            callback: vi.fn(),
        };

        mock.callback.mockImplementation(
            async () => new Promise((resolve) => setTimeout(resolve, 10)),
        );

        const callbackMock = vi.spyOn(mock, "callback");

        const filePath = path.resolve(__dirname, "files", "test.csv");

        await csvConcurrentReader(filePath, mock.callback, 100);

        expect(callbackMock).toBeCalledTimes(10);
    });
});
