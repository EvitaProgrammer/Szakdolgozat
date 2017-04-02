<?php
	define('DB_SERVER', 'localhost');
	define('DB_USERNAME', 'root');
	define('DB_PASSWORD', '');
	define('DB_DATABASE', 'szakdolgozat');
	$connection = mysql_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD) or die( "Unable to connect");
	$database = mysql_select_db(DB_DATABASE) or die( "Unable to select database");

	mysql_set_charset('utf8', $connection);
	
	function buildQuery($startDate, $endDate, $persons){
		$queryCondition = NULL;
		if($startDate != NULL AND $endDate != NULL){
			$queryCondition = $queryCondition.'(date BETWEEN  \''.$startDate.'-01-01 00:00:00\' AND \''.$endDate.'-01-01 23:59:59\' )';
		}
		if($persons != NULL){
			$personCondition = '';
			$personArray = explode(",", $persons);
			foreach($personArray as $person) {
				$person = trim($person);
				if (strlen($personCondition) > 0){
					$personCondition = $personCondition.' OR ';
				}
				$personCondition = $personCondition.' name = \''.$person.'\'';
			}
			if($queryCondition == NULL){
				$queryCondition = '('.$personCondition.')';
			}else {
				$queryCondition = $queryCondition.' AND ('.$personCondition.')';				
			}
		}
		if($queryCondition != NULL){
			return 'SELECT * FROM content WHERE '.$queryCondition.' ORDER BY date'; 
		} else {
			return 'SELECT * FROM content ORDER BY date';
		}		
	}
	
	$startDate = NULL;
	$endDate = NULL;
	$persons = NULL;
	if(isset($_POST['startDate']) AND isset($_POST['endDate'])){
		$startDate = $_POST['startDate'];
		$endDate = $_POST['endDate'];
	}
	if(isset($_POST['persons'])){
		$persons = $_POST['persons'];
	}
	$query = buildQuery($startDate, $endDate, $persons);	
	$response = '';
	$result = mysql_query($query);	
	if (mysql_num_rows($result) > 0) {
		while($row = mysql_fetch_assoc($result)) {
			if (strlen($response) > 0){
				$response = $response.',';
			}
			$response = $response.'{"name":"'.str_replace('"','&#34;',$row['name']).'", '
				.'"date":"'.str_replace('"','&#34;',$row['date']).'", '
				.'"event":"'.str_replace('"','&#34;',$row['event']).'", '
				.'"url":"'.str_replace('"','&#34;',$row['url']).'", '
				.'"place":"'.str_replace('"','&#34;',$row['place']).'", '
				.'"lat":"'.str_replace('"','&#34;',$row['lat']).'", '
				.'"lng":"'.str_replace('"','&#34;',$row['lng']).'"}';
		}
	}
	$response = '['.$response.']';
	
	echo '{"content": '.$response.'}';
?>
