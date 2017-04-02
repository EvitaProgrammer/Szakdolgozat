var map = undefined;

$(document).ready(function(){	
	map = new OpenStreetMap_wrapper.OpenStreetMap('map', 47.4813602, 18.990219, 6, showMarkerInformation);
	map.init();
});

function showMarkerInformation(markerId){
	var events = map.getEventsToLocation(markerId);
	var eventsWrapper = $('#events-wrapper');
	eventsWrapper.empty();
	eventsWrapper.append(eventsTitleBlock(markerId))
	var eventList = $('<ul />')
	$.each(events, function(index, value){
		var eventItem = $('<li />')
		var dateSpan = $('<span />').addClass('event-date').html('(' + value.date + ')&nbsp;');
		var personSpan = $('<span />').addClass('event-person').html(value.name + '&nbsp;');
		var eventSpan = $('<a />').attr('target','_blank').attr('href',value.url).html(value.event);
		eventItem.append(dateSpan).append(personSpan).append(eventSpan);
		eventList.append(eventItem);
	});	
	eventsWrapper.append(eventList);
}

function eventsTitleBlock(city){
	var wrapper = $('<h3 />').html(city);
	return wrapper;
}

function createNewSearch(){
	$('#search-wrapper').hide();
	var startDate = $('#startDate').val();
	var endDate = $('#endDate').val();
	var personArray = [];
	$.each($('#search-checkbox-wrapper').find('input[type="checkbox"]:checked'), function(index, value){
		personArray.push($(value).val());
	})
	var persons = personArray.join();
	$.ajax({
		type: 'POST',
		url: '/evelin/rest/query.php',
		data: {
			startDate: startDate,
			endDate: endDate,
			persons: persons
		},
		success: function (responseS, textStatus, jqXHR) {
			var response = $.parseJSON(responseS);
			$.each(response.content, function(index, value){
				map.addEvent(parseFloat(value.lng), parseFloat(value.lat), value.place, value, 'Blue');
			});
			console.log(response);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			callbackFunction(null);
		}
	});
}

function searchReset(){
	location.reload()
}