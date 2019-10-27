var topics = ["cars","stones","sports","ocean"];

function createButtons() { 
  
  $('#previewButtons').empty();
  
  for (var i = 0; i < topics.length; i++){
  
    var a = $('<button>') 
    a.addClass('show'); 
    a.attr('data-name', topics[i]); 
    a.text(topics[i]); 
    $('#previewButtons').append(a);
  }
}

// activates click addButton event
$("#addButton").on("click", function(){

  var button = $("#button-input").val().trim();
  topics.push(button);
  createButtons();
  return false; 
})

// function to display gifs
function showMeGifs(){
  var show = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=9&api_key=696dr6PnqftsADE4LPYz9FFjcFInCdjX&limit=10";

  
        $.ajax({url: queryURL, method: "GET"})
        
        .done(function (response) {
            
            console.log(response.data);
    
      var results = response.data;
      
      for (var i = 0; i < results.length; i++) {
             
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var gifDiv = $('<div class=gifs>');
        var displayGif = $('<img>');
                displayGif.attr('src', results[i].images.fixed_height_still.url);
          
          displayGif.attr('title', "Rating: " + results[i].rating);
          displayGif.attr('data-still', results[i].images.fixed_height_still.url);
          displayGif.attr('data-state', 'still');
          displayGif.addClass('gif');
          displayGif.attr('data-animate', results[i].images.fixed_height.url);
        
        gifDiv.append(displayGif)
        

        $("#gifsView").prepend(gifDiv);
      }
            } 
    });
}

//makes gifs animate upon being clicked
$(document).on('click', '.gif', function(){
  var state = $(this).attr('data-state');
    if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});

createButtons();

$(document).on("click", ".show", showMeGifs);