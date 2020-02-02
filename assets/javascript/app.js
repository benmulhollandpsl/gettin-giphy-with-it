
//example code from giphy
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
xhr.done(function(data) { console.log("success got data", data); });

// my api key
// PaOSC7zPgMYPi9RUUIY90VY7tn3Q3cJP


//QUOTE THE GIPHY ASSIGNMENT 13 segments and slightly rewritten

    // preexisting buttons not sure if this is the right way to do this

<body>
  <button data-person="Will Smith">Fresh Prince</button>
  <button data-person="Gritty">
    The most jarring and lovable mascot that allegedly struck a child.
  </button>


  <button data-person="Lucille Ball">
    Love yourself first and everything else falls into line.
  </button>
  <button data-person="Taylor Swift">
    If you're horrible to me, I'm going to write a song about it,
    and you won't like it. That's how I operate.
  </button>
  <button data-person="Samuel Jackson">
    Far better is it to dare mighty things, to win glorious triumphs,
    even though checkered by failure... than to rank with those poor spirits who
    neither enjoy nor suffer much, because they live in a gray twilight that
    knows not victory nor defeat.
  </button>

  <div id="gifs-appear-here">
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript">
    // Event listener for all button elements
    $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-person");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });
  </script>