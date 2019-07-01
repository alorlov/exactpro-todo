//package io.vertx.book.http;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.http.HttpHeaders;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.FaviconHandler;
import io.vertx.ext.web.handler.StaticHandler;

public class HelloMicroservice extends AbstractVerticle {
	
    private static DBOperations dbo = new DBOperations();
 
    @Override
    public void start() {
    	Router router = Router.router(vertx);
    	
//    	router.route().handler(FaviconHandler.create());
    	
    	router.route("/static/*").handler(StaticHandler.create());
    	
    	router.get("/api/get/:id").handler(this::apiGet);
    	router.get("/api/get/").handler(this::apiGetAll);
    	router.get("/api/delete/:id").handler(this::apiDelete);
    	router.post().handler(BodyHandler.create());
    	router.post("/api/create").handler(this::apiCreate);
    	router.post("/api/update").handler(this::apiUpdate);
    	
    	vertx.createHttpServer()
    		.requestHandler(router::accept)
    		.listen(8888);
    }
    
    public void apiGet(RoutingContext rc) {
    	String id = rc.pathParam("id");

    	ArrayList<Map> tasks = dbo.getTask(Integer.parseInt(id));
    	JsonObject json = new JsonObject().put("tasks", tasks);
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
    
    public void apiGetAll(RoutingContext rc) {
    	ArrayList<Map> tasks = dbo.getAllTasks();
    	JsonObject json = new JsonObject().put("tasks", tasks);
    	
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
    
    public void apiCreate(RoutingContext rc) {
    	JsonObject json = new JsonObject();
    	try {
	    	JsonObject body = rc.getBodyAsJson();
	    	System.out.println(body.toString());
	    	String description = body.getString("description");
	    	int duein = body.getInteger("duein");
	    	
	    	int res = dbo.createTask(description, duein);
	    	
	    	json.put("id", res);
    	} catch (Exception e) {
    		json.put("error", "There is an error on the server, please see the server console.");
    		e.printStackTrace();
    	}
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
    
    public void apiUpdate(RoutingContext rc) {
    	JsonObject json = new JsonObject();
    	try {
    		JsonObject body = rc.getBodyAsJson();
    		System.out.println(body.toString());
    		int id = body.getInteger("id");
    		String description = body.getString("description");
    		int duein = body.getInteger("duein");
    		
    		int res = dbo.updateTask(id, description, duein);
    		
    		if (res == 0) {
    			throw new Error ("Not updated");
    		}
    		json.put("result", res);
    	} catch (Exception e) {
    		json.put("error", "There is an error on the server, please see the server console.");
    		e.printStackTrace();
    	}
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
    
    public void apiDelete(RoutingContext rc) {
    	String id = rc.pathParam("id");

    	int res = dbo.deleteTask(Integer.parseInt(id));
    	
    	JsonObject json = new JsonObject().put("result", res);
    	rc.response()
    		.putHeader(HttpHeaders.CONTENT_TYPE, "application/json")
    		.end(json.encode());
    }
    

}
