const http = require("http");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(JSON.stringify({ success: true }));
  }

  if (pathName === "/getTimeStories") {
    http.get(
      "http://api.mediastack.com/v1/news?access_key=fe62c44f1673dc432ee71178663bc08f&limit=6&sources=time&sort=popularity",
      (response) => {
        const data = [];

        response.on("data", (chunk) => {
          data.push(chunk);
        });
        response.on("end", () => {
          const parsedData = JSON.parse(data);

          const transformedNews = parsedData.data.map((news) => {
            return {
              title: news.title,
              link: news.url,
            };
          });

          res.writeHead(200, {
            "Content-type": "application/json",
          });
          res.end(JSON.stringify(transformedNews));
        });
      }
    );
  }
});

server.listen(3000, (req, res) => {
  console.log(`server is running at http://localhost:3000`);
});
