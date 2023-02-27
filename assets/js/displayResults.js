//get user picks from localStorage
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
        // console.log(data);
        // console.log(data.results);
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
      //.log(response);
      return response.json();
    })
    .then(function (details) {
      //console.log(details);
      //console.log(details.runtime);
      runtimeStuff = details.runtime;
      var movieId = details.id;
      storeMovieIDs(movieId, runtimeStuff);
      // return details;
    });
}
//stores runtimes in an array, then adds array values to each movie card
function storeMovieIDs(movieId, runtime) {
  movieRunTimesArr.push(runtime);
  //console.log(movieRunTimesArr);
  for (var i = 0; i < movieRunTimesArr.length; i++) {
    var runtimeEl = $("#runtime-" + [i]);
    runtimeEl.text(movieRunTimesArr[i] + " min");
  }
}

//displays the top 5 movie results based on the fetched data
function showMovies(data) {
  movieContainerEl.empty();

  for (let i = 0; i < 5; i++) {
    var movieContentEl = document.createElement("div");
    movieContentEl.setAttribute("id", "movieCards");
    movieContentEl.setAttribute("class", "card g-5 m-5 text-dark");
    console.log(data[i].id);
    var movie_ID = data[i].id;

    getMovieDetails(movie_ID);

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
    <p id="runtime-${i}" class="">${"runtime"}</p>
    <p id="overview" class="lead">${data[i].overview}</p>
    <h3 id="rating" class="mb-3 display-8">Rating: <span class="rating">${
      data[i].vote_average
    }</span></h3> 
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

  for (let i = 0; i < 5; i++) {
    var dinnerContentEl = document.createElement("div");
    dinnerContentEl.setAttribute("class", "card m-5");
    dinnerContentEl.setAttribute("id", "foodCards");
    dinnerContentEl.setAttribute("style", "width: 500px; height: 600px;");

    dinnerContentEl.innerHTML = `<div class="food-card g-3 rounded-2" style="height: 500px; width: 475px;">
    <div id="foodPoster" style="width:100%;">
    <img
    id="food-img"
    src="${data.hits[i].recipe.image}"
    class="img" style="width: 100%; height:300px;"
    />
    </div>
    <div id="food-content" style="width: 400px; height: 200px;" class="card-body text-dark">
    <h2 id="food-name" class="card-text display-8">${data.hits[i].recipe.label}</h2>
    <p id="ingredients" class="card-text scroll" style="width: 450px; height: 100px;">${data.hits[i].recipe.ingredientLines}</p>
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

  for (let i = 0; i < 5; i++) {
    var drinkContentEl = document.createElement("div");
    drinkContentEl.setAttribute("class", "card m-5");
    drinkContentEl.setAttribute("id", "foodCards");
    drinkContentEl.setAttribute("style", "width: 500px; height: 600px;");

    drinkContentEl.innerHTML = `<div class="drink-card g-3 rounded-2" style="height: 450px; width: 300px;">
    <div id="drinkPoster" style="width:100%;">
    <img
    id="drink-img"
    src="${arr[i].strDrinkThumb}"
    class="img" style="width: 475px; height:400px;"
    /> <br>
    </div>
    <div id="drink-content" style="height: 200px;" class="card-body text-dark align-text-bottom">
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
