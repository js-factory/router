# router
An opinionated functional programming based routing module for [nodejs](https://nodejs.org/en/docs/)

## Philosophy

> [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) has severed us exceptionally well over the period and still does, but it appears to be too rigit to fill mordern day web applcication needs, specially JavaScript world.Every other day we get a new  framework either overcoming problems in existing frameworks or proposing an entirely new solution. Since web technology is evolving so fast, it's very important that we write code that is loosely coupled and can be plugged with any other [nodejs](https://nodejs.org/en/docs/) framework without much hussle. Over past 3-4 years we experienced that code maintainbility is a big challenge and MVC makes it more complex. We have found a better solution in functional programming based architecture. You can define as many as pure function and plugged these functions into the framework.


## Install
```npm i -S @js-factory/router```
    
## Overview

### Components

**Route**
Route is plain javascript object. It defines how a particular http request will be handled by the web application.

And here's sample **route**!

```javascript
// routes/foo.js
const requestSchema = require('../schema/request/foo');
const responseSchema = require('../schema/response/foo');
const gateway = require('../gateway/foo.js');
const { fn1, fn2 } = require('../dekorators');
const prehandler = require('../prehandler/foo');

module.exports = {
    domain: 'index',
    method: 'GET',
    url: '/',
    template: 'index',
    responseType: 'html',
    allowRedirect: false,
    isReqValidation: true,
    schema: {
        ...requestSchema,
        ...responseSchema
    },
    prehandlers: [
       prehandler
    ],
    gateway,
    dekorators: [  
    	fn1,
        fn2
    ]
};

// sample url - https://www.example.com/?cid=foo&pos=0
// request schema
// schema/request/foo.js
module.exports = {
    query: {
        type: 'object',
        properties: {
            cid: { type: 'string' },
            pos: { type: 'integer' },
        },
        required: ['cid']
    },
    cookies: {
        type: 'object',
        properties: {
            sid: { type: 'string' }
        },
        required: ['sid']
    },
    config: {
        type: 'object',
        properties: {
            showWelComeMessage: { type: 'boolean' }
        }
    }
}

// response schema
// schema/response/foo.js
module.exports = {
	response: {
        ok: { // A successful response
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    fkc: { type: 'integer' }
                }
            }
        },
        notOk: { // Unsuccessful response
        	badReq: { // Bad request 
            	success: false,
                error: {
                	statusCode: 1001,
                    message: ''
                },
                data: {}
            },
            badRes: { // Api failed or some other exception
            	success: false,
                error: {
                	statusCode: 400, // 4xx, 5xx
                    message: ''
                },
                data: {}
            }
        }
    }
};

```

#### Route Schema
- **domain -:** You may want to group your application into different pages or modules. You can define these logical grouping in the route. 

- **method -:** An  [HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) i.e. GET or POST 
- **url -:** External url to be handled by the application
- **responseType -:** Http Response format  <br/>
  ```javascript 
  ResponseType Options: html|json
  Default Value: json
	```
	****<small>Note -:**** If it is set to json, template will be ignored and json response will be sent to client </small>
- **allowRedirect -:** Allow http redirect 301|302. If the flag is set true framework attach redirect middleware which expect a redirect node in the decorators output.
  ```javascript
  {
      ... // other props
      redirect: {
          code: 302, // Default value 302, other option 301
          path: '/' // if path is not provided it will redirect to referrer
      }
  }

  ```
- **isReqValidation -:** It enables request validation. If validation fails it will respond with `schema.response.notOk.badReq` defined in response schema.
- **template -:** A template file path. The template will be used to prepare html response when `responseType` is set to `html`
- **schema -:** A request and response validator. Also it filters the data and send only those defined in the shcema. Please refer [AJV](http://epoberezkin.github.io/ajv/) documentations for further details. Refer above route definition for more details.

- **prehandlers -:** 
A `pre handler` is a plain JavaScript function. It has access to request parameters such as query params, path params, cookies, request body, headers etc. Developer can use these parameters and modify them for future use during request lifecycle.
A prehandler gets access to properties defined in the request schema.

- **gateway -:** A `gateway` is bridge between your application and external systems i.e. rest apis, databases etc. `gateway` attaches final response into response. Your application response module can access it calling `res.props('data');

```js
// express middleware
// sendToClinet.js

const sendToClinet = (req, res) => {
    const data = res.props('data');
    // application logic ...
    // application logic ...
    if(sendJson) {
        return res.json(data);
    }
    return res.render('templateName', data);
}

```

- **dekorators -:** A `dekorator` is a pure javascript function that can bind to certain properties of bigger response, it can modify the data. A dekorator must return an object. Having dekorator in place offers you to define functions with single responsibility.

```javascript
// Simple dekorator

// title.js

const title = (props) => {
    const { name, brand, done } = props; // dispatch is injected by connect.
    const newName = name.replace(brand.name, '');

    return done({
        name: newName   // name is propery in initial state
    });
  };

  module.exports = connect(['name', 'brand'], title);

```

>Pre handler, gateway, dekorator function must follow [functional programming](https://www.youtube.com/watch?v=e-5obm1G_FY) fundamentals. Please refer below resources for more details

[******Learning Functional Programming with JavaScript - JSUnconf 2016******](https://www.youtube.com/watch?v=e-5obm1G_FY)<br/>

[******Master Functional Programming******](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)

 

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
