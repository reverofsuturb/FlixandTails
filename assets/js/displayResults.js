var moviesAPIUrl = localStorage.getItem("moviesAPI");
var opSelected1 = localStorage.getItem("dinnerYN");
var opSelected2 = localStorage.getItem("drinkYN");
var opSelected3 = localStorage.getItem("movieYN");

var movieContainerEl = $("#movie-container");
// function that uses the moviesAPI store in localStorage to fetch and get the movies data
function getMovies(moviesAPIUrl) {
  console.log(moviesAPIUrl);
  // fetch
  fetch(moviesAPIUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      if (data.total_results === 0) {
        showMoviesError();
        getGenres();
      } else {
        showMovies(data.results);
      }
    });
}
// gets more details info from movie API using movie_id as argument
function getMovieDetails(movie_ID) {
  var movieDetailsUrl =
    "https://api.themoviedb.org/3/movie/" +
    movie_ID +
    "?" +
    APIKey +
    "&language=en-US";
  //console.log(movieDetailsUrl);
  // fetch
  fetch(movieDetailsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (details) {
      runtimeStuff = details.runtime;
      var movieId = details.id;
      var watchNow = details.homepage; //link for watch now
      storeMovieIDs(movieId, runtimeStuff, watchNow);
    });
}
// gets providers info from movie API using movie_id as argument
function getMovieProviders(movie_ID) {
  var movieProvidersUrl =
    "https://api.themoviedb.org/3/movie/" +
    movie_ID +
    "/watch/providers?" +
    APIKey +
    "&language=en-US&watch_region=US";

  // fetch
  fetch(movieProvidersUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (providers) {
      console.log(providers.results);
      if (providers.results !== undefined) {
        if (providers.results.US !== undefined) {
          if (providers.results.US.link !== undefined) {
            var movieProviderLink = providers.results.US.link || "No provider";
          } else {
            var movieProviderLink = " ";
          }
        } else {
          var movieProviderLink = " ";
        }
      } else {
        var movieProviderLink = " ";
      }

      if (providers.results !== undefined) {
        if (providers.results.US !== undefined) {
          if (providers.results.US.flatrate !== undefined) {
            if (providers.results.US.flatrate[0].provider_name !== undefined) {
              var movieProvider =
                providers.results.US.flatrate[0].provider_name || "No name";
            } else {
              var movieProvider = " ";
            }
          } else {
            var movieProvider = " ";
          }
        } else {
          var movieProvider = " ";
        }
      } else {
        var movieProvider = " ";
      }

      console.log("name: " + movieProvider);
      console.log("link: " + movieProviderLink);

      storeMovieProviders(movieProvider, movieProviderLink);
    });
}
//stores runtimes in an array, then adds array values to each movie card
function storeMovieIDs(movieId, runtime, watchNow) {
  movieRunTimesArr.push(runtime);
  //console.log(movieRunTimesArr);
  for (var i = 0; i < movieRunTimesArr.length; i++) {
    if (movieRunTimesArr[i].value != 0) {
      var runtimeEl = $("#runtime-" + [i]);
      runtimeEl.text(movieRunTimesArr[i] + " min");
    }
  }
}
//stores movieProviders in an array, then adds array values to each movie card
function storeMovieProviders(movieProvider, movieProviderLink) {
  movieProvidersArr.push(movieProvider);
  movieProvidersLinkArr.push(movieProviderLink);
  //console.log(movieProvidersArr);
  for (var i = 0; i < movieRunTimesArr.length; i++) {
    var providerNameEl = $("#provider-" + [i]);
    providerNameEl.text(" " + movieProvidersArr[i]);
    providerNameEl.attr("href", movieProvidersLinkArr[i]);
  }
}

