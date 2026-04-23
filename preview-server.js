const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname);
const host = "127.0.0.1";
const port = 3000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function resolveRequestPath(urlPath) {
  const relativePath = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const safePath = path.resolve(root, relativePath);

  if (safePath !== root && !safePath.startsWith(root + path.sep)) {
    return null;
  }

  return safePath;
}

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
  const filePath = resolveRequestPath(pathname);

  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
    });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Preview server running at http://${host}:${port}`);
});
