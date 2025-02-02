const dotenv = require("dotenv");
const path = require("path");

const { spawnWatcher } = require("./watcher/index.js");
const serverPath = require("./server/index.js");

let __rootname = process.cwd();
if (__rootname == __dirname) __rootname = path.dirname(__rootname);

dotenv.config({ path: path.resolve(__rootname, ".env.mock") });
dotenv.config({ path: path.resolve(__rootname, ".env.dev") });

spawnWatcher(serverPath, __dirname);
