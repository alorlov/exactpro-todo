# Todo app
There are server and client parts in the repository.

## Compilation guide

1. Clone and install client libs:
```
git clone https://gitlab.exactpro.com/a/todo.git todo
cd todo/client
yarn install
webpack
cd ..
```

2. Configure file `config.json` with your DB and host settings:
```json
{
	"dbSocket": "localhost:3306",
	"dbName": "todo",
	"user": "root",
	"password": "root",
	"host": "localhost",
	"port": 8892
}
```

3. Package and run the server:
```
mvn package
java -jar target/todo-app-1.0.0-fat.jar
```
