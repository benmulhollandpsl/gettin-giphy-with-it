
    
var topics = ["Will Smith", "Gritty", "Benjamin Franklin", "cheese steak", "Philadelphia Orchestra"];
var topicNumber = 5;

$(document).ready(function(){

    $("#addNew").focus();

    for (let i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("gifButton btn btn-secondary");
        newButton.attr("type", "button");
        newButton.attr("value", topics[i])
        newButton.text(topics[i]);
        $("#topics").append(newButton);
    }
    
    $("#add").click(function () {
        event.preventDefault();

        if ($("#addNew").val() == "") {
            alert("Nothing in search field, please type something and try again");
        } else {
            var button = $("<button>");
            var buttonName = $("#addNew").val();
            button.addClass("gifButton btn btn-secondary");
            button.attr("type", "button");
            button.attr("value", buttonName);
            button.text(buttonName);
            $("#topics").append(button);
            $("#addNew").val("");
        }

    });
    
});

$(document).on("click", ".gifButton", function () {
    var searchTerm = $(this).val();
    var url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=PaOSC7zPgMYPi9RUUIY90VY7tn3Q3cJP&limit=10&rating=pg";
    // console.log(searchTerm); //was working when doing div method now said 'Failed to load resource: the server responded with a status of 403 (Forbidden)'

    $.ajax({
        url: url,
        method: "GET",
    }).done(function (result) {
        // console.log(result);

        cardGroup = $("<div>");
        cardGroup.addClass("card-group");
        cardGroup.attr("id", "group" + topicNumber);
        $("#gif-space").prepend(cardGroup);

        for (let i = 0; i < result.data.length; i++) {
 

            cardDiv = $("<div>");
            cardDiv.addClass("card col-md-3");

            newGif = $("<img>");
            newGif.addClass("gif card-img-top");
            newGif.attr("src", result.data[i].images.fixed_height_still.url);
            newGif.attr("data-still", result.data[i].images.fixed_height_still.url);
            newGif.attr("data-animate", result.data[i].images.fixed_height.url);
            newGif.attr("data-state", "still");

            newP = $("<p>");
            newP.addClass("card-text");
            newP.html("Rating: " + result.data[i].rating);

            cardDiv.html(newGif);
            cardDiv.append(newP);
            $("#group"+topicNumber).prepend(cardDiv);


        };
        topicNumber++;
    });

});

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    // console.log(state);

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");  
      } else if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    
});