//displays the top 5 movie results based on the fetched data
function showMovies(data) {
  movieContainerEl.empty();

  for (let i = 0; i < 3; i++) {
    var movieContentEl = document.createElement("div");
    movieContentEl.setAttribute("id", "movieCards");
    movieContentEl.setAttribute("class", "card g-5 m-5 text-dark");
    console.log(data[i].id);
    var movie_ID = data[i].id;

    getMovieDetails(movie_ID);

    getMovieProviders(movie_ID);

    movieContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 rounded-2" max-height="300px">
    <div id="poster" class="col-md-2">
    <img
    id="movie-poster"
    src="${IMGUrl + data[i].poster_path}"
    class="img" style="width: 100%;"
    />
    </div>
    <div id="movie-content" class="col-md-8 p-1 ps-3">
    <h3 id="movie-name" class="display-6 col-md-9">${data[i].title}</h3>
    <p id="runtime-${i}" class="">${" "}</p>
    <p id="overview" class="">${data[i].overview}</p>
    <p>Watch it on: <a id="provider-${i}" class="">${" "}</a></p>
    <h3 id="rating" class="mb-3">Rating<span class="rating"> ${
      parseFloat(data[i].vote_average)}/10
    </span></h3> 
    <p style="display:none;">${movie_ID}</p>
    <button id="movieselect" class="btn form-btn btn-outline-secondary">Save Selection</button>
    </div>
    </div>`;

    movieContainerEl.append(movieContentEl);
  }
}

// error function to reshow search parameters and resubmit

function showMoviesError() {
  movieContainerEl.empty();

  $("#showiferrormovie").css("display", "inherit");
  var movieContentEl = document.createElement("div");
  movieContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="movie-postererror"
    src="assets/Images/felix-emptytheatre-unsplash.jpg"
    class="img-fluid"
    />
    </div>
    <div id="movie-content" class="col-md-10 p-5">
    <h2 id="movie-name" class="display-5 col-md-9">>We're Sorry your results were inconclusive, please try different parameters and try again, please try a different search!</h2>
    </div>
    </div>`;

  movieContainerEl.append(movieContentEl);
}

// event listener for error is in movie.js

// // food section

function getrecipe() {
  var foodshow = localStorage.getItem("foodresult");
  fetch(foodshow)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.count === 0) {
        showDinnerError();
      } else {
        showDinner(data);
      }
    });
}

var dinnerContainerEl = $("#dinner-container");

function showDinner(data) {
  dinnerContainerEl.empty();

  for (let i = 0; i < 3; i++) {
    var dinnerContentEl = document.createElement("div");
    dinnerContentEl.setAttribute("class", "card m-5 col-md-3");
    dinnerContentEl.setAttribute("id", "foodCards");

    dinnerContentEl.innerHTML = `<div class="d-flex flex-column flex-wrap justify-content-start align-items-stretch rounded-2">
    <div id="foodPoster" class="d-flex text-center flex-wrap justify-content-center align-items-stretch" style="overflow: hidden;">
    <img
    id="food-img"
    src="${data.hits[i].recipe.image}"
    class="text-center img-fluid" 
    />
    </div>
    <div id="food-content"   class="card-body d-flex flex-column justify-content-start p-4 text-dark">
    <h2 id="food-name" class="card-text display-8">${data.hits[i].recipe.label}</h2>
    
    <p id="foodID" style="display:none;">${data.hits[i]._links.self.href}</p>
    <button id="foodselect" class="btn form-btn btn-outline-secondary">Save Selection</button>
    </div>
    </div>`;

    dinnerContainerEl.append(dinnerContentEl);
  }

  if (opSelected2 == 1) {
    getDrinks(drinksUrl1); //drink
  } else {
    if (opSelected3 == 1) {
      getMovies(moviesAPIUrl);
    }
  }
}

// error function to reshow search parameters and resubmit

