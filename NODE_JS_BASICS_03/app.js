const http = require("http");
const routes = require("./route");

var server = http.createServer(routes.handler);

console.log(routes.text);
server.listen(7098);
