// function to send a json object
const respond = (request, response, status, object, type = '*/*') => {
  response.writeHead(status, { 'Content-Type': type });

  if (object) { response.write(object); }

  // Send the response to the client
  response.end();
};

// function to show a success status code
const success = (request, response, params, acceptedTypes) => {
  // Check url for 'contenttype' param
  let preferredType = acceptedTypes[0];
  if (params.contenttype) { preferredType = params.contenttype; }

  if (preferredType === 'text/html' || preferredType === 'application/json') {
    // message to send
    const responseObj = {
      message: 'This is a successful response',
    };
    // send our json with a success status code
    return respond(request, response, 200, JSON.stringify(responseObj), 'application/json');
  }
  if (preferredType === 'text/xml') {
    const responseObj = '<response> <message>This is a successful response</message> </response>';
    return respond(request, response, 200, responseObj, 'text/xml');
  }

  // Not requesting JSON or XML
  return respond(request, response, 400, 'Server can only handle JSON or XML requests at this URI.', 'text/plain');
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params, acceptedTypes) => {
  // Check url for 'contenttype' param
  let preferredType = acceptedTypes[0];
  if (params.contenttype) { preferredType = params.contenttype; }
  let responseObj;

  if (preferredType === 'text/html' || preferredType === 'application/json') {
    // message to send
    responseObj = {
      message: 'This request has the required parameters',
    };
    // if the request does not contain a valid=true query parameter
    if (!params.valid || params.valid !== 'true') {
      // set our error message
      responseObj.message = 'Missing valid query parameter set to true';
      // give the error a consistent id
      responseObj.id = 'badRequest';
      // return our json with a 400 bad request code
      return respond(request, response, 400, JSON.stringify(responseObj), 'application/json');
    }
    responseObj = JSON.stringify(responseObj);
  } else if (preferredType === 'text/xml') {
    responseObj = '<response> <message>This request has the required parameters</message> </response>';
    // if the request does not contain a valid=true query parameter
    if (!params.valid || params.valid !== 'true') {
      responseObj = '<response> <message>Missing valid query parameter set to true</message> <id>badRequest</id> </response>';
      // return our json with a 400 bad request code
      return respond(request, response, 400, responseObj, 'text/xml');
    }
  }

  // if the parameter is here, send json with a success status code
  if (responseObj) { return respond(request, response, 200, responseObj, preferredType); }

  // Not requesting JSON or XML
  return respond(request, response, 400, 'Server can only handle JSON or XML requests at this URI.', 'text/plain');
};

const unauthorized = (request, response, params, acceptedTypes) => {
  // Check url for 'contenttype' param
  let preferredType = acceptedTypes[0];
  if (params.contenttype) { preferredType = params.contenttype; }
  let responseObj;

  if (preferredType === 'text/html' || preferredType === 'application/json') {
    // message to send
    responseObj = {
      message: 'User is logged in and can view content',
    };
    // if the request does not contain a valid=true query parameter
    if (!params.loggedIn || params.loggedIn !== 'true') {
      // set our error message
      responseObj.message = 'Missing loggedIn query parameter set to true';
      // give the error a consistent id
      responseObj.id = 'unauthorized';
      // return our json with a 401 unauthorized code
      return respond(request, response, 401, JSON.stringify(responseObj), 'application/json');
    }
    responseObj = JSON.stringify(responseObj);
  } else if (preferredType === 'text/xml') {
    responseObj = '<response> <message>User is logged in and can view content</message> </response>';
    // if the request does not contain a valid=true query parameter
    if (!params.loggedIn || params.loggedIn !== 'true') {
      responseObj = '<response> <message>Missing loggedIn query parameter set to true</message> <id>unauthorized</id> </response>';
      // return our json with a 401 unauthorized code
      return respond(request, response, 401, responseObj, 'text/xml');
    }
  }
  // return our json with a 200 success code
  if (responseObj) { return respond(request, response, 200, responseObj, preferredType); }

  // Not requesting JSON or XML
  return respond(request, response, 400, 'Server can only handle JSON or XML requests at this URI.', 'text/plain');
};

