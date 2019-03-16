## POSTGRES
docker run \
    --name postgres \
    -p 5432:5432 \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=senhaadmin \
    -e POSTGRES_DB=heroes \ 
    -d \
    postgres

## POSTGRES ADMINER
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer


## MONGODB
docker run \    
    --name mongodb \
    -p 27018:27018 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

## MONGO CLIENT
docker run \
        --name mongoclient \
        -p 3000:3000 \
        --link mongodb:mongodb \
        -d \
        mongoclient/mongoclient

## CREATE DATABASE AND USER
docker exec -it mongodb \
        mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
        --eval "db.getSiblingDB('heroes').createUser({user: 'alexandresoueu', pwd: 'minhasenha', roles:[{role: 'readWrite', db: 'heroes'}]})"