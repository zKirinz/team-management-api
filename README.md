# Task Management API
## ✨ Introdution
This is a simple API that I created to have fun with [Fastify](https://www.fastify.io/).

## ✨ Project setup
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
## ✨Some additional commands 
- Format project
```
yarn format
```
- Run e2e tests
```
yarn test
```