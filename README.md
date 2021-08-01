# Setup Instructions
Things you may want to cover:
 
 * Node Version
   v14.16.1
 
 * System dependencies
   MongoDB
 
 * Configuration
   Make sure to point MONGO_CONNECTION_STRING environment to valid MongoDB connection
   ```
    npm install
   ```
   
# How to run the test suite
  ```
  npm test
  ```
  
# Loading Seed
  ```
  node -r esm seed/userWithHobbies.seed.js
  ```

# Run Dev App
  ```
  npm run devStart
  ```
  
# Run Production App
  ```
  npm start
  ```
  
# Routes
   Swagger ui available here
  ```
  /api-docs
  ```
 
# A Look at package json
  * chai, chai-http, and mocha for Testing
  * swagger-jsdoc and swagger-ui-express for documentation
  * express-validator for request validation
  * esm and faker for seed data
  * body-parser and connect-multiparty for body parsing
  * express as light weight server
  * nodemon for quickload in dev environment
  * mongoose and mongoose-paginate to interact with MongoDb
