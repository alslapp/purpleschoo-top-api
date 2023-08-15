## Description

Тестовый проект Purpleschool: NestJS - с нуля, современный backend на TypeScript и Node JS

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# e2e tests
$ npm run test:e2e

# unit tests
$ npm run test
```

## Дабавленные пакеты

### Nestjs packages
```bash
$ npm i @nestjs/mongoose mongoose
$ npm i class-validator class-transformer
$ npm i @nestjs/mapped-types
```

### Passport JWT
```bash
$ npm i @nestjs/jwt @nestjs/passport passport passport-jwt
$ npm i -D @types/passport-jwt
```

### bcryptjs
https://www.npmjs.com/package/bcryptjs
```bash
$ npm i bcryptjs
$ npm i -D @types/bcryptjs 
```

### Собрать образ docker для mongo db
```bash
$ cd ./mongo/
$ docker compose up -d
```
### Собрать образ приложения в docker (файл Dockerfile в корне проекта)
```bash
$ docker build -t top-api .
$ docker compose up -d
```

### Собрать сеть docker
```bash
$ docker network create bridge-topapi
```

### Подключить 2 контейнера к network bridge-topapi
```bash
docker network connect bridge-topapi <CONTAINER_ID app>
docker network connect bridge-topapi <CONTAINER_ID db>
```

### Очистить docker
```bash
# удалить все, кроме volume: 
$ docker stop $(docker ps -a -q) && docker system prune -a

# удалить все volumes: 
$ docker volume rm $(docker volume ls -q)
```