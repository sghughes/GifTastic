var topics = ['Golf', 'Hockey', 'Baseball', 'Cycling', 'Basketball'];


//loop to append button for each string in the array
function buttonCreation (){
    $('#buttonDiv').empty();
    for(var i=0; i<topics.length; i++){
        var gifButton = $('<button>');
        gifButton.attr('class', 'btn btn-light gifButton');
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $('#buttonDiv').append(gifButton).append('  ');
    }
}
buttonCreation();

//function to pull 10 static, non animated gifs from giphy API and display on page with rating.

function gifDisplay (){
    var sitcom = $(this).attr("data-name");
    console.log(sitcom);

    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=bTXTwX28rV9fAEFpdYf3qwldVlSp0TMU&q=' + sitcom + '&limit=10&offset=0&rating=G&lang=en';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){
        $('#gifDiv').empty();
        console.log(response);
        var results = response.data;
        for (var i = 0; i < 10; i++) {
            console.log(results[i].rating);
            var gifResult = $('<div>');
            gifResult.html('<p>' + 'Rating: ' + results[i].rating.toUpperCase() + '</p>');
            var gifImage = $('<img class=\'gifImage\'>');
            gifResult.attr('id','gifResultDiv');
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url); //check this
            gifImage.attr('data-animate', results[i].images.fixed_height.url); //check this
            gifImage.attr('data-state', 'still');
            gifResult.append(gifImage);
            $('#gifDiv').append(gifResult);
        }
    })
};

//on button click, gifs will generate
$(document).on("click", ".gifButton", gifDisplay);

//on gif click, gif will animate or stop animating
$(document).on("click", ".gifImage", function() {
    var state = $(this).attr('data-state');
    console.log(state);
    if(state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'))
        $(this).attr('data-state','animate');
    }
    else {
        $(this).attr('src', $(this).attr('data-still'))
        $(this).attr('data-state','still');  
    }
});

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // grabs the input from the textbox
    var gif = $("#gif-input").val().trim();
    //clears input value so it's ready for new submission
    document.getElementById('gif-input').value='';
    // The input from the textbox is then added to our array
    topics.push(gif);
    // Calling renderButtons which handles the processing of our movie array
    buttonCreation();
  });


