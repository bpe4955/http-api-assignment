const fs = require('fs');
const url = require('url');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const urlStruct = {
  '/': index,
  '/style.css': style,
};

const getPage = (request, response) => {
  const parsedURL = url.parse(request.url);
  let contentType = 'text/html';
  if (parsedURL.pathname.includes('.css')) { contentType = 'text/css'; }

  response.writeHead(200, { 'Content-Type': contentType });
  if (urlStruct[parsedURL.pathname]) {
    response.write(urlStruct[parsedURL.pathname]);
  } else {
    response.write(index);
  }
  response.end();
};

module.exports = { getPage };
