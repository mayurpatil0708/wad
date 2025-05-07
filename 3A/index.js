const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (_, notFound) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(notFound);
        });
      } else {
        res.writeHead(500).end('Server Error');
      }
    } else {
      res.writeHead(200); // No Content-Type
      res.end(content);
    }
  });
}).listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
