# Crosspost Codebase


## Getting the project running locally
As there are many services that talk to each other, this is mainly orcostrated over a dcker network which first time runnig the code base will need to be manually configured. You can do this by running the following,

```
docker network create crosspost_docker_network
```

Because the overall architecture is continaer based when it comes to local development we can run the following docker command from the root of the project to get all apps and services live talking together.

```
docker-compose up
```

If you wish to stop all the service running in docked simply run 

```
docker-compose down
```


docker cp <CONTANER_ID>>:/ docker