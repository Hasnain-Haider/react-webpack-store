## This is a React/Node.js ecommerce site under developement

This app uses several JavaScript libraries to build a working application. It is mostly a react with redux showcase. ES7 with async/await

### Installation
1. Obtain a config.json and put it in the root level
  * if you do not have a config, rename config_template.json to config.json
2. Run mongoDB on port 27017. Create a db named 'react-store' with no password
3. In api/ run `npm install` then return to the root level
4. In app/ run `npm install` 
5. `npm run dev-server`
6. `npm run dev-web`

#### Production run 
1. go to app/ and build the bundle.js with `npm run prod-build`
2. go to api/ and start the production server with `npm run prod-server`

### Frontend
* React.js
* SASS
* react-bootstrap for layout
* material-ui

### Backend
* Koa.js
* Autogenerates Mongoose schema based on JSON
* MongoDB
* REST API