const forbidden = (request, response, params, acceptedTypes) => {
  // Check url for 'contenttype' param
  let preferredType = acceptedTypes[0];
  if (params.contenttype) { preferredType = params.contenttype; }
  let responseObj;

  if (preferredType === 'text/html' || preferredType === 'application/json') {
    // message to send
    responseObj = {
      message: 'You cannot view this page.',
      id: 'forbidden',
    };
    responseObj = JSON.stringify(responseObj);
  } else if (preferredType === 'text/xml') {
    responseObj = '<response> <message>You cannot view this page.</message> <id>forbidden</id> </response>';
  }
  // return our data with a 403 forbidden error code
  if (responseObj) { return respond(request, response, 403, responseObj, preferredType); }

  // Not requesting JSON or XML
  return respond(request, response, 400, 'Server can only handle JSON or XML requests at this URI.', 'text/plain');
};

const internal = (request, response, params, acceptedTypes) => {
  // Check url for 'contenttype' param
  let preferredType = acceptedTypes[0];
  if (params.contenttype) { preferredType = params.contenttype; }
  let responseObj;

  if (preferredType === 'text/html' || preferredType === 'application/json') {
    // message to send
    responseObj = {
      message: 'The server has encountered an error.',
      id: 'internal',
    };
    responseObj = JSON.stringify(responseObj);
  } else if (preferredType === 'text/xml') {
    responseObj = '<response> <message>The server has encountered an error.</message> <id>internal</id> </response>';
  }
  // return our data with a 500 internal server error code
  if (responseObj) { return respond(request, response, 500, responseObj, preferredType); }

  // Not requesting JSON or XML
  return respond(request, response, 400, 'Server can only handle JSON or XML requests at this URI.', 'text/plain');
};

const notImplemented = (request, response, params, acceptedTypes) => {
  // Check url for 'contenttype' param
  let preferredType = acceptedTypes[0];
  if (params.contenttype) { preferredType = params.contenttype; }
  let responseObj;

  if (preferredType === 'text/html' || preferredType === 'application/json') {
    // message to send
    responseObj = {
      message: 'The page you are looking for is not yet ready.',
      id: 'notImplemented',
    };
    responseObj = JSON.stringify(responseObj);
  } else if (preferredType === 'text/xml') {
    responseObj = '<response> <message>The page you are looking for is not yet ready.</message> <id>notImplemented</id> </response>';
  }
  // return our data with a 501 not implemented error code
  if (responseObj) { return respond(request, response, 501, responseObj, preferredType); }

  // Not requesting JSON or XML
  return respond(request, response, 400, 'Server can only handle JSON or XML requests at this URI.', 'text/plain');
};

// function to show not found error
const notFound = (request, response, params, acceptedTypes) => {
  // Check url for 'contenttype' param
  let preferredType;
  if (acceptedTypes) { const temp = acceptedTypes[0]; preferredType = temp; }
  if (params.contenttype) { preferredType = params.contenttype; }
  let responseObj;
  if (!acceptedTypes) {
    return respond(request, response, 404);
  }

  if (preferredType === 'text/html' || preferredType === 'application/json') {
    // message to send
    responseObj = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
    responseObj = JSON.stringify(responseObj);
  } else if (preferredType === 'text/xml') {
    responseObj = '<response> <message>The page you are looking for was not found.</message> <id>notFound</id> </response>';
  }
  // return our data with a 404 not found error code
  if (responseObj) { return respond(request, response, 404, responseObj, preferredType); }

  // Not requesting JSON or XML
  return respond(request, response, 400, 'Server can only handle JSON or XML requests at this URI.', 'text/plain');
};

// exports to set functions to public.
// In this syntax, you can do getIndex:getIndex, but if they
// are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
