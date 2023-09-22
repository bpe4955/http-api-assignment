const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getPage,
  '/style.css': htmlHandler.getPage,
  '/success': dataHandler.success,
  '/badRequest': dataHandler.badRequest,
  '/unauthorized': dataHandler.unauthorized,
  '/forbidden': dataHandler.forbidden,
  '/internal': dataHandler.internal,
  '/notImplemented': dataHandler.notImplemented,
  '/notFound': dataHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct['/notFound'](request, response, params, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
