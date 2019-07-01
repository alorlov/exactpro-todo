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
import java.util.List;
import java.util.Map;
import java.util.Properties;


import java.io.IOException; 
import java.nio.file.*; 

public class DBOperations {
	
	private String table = "tasks";
	private DBConnection db = new DBConnection();
	
	public DBOperations(String tableName) {
		table = tableName;
	}

	public DBOperations() {
		
	}
    
    public ArrayList<Map> getAllTasks() {
    	return getTask(0);
    }
    
    public ArrayList<Map> getTask(int id) {
    	String query = "Select * From " + table;
    	
    	if (id > 0) {
    		query += " Where id = " + id;
    	}
    	
    	ArrayList<Map> result = new ArrayList();
    	
    	try (Connection con = db.getConnection()) {
    		ResultSet rs = con.createStatement().executeQuery(query);

			while(rs.next()) {
				HashMap<String, String> row = new HashMap<String, String>();
				row.put("id", rs.getString("id"));
				row.put("description", rs.getString("description"));
				row.put("duein", rs.getString("duein"));
				result.add((Map) row.clone());
			}
		} catch (SQLException se) {
			se.printStackTrace();
		}
		return result;
    }
    
    public int createTask(String description, int duein) {
    	String query = "Insert " + table + " Set description = ?, duein = ?";
    	
    	try (Connection con = db.getConnection()){
    		PreparedStatement ps = con.prepareStatement(query);
    		ps.setString(1, description);
    		ps.setInt(2, duein);
    		
    		int result = ps.executeUpdate();
    		
    		if (result == 1) {
    			ResultSet rs = con.createStatement().executeQuery("Select MAX(id) From " + table);
    			rs.next();
    			
    			return rs.getInt(1);
    		} else {
    			return result;
    		}
    	} catch (SQLException se) {
    		se.printStackTrace();
    		return 0;
    	}
    }
    
    public int deleteTask(int id) {
    	String query = "Delete From " + table + " Where id = ?";
    	try (Connection con = db.getConnection()){
    		PreparedStatement ps = con.prepareStatement(query);
    		ps.setInt(1, id);
    		
    		return ps.executeUpdate();
    	} catch (SQLException se) {
    		se.printStackTrace();
    		return 0;
    	}
    }
    
    public int updateTask(int id, String description, int duein) {
    	String query = "Update " + table + " Set description = ?, duein = ? Where id = ?";
    	
    	try (Connection con = db.getConnection()){
    		PreparedStatement ps = con.prepareStatement(query);
    		ps.setString(1, description);
    		ps.setInt(2, duein);
    		ps.setInt(3, id);
    		
    		return ps.executeUpdate();
    	} catch (SQLException e) {
    		e.printStackTrace();
    	}
		return 0;
    }
    
    public static void main(String args[]) {
    	DBOperations dbo = new DBOperations();
    	int result = 0;

		result = dbo.createTask("from java", 1234567890);

    	System.out.println("main result: " + result);
    }
}
