import java.sql.Connection;
import java.sql.DriverManager;

class DBConnection (val dbSocket: String, val dbName: String, val user: String, val password: String) {

    fun getConnection(): Connection {
		val url = "jdbc:mysql://${dbSocket}/${dbName}?useSSL=false"
		return DriverManager.getConnection(url, user, password);
    }
}
