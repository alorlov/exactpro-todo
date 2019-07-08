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
		assertEquals(2, tasks.size);
		assertEquals("1", tasks.get(0).get("id"));
		assertEquals("2", tasks.get(1).get("id"));
	}
	
	@Test
	fun newTask() {
		dbo.createTask("a", 1);
		var res = dbo.createTask("a", 1);
		assertEquals(2, res);
	}
	
	@Test
	fun getTask() {
		val description = "a";
		val duein: Long = 1;
		
		var res = dbo.createTask(description, duein);
		val tasks: ArrayList<HashMap<String, Any>> = dbo.getTask(1);
		var last: HashMap<String, Any> = tasks.get(tasks.size - 1);
		
		assertEquals(description, last.get("description"));
		assertEquals(duein, last.get("duein"));
	}
	
	@Test
	fun deleteTask() {
		dbo.createTask("a", 1);
		var res = dbo.deleteTask(1);
		assertEquals(res, 1);
	}

	@Test
	fun updateTask() {
		val oldValue: Long = 1
		val newValue: Long = 2
		dbo.createTask("a", oldValue);
		dbo.updateTask(1, "b", newValue);
		val task: HashMap<String, Any> = dbo.getTask(1).get(0);
		
		assertEquals("b", task.get("description"));
		assertEquals(newValue, task.get("duein"));
	}
}
