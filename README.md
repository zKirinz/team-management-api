# ✨ Task Management API
## What is Team Management API?
This is API for team management with only 2 entity `User` and `Team`.
## Technology
- Backend
  - Fastify - Server Core
  - Mongoose + MongoDB - Database
  - Jest + Supertest - E2E testing
- Tool
  - Swagger - Documentation
  - VSCode Remote Container - Development environment 

**Note**: I don't intend to create Frontend for this API. But maybe I will in the future. 
##  Document
[Here](https://team-management-backend.herokuapp.com/api/v1.0/documentation) is a static document page created with [Swagger](https://swagger.io/).

## Project setup
### 📦 For container environment
- Firstly, you need to install [Docker](https://www.docker.com/) and then start it.

- Finally, run command:
```
docker-compose up -d
```

### ⚙️ For local environment
- Firstly, you need to install [Mongodb](https://www.mongodb.com/try/download/community) and then start it as a background service.
- Secondly, replace `MONGODB_URL=mongodb://mongodb:27017` with `MONGODB_URL=mongodb://localhost:27017`
- Finally, run command:
```
yarn start:local
```
## Some additional commands 
- Format project
```
yarn format
```
- Run e2e tests
```
yarn test
```

# License & copyright

© Kirin Tran, FPT University TP.HCM
Licensed under the [MIT LICENSE](LICENSE).