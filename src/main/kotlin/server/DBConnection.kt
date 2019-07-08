import java.sql.Connection;
import java.sql.DriverManager;

class DBConnection (val url: String, val user: String, val password: String) {

    fun getConnection(): Connection {
		return DriverManager.getConnection(url, user, password);
    }
}
