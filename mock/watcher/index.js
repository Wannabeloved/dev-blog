const { spawn } = require("cross-spawn");

const spawnWatcher = (filePath, watchPath) =>
	spawn("node", [filePath], { stdio: "inherit" });

module.exports = { spawnWatcher };
