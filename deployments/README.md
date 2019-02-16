# PaperWork PH Usage
## Overall Architecture
The PaperWork PH System is built with Microservices Architecture; the application is comprised of multiple services that performs a certain task. The entire application consists of the following:

1. **frontend** - PaperWork PH Client
2. **api** - Authorization and middleman client which allows `frontend` to call other services
3. **db-cli** - Service for retrieving data from the database.

## Usage
### Local
1. Install `docker` and `docker-compose` on your machine. If you're using Windows (non-Pro Editions), you have to install docker-toolbox (https://docs.docker.com/toolbox/overview/).
2. Create a folder `<my_folder>` to contain this repository and all our microservices.
3. Clone `deployments` into `<my_folder>`.
4. Create a folder called `microservices` inside `<my_folder>` as well.
5. Clone all microservices inside the Software Engineering Group into the `microservices` folder.
6. Your folder structure should look something like this:
```
my_folder
|
|-- deployments
|   |-- docker-compose
|   `-- ...
|
`-- microservices
    |-- api
    |-- frontend
    |-- db-cli
    |-- admin
    `-- emailer
```
7. CD into `<my_folder>/deployments/docker-compose` and run `docker-compose up --build`
8. This will run the services in **DEBUG MODE**.

Note: To change the folder structure, edit `<my_folder>/deployments/docker-compose/docker-compose.yml`
