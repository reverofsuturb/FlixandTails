var moviesAPIUrl = localStorage.getItem("moviesAPI");
var drinksUrl1 = localStorage.getItem("drinksUrl1");
console.log(localStorage.getItem("drinksUrl1"));
var drinksUrlID = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

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

function storeMovieIDs(movieId, runtime) {
  movieRunTimesArr.push(runtime);
  console.log(movieRunTimesArr);
  for (var i = 0; i < movieRunTimesArr.length; i++) {
    var runtimeEl = $("#runtime-" + [i]);
    runtimeEl.text(movieRunTimesArr[i] + " min");
  }
}

function showMovies(data) {
  movieContainerEl.empty();

  for (let i = 0; i < 5; i++) {
    console.log("showMoviesFor");
    // var movieTitleEl = $("<div></div");
    var movieContentEl = document.createElement("div");
    console.log(data[i].id);
    var movie_ID = data[i].id;

    getMovieDetails(movie_ID);

    movieContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
          <div id="poster" class="col-md-2">
            <img
              id="movie-poster"
              src="${IMGUrl + data[i].poster_path}"
              class="img-fluid"
            />
          </div>
          <div id="movie-content" class="col-md-10 p-5">
            <h2 id="movie-name" class="display-5 col-md-9">${data[i].title}</h2>
            <p id="runtime-${i}" class="">${"runtime"}</p>
            <p id="overview" class="">${data[i].overview}</p>
            <h3 id="rating" class="mb-3">Rating<span class="rating">${
              data[i].vote_average
            }</span></h3>
          </div>
        </div>`;

    movieContainerEl.append(movieContentEl);
  }
}

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
      // console.log(data.drinks);
      // showMovies(data.results);
    });
}
getMovies(moviesAPIUrl);
getDrinks(drinksUrl1);
