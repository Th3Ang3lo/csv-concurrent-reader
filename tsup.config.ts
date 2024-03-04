import { defineConfig } from "tsup";

export default defineConfig({
    name: "tsup",
    target: "node18",
    dts: true,
    entry: ["./src/index.ts"],
});
