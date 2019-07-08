# Todo app
The application helps you to collecting all your tasks in one place.

## Installation guide
1. Download and unpack the last release from https://github.com/alorlov/exactpro-todo/releases
2. Configure file `config.json` with your DB and host settings:
```json
{
	"dbSocket": "localhost:3306",
	"dbName": "todo",
	"user": "root",
	"password": "root",
	"host": "localhost",
	"port": 8888
}
```
3. Run `java -jar todo-app-1.0.0-fat.jar`
4. Open `localhost:8888/static`

## Compilation guide

1. Clone and install client libs:
```
git clone https://github.com/alorlov/exactpro-todo.git todo
cd todo/client
yarn install
webpack
cd ..
```

2. Configure file `config.json` with your DB and host settings.

3. Package and run the server:
```
mvn package
java -jar target/todo-app-1.0.0-fat.jar
```
