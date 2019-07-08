class Print{
	val ANSI_RESET: String = "\u001B[0m";
	val ANSI_RED: String = "\u001B[31m";
	val ANSI_GREEN: String = "\u001B[32m";
	
	fun error(message: String) {
		println(ANSI_RED + message + ANSI_RESET)
	}
	
	fun success(message: String) {
		println(ANSI_GREEN + message + ANSI_RESET)
	}
}