FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

RUN ["npm", "i"]

COPY . /app-backend/

EXPOSE 3001

ENTRYPOINT ["npm", "run", "dev"]

CMD ["start"]
