import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.Properties;

public class DBConnection {

	private Connection con = null;
	private Statement stmt = null;
	private ResultSet rs = null;
    
    public Connection getConnection() throws SQLException {
    	Properties props = new Properties();
    	
    	try(InputStream in = Files.newInputStream(Paths.get("database.properties"))) {
    		props.load(in);
    	} catch (IOException e) {
			e.printStackTrace();
		}
    	
    	String url = props.getProperty("url");
    	String user = props.getProperty("user");
    	String password = props.getProperty("password");
    	
    	con = DriverManager.getConnection(url, user, password);
    	return con;
    }
}
