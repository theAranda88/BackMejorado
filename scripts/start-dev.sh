#!/bin/sh

printf "Start script... \n"

printf "Building and starting containers \n"

cd ..

docker compose build && docker compose up -d

printf "Starting process to install dependencies and configure the plugins for development \n"

printf "Moving to backend folder"

cd backend

printf "Copying .env file"

if [ ! -f .env ]; then
    printf "The .env file doesn't exist, copying .env file"
    cp .env.example .env
    echo "File .env copied correctly "
else
    echo "File .env already exists"
fi

cd ..

cd scripts

CONTAINER_NAME="database-acuaterra"
MAX_ATTEMPTS=60
DELAY_SECONDS=5

echo "Esperando a que MySQL esté listo en el contenedor $CONTAINER_NAME..."

attempts=0
while [ $attempts -lt $MAX_ATTEMPTS ]; do
    if docker logs $CONTAINER_NAME 2>&1 | grep -q "MySQL init process done. Ready for start up"; then
        echo "MySQL está listo para recibir conexiones!"
        break
    fi

    attempts=$((attempts + 1))
    echo "Intento $attempts/$MAX_ATTEMPTS - MySQL aún no está listo. Esperando $DELAY_SECONDS segundos..."
    sleep $DELAY_SECONDS
done

if [ $attempts -eq $MAX_ATTEMPTS ]; then
    echo "Tiempo de espera agotado. MySQL no parece estar listo después de $((MAX_ATTEMPTS * DELAY_SECONDS)) segundos."
    exit 1
fi

echo "Ejecutando tu script ahora que MySQL está listo..."

docker exec -w /app backend-acuaterra npx sequelize-cli db:migrate --env docker
docker exec -w /app backend-acuaterra npx sequelize-cli db:seed:all --env docker




