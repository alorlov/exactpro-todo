package server
import org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import DBOperations
import getConfig
import DBConnection

class DBOperationsTest {
	val config = getConfig("config.json")
	val dbo: DBOperations = DBOperations(table = "tasks_test", url = config.dbUrl, user = config.user, password = config.password)
	val db: DBConnection = DBConnection(url = config.dbUrl, user = config.user, password = config.password);
	
	@BeforeEach
	fun createTable() {
		db.getConnection().use {
			con ->
			con.createStatement().executeUpdate("CREATE TABLE IF NOT EXISTS tasks_test LIKE tasks");
		}
	}
	
	@AfterEach
	fun removeTable() {
		db.getConnection().use {
			con ->
			con.createStatement().executeUpdate("DROP TABLE IF EXISTS tasks_test");
		}
	}
	
	@Test
	fun getAllTasks() {
		dbo.createTask("a", 11);
		dbo.createTask("b", 22);
		val tasks: ArrayList<HashMap<String, Any>> = dbo.getAllTasks();
		println(tasks)
//		assertEquals(2, tasks.size());
		assertEquals("1", tasks.get(0).get("id"));
		assertEquals("2", tasks.get(1).get("id"));
	}
//	
//	@Test
//	void newTask() throws SQLException {
//		dbo.createTask("a", 1);
//		int res = dbo.createTask("a", 1);
//		assertEquals(2, res);
//	}
//	
//	@Test
//	void getTask() throws SQLException {
//		String description = "a";
//		int duein = 1;
//		
//		int res = dbo.createTask(description, duein);
//		ArrayList<Map> tasks = dbo.getTask(1);
//		Map last = tasks.get(tasks.size() - 1);
//		
//		assertEquals(description, last.get("description"));
//		assertEquals(duein, Integer.parseInt(last.get("duein").toString()));
//	}
//	
//	@Test
//	void deleteTask() throws SQLException {
//		dbo.createTask("a", 1);
//		int res = dbo.deleteTask(1);
//		assertEquals(res, 1);
//	}
//
//	@Test
//	void updateTask() throws SQLException {
//		dbo.createTask("a", 1);
//		dbo.updateTask(1, "b", 2);
//		Map task = dbo.getTask(1).get(0);
//		
//		assertEquals("b", task.get("description"));
//		assertEquals("2", task.get("duein"));
//	}
}
