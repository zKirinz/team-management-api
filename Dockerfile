FROM node
WORKDIR /app
COPY package*.json ./
RUN yarn

COPY . .
RUN yarn

EXPOSE 3000
CMD ["yarn", "start"]