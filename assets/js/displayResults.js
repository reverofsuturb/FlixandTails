var moviesAPIUrl = localStorage.getItem("moviesAPI");

//calls the getMovies function
getMovies(moviesAPIUrl);

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
      // console.log(data);
      // console.log(data.results);
      showMovies(data.results);
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
    console.log(data[i].id);
    var movie_ID = data[i].id;

    getMovieDetails(movie_ID);

    movieContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2" max-height="300px">
    <div id="poster" class="col-md-2">
    <img
    id="movie-poster"
    src="${IMGUrl + data[i].poster_path}"
    class="img-fluid"
    />
    </div>
    <div id="movie-content" class="col-md-10 p-5">
    <h3 id="movie-name" class="display-6 col-md-9">${data[i].title}</h3><br>
    <p id="runtime-${i}" class="">${"runtime"}</p>
    <p id="overview" class="lead">${data[i].overview}</p><br>
    <h3 id="rating" class="mb-3 display-8">Rating: <span class="rating">${
      data[i].vote_average
    }</span></h3>
    </div>
    </div>`;

    movieContainerEl.append(movieContentEl);
  }
}

// // food section
getrecipe();

function getrecipe() {
  var foodshow = localStorage.getItem("foodresult");
  fetch(foodshow)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showDinner(data);
    });
}

var dinnerContainerEl = $("#dinner-container");

function showDinner(data) {
  dinnerContainerEl.empty();

  for (let i = 0; i < 5; i++) {
    var dinnerContentEl = document.createElement("div");
    dinnerContentEl.setAttribute("class", "card g-5 m-5");
    dinnerContentEl.setAttribute("id", "foodCards");
    dinnerContentEl.setAttribute("style", "width: 500px; height: 600px;");

    dinnerContentEl.innerHTML = `<div class="food-card m-3 g-3 border border-1 border-light rounded-2" height="450" width="300">
    <div id="foodPoster" class=""  style="width:100%;">
    <img
    id="food-img"
    src="${data.hits[i].recipe.image}"
    class="img" style="width: 100%; height:200px;"
    /><br>
    </div>
    <div id="food-content"  style="height: 200px;" class="card-body p-5 text-dark align-text-bottom">
    <h2 id="food-name" class="card-text display-8">${data.hits[i].recipe.label}</h2><br>
    <p id="ingredients" class="card-text">${data.hits[i].recipe.ingredientLines}</p>
    <p id="foodID" style="display:none;">${data.hits[i]._links.self.href}</p>
    <button id="foodselect" class="btn form-btn btn-outline-secondary">Save Selection</button>
    </div>
    </div>`;

    dinnerContainerEl.append(dinnerContentEl);
  }
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
      showDrinks(data.drinks);
    });
}
function showDrinks(arr) {
  drinkContainerEl.empty();

  for (let i = 0; i < 5; i++) {
    var drinkContentEl = document.createElement("div");

    drinkContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
    <div id="poster" class="col-md-2">
    <img
    id="drink-img"
    src="${arr[i].strDrinkThumb}"
    class="img-fluid"
    />
    </div>
    <div id="drink-content" class="col-md-10 p-5">
    <h2 id="drink-name" class="display-5 col-md-9">${arr[i].strDrink}</h2>
    <p id="drinkID" style="display:none;">${arr[i].idDrink}</p>
    </div>
    </div>`;

    drinkContainerEl.append(drinkContentEl);
  }
}

getDrinks(drinksUrl1);
