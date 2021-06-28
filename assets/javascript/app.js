
    
let topics = ["Will Smith", "Gritty", "Benjamin Franklin", "cheese steak", "Philadelphia Orchestra"];
let topicNumber = 5;

$(document).ready(function(){

    $("#addNew").focus();
    //increment buttons of var topics
    for (let i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("gifButton btn btn-success");
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
            button.addClass("gifButton btn btn-success");
            button.attr("type", "button");
            button.attr("value", buttonName);
            button.text(buttonName);
            $("#topics").append(button);
            $("#addNew").val("");
        }

    });
    
});
        //using api key to search through pg-13
$(document).on("click", ".gifButton", function () {
    var searchTerm = $(this).val();
    var url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm +  "&api_key=PaOSC7zPgMYPi9RUUIY90VY7tn3Q3cJP&limit=5&rating=pg-13";


    $.ajax({
        url: url,
        method: "GET",
    }).done(function (result) {
        // console.log(result);

        cardGroup = $("<div>");
        cardGroup.addClass("card-group");
        cardGroup.attr("id", "group" + topicNumber);
        
                //card group needs to be a container, needs class container ever 4 need a row to break for a row,  -if i %= 0 create a row then place in the row set back to 10 next iteration
        $("#gif-space").prepend(cardGroup);

        for (let i = 0; i < result.data.length; i++) {
 

            cardDiv = $("<div>");
            cardDiv.addClass("card col-md-3");

            newGif = $("<img>");
            newGif.addClass("gif card-img-top"); 
            newGif.attr("src", result.data[i].images.fixed_height_still.url);  //looks crowded but will keep this for now
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

    if (state == "still") {   //movement still and animate
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");  
      } else if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

});