function showDinnerError() {
  dinnerContainerEl.empty();
  $("#showiferrordinner").css("display", "inherit");

  var dinnerContentEl = document.createElement("div");

  dinnerContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="food-imgerror"
    src="assets/Images/sarah-kilian-icecream-unsplash.jpg"
    class="img-fluid"
    />
    </div>
    <div id="food-content" class="col-md-10 p-5">
    <h2 id="food-name" class="display-5 col-md-9">We're Sorry your results were inconclusive, please try different parameters and try again, please try a different search!</h2>
    
    </div>
    </div>`;

  dinnerContainerEl.append(dinnerContentEl);
}

// event listener for remake button if dinner query is bad

$("#remakedinner").on("click", function () {
  saverecipe();
  $("#showiferrordinner").css("display", "none");
  location.reload();
});

// Drinks section
var drinkContainerEl = $("#drink-container");
var drinksUrl1 = localStorage.getItem("drinksUrl1");
var drinksUrlID = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
function getDrinks(drinksUrl1) {
  console.log(drinksUrl1);
  // fetch
  fetch(drinksUrl1)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.drinks);
      if (data.drinks == "None Found") {
        showDrinksError();
      } else {
        showDrinks(data.drinks);
      }
    });
}

function showDrinks(arr) {
  drinkContainerEl.empty();

  for (let i = 0; i < 3; i++) {
    var drinkContentEl = document.createElement("div");
    drinkContentEl.setAttribute("class", "card m-5  col-md-3");
    drinkContentEl.setAttribute("id", "drinkCards");

    drinkContentEl.innerHTML = `<div class="drink-card d-flex flex-column flex-wrap justify-content-start align-items-stretch rounded-2">
    <div id="drinkPoster" class="d-flex text-center flex-wrap justify-content-center align-items-stretch" style="overflow: hidden;">
    <img
    id="drink-img"
    src="${arr[i].strDrinkThumb}"
    class="text-center img-fluid"  
    />  
    </div>
    <div id="drink-content"   class="card-body d-flex flex-column justify-content-start p-4 text-dark">
    <h2 id="drink-name" class="card-text display-8">${arr[i].strDrink}</h2>
    <p id="drinkID" style="display:none;">${arr[i].idDrink}</p><br>
    <button id="drinkselect" class="btn form-btn btn-outline-secondary">Save Selection</button>
    </div>
    </div>`;

    drinkContainerEl.append(drinkContentEl);
  }

  if (opSelected3 == 1) {
    getMovies(moviesAPIUrl);
  }
}

//Call Functions
if (opSelected1 == 1) {
  getrecipe(); //dinner
} else {
  if (opSelected2 == 1) {
    getDrinks(drinksUrl1); //drink
  } else {
    //calls the getMovies function
    getMovies(moviesAPIUrl);
  }
}
var foodHeader = $("#foodHeader");
var drinkHeader = $("#drinkHeader");
var movieHeader = $("#movieHeader");

if (opSelected1 == 1) {
  foodHeader.show();
} else {
  foodHeader.hide();
  dinnerContainerEl.hide();
}

if (opSelected2 == 1) {
  drinkHeader.show();
} else {
  drinkHeader.hide();
  drinkContainerEl.hide();
}

if (opSelected3 == 1) {
  movieHeader.show();
} else {
  movieHeader.hide();
  movieContainerEl.hide();
}

function showDrinksError() {
  drinkContainerEl.empty();

  $("#showiferrordrink").css("display", "inherit");

  var drinkContentEl = document.createElement("div");

  drinkContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="drink-imgerror"
    src="assets/Images/anshu-a-drinkerror-unsplash.jpg"
    class="img-fluid"
    />
    </div>
    <div id="drink-content" class="col-md-10 p-5">
    <h2 id="drink-name" class="display-5 col-md-9">We're Sorry your results were inconclusive, please try different parameters and try again, please try a different search!</h2>
    </div>
    </div>`;

  drinkContainerEl.append(drinkContentEl);
}

// event listener for remake button if drink query is bad

$("#remakedrink").on("click", function () {
  if (userDrinkIngredients.length > 0) {
    //change request link accordingly if there is user ingredient input
    if (userDrinkIngredients.length > 0) {
      drinksUrl += "i=";
      //loop through user ingredients array
      for (var i = 0; i < userDrinkIngredients.length; i++) {
        userDrinkIngredients[i] = userDrinkIngredients[i].replace(/\s+/g, "_");
        drinksUrl += userDrinkIngredients[i];
        //add comma to url if not on last one
        if (i < userDrinkIngredients.length - 1) {
          drinksUrl += ",";
        }
      }
      console.log(drinksUrl);
      //save to local storage
      localStorage.setItem("drinksUrl1", drinksUrl);
      //fetch the data
      //   fetchData(drinksUrl);
    }
  }

  //  For category search
  var catChoice = catSelect[catDropdown.val()]; //  get user input for category
  //change request link accordingly for category search
  console.log(catChoice);
  if (catChoice != undefined) {
    catChoice = catChoice.replace(/\s+/g, "_");
    // console.log(catChoice);
    drinksUrl += "c=" + catChoice;
    localStorage.setItem("drinksUrl1", drinksUrl);
    //   fetchData(drinksUrl);
  }
  console.log(drinksUrl);

  $("showiferrordrink").css("display", "none");
  location.reload();
});
