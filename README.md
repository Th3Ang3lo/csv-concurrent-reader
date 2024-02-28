## CSV Concurrent Reader

### Introduction
This project provides a concurrent CSV reader capable of processing CSV files line by line, concurrently executing actions for each data row.

### Installation

Using npm:
```zsh
$ npm install csv-concurrent-reader
```

Using yarn:
```zsh
$ yarn add csv-concurrent-reader
```

### Usage
```javascript
import csvConcurrentReader from 'csv-concurrent-reader'

const filePath = path.resolve(__dirname, "path", "to", "your", "file.csv")

async function main() {
    async function callback(data) {
      // for each data row  
    }

    await csvConcurrentReader(filePath, callback, 100)
}

main()

```

### Overview
Main function: `csvConcurrentReader(filePath, callback, concurrency, queueSize?, options?)` accepts several parameters:

| Parameter    | Type                       | Default   | Description                                                                                                               |
|--------------|----------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------|
| `filePath`   | `string` or `ReadStream`   |     -     | CSV file path or a Node.js ReadStream.                                                                                    |
| `callback`   | `function`                 |     -     | A callback function executed for each data row.                                                                           |
| `concurrency`| `number`                   |     -     | The number of functions to execute simultaneously.                                                                        |
| `queueSize`  | `number`                   |   10000   | The total size of the internal queue.                                                                                     |
| `options`    | `object`                   |     -     | CSV parsing options. Refer to the documentation of [csv-parser](https://github.com/mafintosh/csv-parser) for more details |

### Dependencies
- [fastq](https://github.com/mcollina/fastq): A lightweight, high-performance task queue.
- [csv-parser](https://github.com/mafintosh/csv-parser): A CSV parsing library.
