#!/bin/sh

printf "Start script... \n"

printf "Populating railway database \n"

docker exec -w /app backend-acuaterra npx sequelize-cli db:migrate --env test
docker exec -w /app backend-acuaterra npx sequelize-cli db:seed:all --env test

printf "End script \n"


