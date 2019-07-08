import java.io.FileReader
import java.io.File
import com.google.gson.Gson

class ConfigSchema (val host: String = "",
			  val port: Int = 0,
			  val dbUrl: String = "",
			  val user: String = "",
			  val password: String = "")

fun getConfig(filename: String): ConfigSchema {
	val gson = Gson()
	
	try {		
		val jsonString = File(filename).bufferedReader().use {
			it.readText()
		}
		return gson.fromJson(jsonString, ConfigSchema::class.java)
	} catch (e: Exception) {
		throw Exception("Error on reading config file '$filename': " + e.message)
	}
}

fun main(args: Array<String>) {
	var dbo: DBOperations = DBOperations(url = "", user = "", password = "")
	println(dbo)
	val a = try { 5/0 } catch(e: Exception) { println("except") }
	println("after exceptin")
	getConfig("config.json")
}