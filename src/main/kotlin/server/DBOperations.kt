import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;

import java.nio.file.*; 

class DBOperations(val table: String = "tasks",
				   val url: String,
				   val user: String,
				   val password: String) {
	
	val db: DBConnection = DBConnection(url, user, password)
    
	fun checkConnection() {
		try {
			db.getConnection().use{}
		} catch (e: Exception) {
			throw Exception("Problems with DB connection: " + e.message)
		}
	}
	
    fun getAllTasks(): ArrayList<HashMap<String,Any>> {
    	return getTask(0);
    }
    
    fun getTask(id: Int): ArrayList<HashMap<String,Any>> {
    	var query = "Select * From " + table;
    	
    	if (id > 0) {
    		query += " Where id = " + id;
    	}
    	
    	val result = ArrayList<HashMap<String,Any>>();
    	
    	db.getConnection().use { con ->
    		val rs: ResultSet = con.createStatement().executeQuery(query);

			while(rs.next()) {
				val row = HashMap<String, Any>();
				row.put("id", rs.getString("id"));
				row.put("description", rs.getString("description"));
				row.put("duein", rs.getLong("duein"));
				result.add(row);
			}
		}
		return result;
    }
    
    fun createTask(description: String, duein: Long): Int {
    	val query = "Insert " + table + " Set description = ?, duein = ?";
    	
    	db.getConnection().use {
			con ->
    		val ps: PreparedStatement = con.prepareStatement(query);
    		ps.setString(1, description);
    		ps.setLong(2, duein);
    		
    		val result: Int = ps.executeUpdate();
    		
    		if (result == 1) {
    			val rs: ResultSet = con.createStatement().executeQuery("Select MAX(id) From " + table);
    			rs.next();
    			
    			return rs.getInt(1);
    		} else {
    			return result;
    		}
    	}
    }
    
    fun deleteTask(id: Int): Int {
    	val query = "Delete From " + table + " Where id = ?";
		db.getConnection().use {
			con ->
			val ps: PreparedStatement = con.prepareStatement(query);
			ps.setInt(1, id);
			
			return ps.executeUpdate()
		}
		
    }
    
    fun updateTask(id: Int, description: String, duein: Long): Int {
    	val query = "Update " + table + " Set description = ?, duein = ? Where id = ?";
    	
    	db.getConnection().use {
			con ->
    		val ps: PreparedStatement = con.prepareStatement(query);
    		ps.setString(1, description);
    		ps.setLong(2, duein);
    		ps.setInt(3, id);
    		
    		return ps.executeUpdate();
    	}
    }
}
