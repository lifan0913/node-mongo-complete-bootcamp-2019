const http = require("http");
const url = require("url");
const fs = require("fs");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// Templates
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const dataObject = JSON.parse(data);

const slugs = dataObject.map(element =>
  slugify(element.productName, { lower: true })
);

console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/overview" || pathname === "/") {
    //Overview Page
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObject
      .map(card => replaceTemplate(templateCard, card))
      .join("");

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    // Product Page
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObject[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    // API
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html"
    });
    res.end("<h1>Page not Found!!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
