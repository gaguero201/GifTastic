var topics = ["cars","stones","sports","ocean"];


function createButtons(){ 
	
	$('#previewButtons').empty();

	for (var i = 0; i < topics.length; i++){
		
		var a = $('<button>') 
		a.addClass('show'); 
		a.attr('data-name', topics[i]);
		a.text(topics[i]);
		$('#previewButtons').append(a); 
	}
}

$("#addShow").on("click", function(){

	
	var show = $("#show-input").val().trim();
	
	shows.push(show);
	
        createButtons();
        
	return false; 
})


function displayGifs(show){
	var show = $(this).attr("data-name");
	
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        show + "&api_key=696dr6PnqftsADE4LPYz9FFjcFInCdjX&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
       
        .then(function (response) {
			
			var results = response.data;
			
			for (var i = 0; i < results.length; i++) {
				
				var gifDiv = $('<div class=gifs>');
				var seeGif = $('<img>');
					seeGif.attr('src', results[i].images.fixed_height_still.url);
					
					seeGif.attr('title', "Rating: " + results[i].rating);
					seeGif.attr('data-still', results[i].images.fixed_height_still.url);
					seeGif.attr('data-state', 'still');
					seeGif.addClass('gif');
					seeGif.attr('data-animate', results[i].images.fixed_height.url);
				
				gifDiv.append(seeGif)
				

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}


$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});




$(document).on("click", ".show", displayGifs);


createButtons();
