import { writeFile, appendFile, readFile, unlink } from "fs/promises";
import { existsSync, Utf8Stream } from "fs";
import * as path from "path";
import { getDefaultHighWaterMark } from "stream";

// const filePath = path.join(__dirname, "example.txt");

// async function run() {
//   await writeFile(filePath, "Hello, Node.js\n");
//   await appendFile(filePath, "This line was appended.\n");

//   if (existsSync(filePath)) {
//     const content = await readFile(filePath, "utf8");
//     console.log(content);
//   }

//   await unlink(filePath);
//   console.log("File deleted");
// }

// run().catch(console.error);

//  3 Buffers & Encodings
const buf = Buffer.from("Hello Rahul", "utf8");
console.log(buf);

const Buff = Buffer.from(" Thomas Shelby", "utf8");

const toStr = Buff.toString("utf8");
console.log(toStr);

const utf8Buffer = Buffer.from("Leclerc", "utf8");
console.log(utf8Buffer.toString("utf8"));

const baSe64 = Buffer.from("Bieber", "utf8").toString("base64");
console.log(baSe64);

const allocBuff = Buffer.alloc(10, 0xff);
console.log(allocBuff);

const word = "##ASUS";

console.log("STRING LEN is", word.length);
console.log("BUFFER LEN is", Buffer.from(word, "utf8").length);

//4 Readable Streams

const fs = require("fs");

const stream = fs.createReadStream("sample.txt", {
  encoding: "utf8",
  getDefaultHighWaterMark,
});
console.log(stream);

const chunk = 0;
let chunkCount = 0;

stream.on("data", (chunk: string) => {
  chunkCount++;
  console.log(`Chunk ${chunkCount}: ${chunk.length} bytes`);
});

// stream.on("end", () => {
//   console.log("done, you can cleanUp");
//   console.log("Total chunks:", chunkCount);
// });

stream.on("error", (err: any) => {
  console.log("Error, the file is missing", err.message);
});

// 5. Writable Streams
const logStream = fs.createWriteStream("app.log", {
  flags: "a",
});

for (let i = 1; i <= 5; i++) {
  logStream.write(`The line ${i}\n`);
}
// logStream.end();

logStream.on("finish", () => {
  console.log("Log stream is closed");
});
for (let i = 0; i < 100000; i++) {
  const backPress = logStream.write(`Line ${i}\n`);
  if (!backPress) {
    logStream.once("drain", () => {
      console.log("Resumed writing");
    });
    break;
  }
}

const binaryStream = fs.createWriteStream("binary.bin");

const buffer = Buffer.from([0xff, 0xaa]);

binaryStream.write(buffer);
// binaryStream.end();

//6

fs.createReadStream("input.txt").pipe(fs.createWriteStream("otpujt.txt"));

const { Transform } = require("stream");

const toUpper = new Transform({
  transform(chunk: string, encoding: Utf8Stream, callback: any) {
    callback(null, chunk.toString().toUpperCase());
  },
});

fs.createReadStream("input.txt")
  .pipe(toUpper)
  .pipe(fs.createWriteStream("upper.txt"));

console.time("stream-copy");
fs.createReadStream("bigfile.data")
  .pipe(fs.createWriteStream("bigfile_copy.data"))
  .on("finish", () => {
    console.timeEnd("stream-copy");
  });

//read-file
fs.readFile("bigfile.data", () => {
  console.log("Memory used:", process.memoryUsage().rss);
});
fs.createReadStream("bigfile.data").pipe(fs.createWriteStream("copy.dat"));

// 7 Emitter
const EventEmitter = require("events");

const emitter = new EventEmitter();
console.log(emitter);

emitter.on("greet", (name: string) => {
  console.log(`Hello ${name}`);
});

emitter.emit("greet", "Sarma");

emitter.on("event", () => console.log("Listener 1"));
emitter.on("event", () => console.log("Listener 2"));

emitter.emit("event");

const handler = () => console.log("Will be removed");

emitter.on("removeTest", handler);
emitter.off("removeTest", handler);

emitter.emit("removeTest");

// 8 Watcher

const watcher = fs.watch("watch.txt", (eventType: any, filename: any) => {
  console.log(eventType, filename);
  if (eventType === "change") {
    console.log("File is modified");
  }
  if (eventType === "rename") {
    console.log(" File is moved/ renamed / deleted");
  }
});

let timeout: any;

fs.watch("watch.txt", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log("Debounced change detected");
  }, 300);
});

setTimeout(() => {
  watcher.close();
  console.log("Stopped watching");
}, 5000);
