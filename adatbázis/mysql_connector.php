<?php
$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname;

// Connect
function connect() {
	$connection = new mysqli($servername, $username, $password, $dbname);
	if($connection->connect_error) {
		die("Failed to connect: " . $connection->connect_error);
	}
	echo "Connected!";
	return $connection;
}

// Disconnect
function close_connection($connection) {
	$connection->close();
}

// Create database and fill with data from sql file
function create_database_with_data() {
	$connection = new mysqli($servername, $username, $password);
	if($connection->connect_error) {
		die("Failed to connect: " . $connection->connect_error);
	}
	echo "Connected!";
	
	$sql_file = fopen("szakdolgozat.sql", "r");
	if($sql_file) {
		while(($line = fgets($sql_file)) !== false) {
			$sql_command = $line;
			if($connection->query($sql_command) === true) {
				echo("Database command successfully applied!");
			} else {
				echo("Failed during sql command: " . $connection->error);
			}
		}
		fclose($sql_file);
	} else {
		echo("Error while opening the file!");
	}
	
	close_connection($connection);
	echo "Database created and filled with data";
}

function get_data_from_db($sql_string, $connection) {
	$result_set = $connection->query($sql_string);
	if($result_set->num_rows <= 0) {
		echo "No result for the given query exsits!";
		return false;
	} else {
		// $row = $result_set->fetch_assoc() to get the results in a cycle
		return $result_set;
	}
	close_connection($connection);
}

// Main App
create_database_with_data();
?>