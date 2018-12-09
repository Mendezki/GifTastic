//$(document).ready(function () {

var bands = ["Beatles","Rolling Stones","The Beach Boys","Led Zeppelin","Bo Diddley","Pink Floyd","The Clash","The Kinks","Velvet Underground","Dead Kennedys"];

$("#add-band").on("click", function () {
    
    var band = $("#band-input").val().trim()
    bands.push(band);
    renderButtons();
    return false;
});

function displayGifs() {
    var band = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=S2twFv9aoRxe4X8az44kMKL14WzVHQ0t&limit=10";
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(queryURL);
        
        
        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {
            
            var bandDiv = $("<div>");
            bandDiv.addClass("bandGifs");

            var bandGif = $("<img>");
            bandGif.attr("src", results[i].images.original_still.url);
            bandGif.attr("data-still", results[i].images.original_still.url);
            bandGif.attr("data-animate", results[i].images.original.url);
            bandGif.attr("data-state", "still");
            bandGif.attr("class", "gif");
            
            bandDiv.append(bandGif)

            $("#gifs-view").prepend(bandDiv);
            
            console.log(results);
        }

    });
}
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < bands.length; i++) {

        var b = $("<button>");
        b.addClass("band");
        b.attr("data-name", bands[i]);
        b.text(bands[i]);
        $("#buttons-view").append(b);

    }
}

   $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
    });

$(document).on("click", ".gif", displayGifs);

renderButtons();
//});