const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

process.chdir(__dirname); // fix json-server path problem
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3005;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
	console.log(`JSON Server is running on port ${port}`);
});
