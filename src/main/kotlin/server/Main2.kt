class Main2 {
	var prop1: Int
	
	init {
		println("Im init")
		
		prop1 = try { 5/1 } catch(e: Exception) { println("error"); 0 }
	}
	
	fun constructor(){
		println("Im constr")
	}
	fun start(){
		println("Im start $prop1")
	}
}

fun main(args: Array<String>) {
	val start = Main2()
	start.start()
//	val a = try { 5/0 } catch(e: Exception) { e.printStackTrace() }
//	println("after exceptin")
}