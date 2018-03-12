var countries = ["Costa Rica", "France", "New Zealand", "Italy", "China", "South Africa", "Egypt", "Thailand"];

  // displayPlace function re-renders the HTML to display the appropriate content
function displayPlace() {
    $("td").empty();
    $(".card").show();

    var place = $(this).attr("data-place");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    place + "&api_key=lvgn7ul8Zf7ZT3h58B3HnSSzfe8nFtA5&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: 'GET'
     }).then(function(response) {
        console.log(response);

    var results = response.data;
    // Looping over every result item
    for (var i = 0; i < 10; i++) {
        
          // Creating a div with the class "item"
          var gifDiv = $("<td class='item'>");
          // Storing the result item's rating
          var rating = results[i].rating;
          // Creating an image tag
          var placeImage = $("<img + class='image'>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p class='rating'>").text("Rating: " + rating);
          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          placeImage.attr("src", results[i].images.fixed_height_still.url);
          placeImage.attr("data-still", results[i].images.fixed_height_still.url);
          placeImage.attr("data-animate", results[i].images.fixed_height.url);
          placeImage.attr("data-state", 'still');
          placeImage.addClass("gif");
          
          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(placeImage);
          gifDiv.append(p);
         
          // Appending the gifDiv to the "#display" div in the HTML
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            $("#displayGifs").append(gifDiv);
        }

        else {
        }
    }

           $(".gif").on("click", function ()  {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
            if (state === "still") {
            console.log(state);
            $(this).attr("src", $(this).attr("data-animate"));
        
            $(this).attr("data-state", "animate");
            var animate = $(this).attr("data-animate");
    
            console.log(animate);

            console.log(this);
            console.log(state);
            } 
            
            else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
    });
});

};

   function renderButtons() {
    // Deleting the giphys prior to adding new ones
    $("#buttons-view").empty();
    // Looping through the array of places
        for (var i = 0; i < countries.length; i++) {
            // Then dynamicaly generating buttons for each place in the array
            var a = $("<button + type='button' + class='btn btn-primary btn-sm'>");
            // Adding a data-attribute
            a.addClass("place-btn", countries[i]);
            a.attr("data-place", countries[i]);
            // Providing the initial button text
            a.text(countries[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-place").on("click", function(event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var place = $("#place-input").val().trim();
        // Adding the movie from the textbox to our array
        countries.push(place);
        //Clears place from search box
        document.getElementById("place-form").reset();
        // Calling renderButtons which processes the array
        renderButtons();

    });


  // Adding a click event listener to all elements with a class of "place-btn"
  $(document).on("click", ".place-btn", displayPlace);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();