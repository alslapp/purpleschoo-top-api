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

### Собрать на проде только приложение

удалить контейнер

```bash
docker remove -f top-api
```

собрать новый

```bash
docker compose -f docker-compose-app.yml up -d
```

### Собрать приложение в docker
```bash
docker compose -f docker-compose-app.yml -f docker-compose-app-2.yml -f docker-compose-db.yml up -d
```

### Собрать только базу данных в docker
```bash
docker compose -f docker-compose-db.yml up -d
```

### Войти в консоль контейнера
```bash
docker logs -f top-api
```

### Очистить docker
#### удалить все, кроме volume:
```bash
docker stop $(docker ps -a -q) && docker system prune -a
```
#### удалить все volumes: 
```bash
docker volume rm $(docker volume ls -q)
```

#### на VirtualBox не работает mongo v5+, можно поставить образ v4
```bash
image: mongo:4.4.6
```

#### на VirtualBox не работает mongo v5+, можно поставить образ v4
```bash
image: mongo:4.4.6
```
### GHCR
```bash
# файл - https://docs.github.com/en/actions/publishing-packages/publishing-docker-images
# сначала локально на компе в консоли выполнить команду: (проверить в настройках гитхаба, чтобы токен не истек)
# echo "GITHUB_TOKEN" | docker login ghcr.io -u USERNAME_GITHUB --password-stdin
```