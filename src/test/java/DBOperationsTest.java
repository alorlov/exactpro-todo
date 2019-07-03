import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class DBOperationsTest {
	static DBConnection db = new DBConnection();
	static DBOperations dbo = new DBOperations("tasks_test");
	
	@BeforeEach
	void createTable() {
		try(Connection con = db.getConnection()) {
			con.createStatement().executeUpdate("CREATE TABLE IF NOT EXISTS tasks_test LIKE tasks");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	@AfterEach
	void removeTable() {
		try(Connection con = db.getConnection()) {
			con.createStatement().executeUpdate("DROP TABLE IF EXISTS tasks_test");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	@Test
	void getAllTasks() throws SQLException {
		dbo.createTask("a", 11);
		dbo.createTask("b", 22);
		ArrayList<Map> tasks = dbo.getAllTasks();
		assertEquals(2, tasks.size());
		assertEquals("1", tasks.get(0).get("id"));
		assertEquals("2", tasks.get(1).get("id"));
	}
	
	@Test
	void newTask() throws SQLException {
		dbo.createTask("a", 1);
		int res = dbo.createTask("a", 1);
		assertEquals(2, res);
	}
	
	@Test
	void getTask() throws SQLException {
		String description = "a";
		int duein = 1;
		
		int res = dbo.createTask(description, duein);
		ArrayList<Map> tasks = dbo.getTask(1);
		Map last = tasks.get(tasks.size() - 1);
		
		assertEquals(description, last.get("description"));
		assertEquals(duein, Integer.parseInt(last.get("duein").toString()));
	}
	
	@Test
	void deleteTask() throws SQLException {
		dbo.createTask("a", 1);
		int res = dbo.deleteTask(1);
		assertEquals(res, 1);
	}

	@Test
	void updateTask() throws SQLException {
		dbo.createTask("a", 1);
		dbo.updateTask(1, "b", 2);
		Map task = dbo.getTask(1).get(0);
		
		assertEquals("b", task.get("description"));
		assertEquals("2", task.get("duein"));
	}
}
