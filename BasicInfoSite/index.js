const http = require("http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
	const path = req.url;
	const filename = "." + (path == "/" ? "/index.html" : path + ".html");
	fs.readFile(filename, (err, data) => {
		if (err) {
			fs.readFile("./404.html", (error, errData) => {
				res.writeHead(404, { "Content-Type": "text/html" });
				res.end(errData);
			})
		}
		else {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end(data);
		}
	});
});

server.listen(8080, () => console.log("server running on port 8080"));