package server

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

import io.vertx.core.http.HttpHeaders;
import io.vertx.core.json.JsonObject;
import io.vertx.reactivex.ext.web.Router
import io.vertx.reactivex.ext.web.handler.StaticHandler
import io.vertx.reactivex.core.AbstractVerticle
import io.vertx.reactivex.ext.web.handler.BodyHandler
import io.vertx.reactivex.ext.web.RoutingContext
import io.vertx.reactivex.core.Future

import DBOperations
import getConfig
import ConfigSchema
import Print

class MainVerticle : AbstractVerticle() {
	
	var config: ConfigSchema
	var dbo: DBOperations
	val clientErrorText = "The server encountered a problem. Please see the server console for details. \n\n"
	
	init {
		config = try { getConfig("config.json") } catch (e: Exception) { Print().error(e.toString()); ConfigSchema() }
		dbo = DBOperations(url = config.dbUrl, user = config.user, password = config.password)
		
		try { dbo.checkConnection() } catch (e: Exception) { Print().error(e.toString()) } 
	}
	
	
	override fun start() {
    	val router: Router = Router.router(vertx);
		
    	router.route("/static/*").handler(StaticHandler.create());
    	
    	router.get("/api/get/:id").handler(this::apiGet);
    	router.get("/api/get/").handler(this::apiGetAll);
    	router.get("/api/delete/:id").handler(this::apiDelete);
    	router.post().handler(BodyHandler.create());
    	router.post("/api/create").handler(this::apiCreate);
    	router.post("/api/update").handler(this::apiUpdate);
    	
    	vertx.createHttpServer()
    		.requestHandler(router::accept)
    		.listen(config.port){ http ->
				println("http ->")
		        if (http.succeeded()) {
		          Print().success("HTTP server started on ${config.host}:${config.port}")
		        } else {
		          Print().error("Error on server starting: " + http.cause())
		        }
		}
    }
	
	fun apiGet(rc: RoutingContext) {
    	val id: String = rc.pathParam("id");
    	val json: JsonObject = JsonObject();
    	
    	try {    		
    		val tasks: ArrayList<HashMap<String,Any>> = dbo.getTask(Integer.parseInt(id));
    		json.put("tasks", tasks);
    	} catch (e: Exception) {
    		json.put("error", clientErrorText + e.toString());
    		e.printStackTrace();
    	}
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
	
    fun apiGetAll(rc: RoutingContext) {
    	val json: JsonObject = JsonObject();
    	try {
	    	val tasks: ArrayList<HashMap<String,Any>> = dbo.getAllTasks()
	    	json.put("tasks", tasks);
    	} catch (e: Exception) {
    		json.put("error", clientErrorText + e.toString());
    		e.printStackTrace();
    	}
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
	
	fun apiDelete(rc: RoutingContext) {
    	val id: String = rc.pathParam("id");
    	val json: JsonObject = JsonObject();
    			
    	try {    		
    		val res: Int = dbo.deleteTask(Integer.parseInt(id));
    		json.put("result", res);
    	} catch (e: Exception) {
    		json.put("error", clientErrorText + e.toString());
    		e.printStackTrace();
    	}
    	
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
	
	fun apiUpdate(rc: RoutingContext) {
    	val json: JsonObject = JsonObject();
    	try {
    		val body: JsonObject = rc.getBodyAsJson();
    		val id: Int = body.getInteger("id");
    		val duein: Long = body.getLong("duein");
    		val description: String = body.getString("description");
    		
    		val res: Int = dbo.updateTask(id, description, duein);
    		
    		if (res == 0) {
    			throw Error ("Not updated");
    		}
    		json.put("result", res);
    	} catch (e: Exception) {
    		json.put("error", clientErrorText );
    		e.printStackTrace();
    	}
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
	
	fun apiCreate(rc: RoutingContext) {
    	val json: JsonObject = JsonObject();
    	try {
	    	val body: JsonObject = rc.getBodyAsJson();
	    	val duein: Long = body.getLong("duein");
	    	val description: String = body.getString("description");
	    	
	    	val res: Int = dbo.createTask(description, duein);
	    	
	    	json.put("id", res);
    	} catch (e: Exception) {
    		json.put("error", clientErrorText + e.toString());
    		e.printStackTrace();
    	}
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
}
