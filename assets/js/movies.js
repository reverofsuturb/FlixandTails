//Example
//https://api.themoviedb.org/3/movie/550?api_key=<<api_key>>
//Get Providers especific movie
//https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=<<api_key>>
//Get Imgs                        /    poster_path
//https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg
//Show films made before 1920-03-11 in horror (genre ID: 27) primary_release_date.lte
//https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&page=1&primary_release_date.lte=1920-03-11&with_genres=27
//Show films made in 2022 primary_release_year
//https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&primary_release_year=1920&with_genres=27
//Sort Movies by popularity
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=<<api_key>>
//GET Details movie ID
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

var BASE_Url = "https://api.themoviedb.org/3/";
var APIKey = "&api_key=b44845387b097f5b3e4234772c94b4c5";
var WITHGenre = "&with_genres=";
var APIUrl = BASE_Url + "/discover/movie?sort_by=popularity.desc";
var IMGUrl = "https://image.tmdb.org/t/p/w500";
var runtimeStuff = 0;
var movieIdsArr = [];
var movieRunTimesArr = [];
var genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

var tagsContainer = $("#tags");
var selectedGenres = [];
var movieContainerEl = $("#movie-container");
var movieTitleEl = $("#movie-title");
var movieContentEl = $("#movie-content");
var makeMyNightBtn = $("#makeMyNight");

getGenres();
//getMovies(APIUrl);

const releasedYear = document.querySelector("#year-select");

const runtime = document.querySelector("#runtime-select");

makeMyNightBtn.addClass("btn btn-primary");
makeMyNightBtn.on("click", function () {
  console.log(releasedYear.value);
  var released_Year = releasedYear.value;

  console.log("Runtime: " + runtime.value);
  var runtime_movie = runtime.value;

  movieRunTimesArr = [];
  //if is short  - show movies below 100min
  //if is long - show movies above 120min
  // if is normal - no more than 120min

  //     //with_runtime.gte
  // Filter and only include movies that have a runtime that is greater or equal to a value.

  // with_runtime.lte
  // Filter and only include movies that have a runtime that is less than or equal to a value.

  if (runtime_movie === "short") {
    var runtime_lte = 100; //runtime that is less than or equal to a value
    //console.log(runtime_lte);
    var runtimeUrl = "&with_runtime.lte=" + runtime_lte;
  }
  if (runtime_movie === "normal") {
    var runtime_gte = 100; //runtime that is greater or equal to a value
    var runtime_lte = 120; //runtime that is less than or equal to a value
    //.log(runtime_gte + " and " + runtime_lte);
    var runtimeUrl =
      "&with_runtime.gte=" + runtime_gte + "&with_runtime.lte=" + runtime_lte;
  }
  if (runtime_movie === "long") {
    var runtime_gte = 120; //runtime that is greater or equal to a value
    //console.log(runtime_gte);
    var runtimeUrl = "&with_runtime.gte=" + runtime_gte;
  }

  var moviesAPIUrl =
    APIUrl +
    "&with_genres=" +
    encodeURI(selectedGenres.join(",")) +
    "&primary_release_year=" +
    released_Year +
    runtimeUrl +
    APIKey;
  console.log(moviesAPIUrl);
  localStorage.setItem("moviesAPI", moviesAPIUrl);
  getMovies(moviesAPIUrl);
});

function getGenres() {
  genres.forEach(function (genre) {
    tag = $("<button></button>");
    tag.addClass("tag m-3 btn border border-dark");
    tag.id = genre.id;
    tag.text(genre.name);
    tag.on("click", function (event) {
      event.preventDefault();
      $(this).toggleClass("btn-danger");
      console.log($(this));
      if (selectedGenres.length === 0) {
        selectedGenres.push(genre.id);
      } else {
        if (selectedGenres.includes(genre.id)) {
          selectedGenres.forEach(function (id, idx) {
            if (id == genre.id) {
              // console.log(id);
              console.log(genre.id);
              // console.log(idx);

              selectedGenres.splice(idx, 1);
            }
          });
        } else {
          selectedGenres.push(genre.id);
        }
      }
      console.log(selectedGenres);
      console.log(
        APIUrl + "&with_genres=" + encodeURI(selectedGenres.join(","))
      );
    });

    tagsContainer.append(tag);
  });
  //(selectedGenres);
}

// makeMyNight(selectedGenres) {}

function getMovies(APIUrl) {
  //console.log(APIUrl);
  // fetch
  fetch(APIUrl)
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
  console.log("getMovieDetails");

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
      console.log(details);
      //console.log(details.runtime);
      runtimeStuff = details.runtime;
      var movieId = details.id;
      storeMovieIDs(movieId, runtimeStuff);
      // return details;
    });
  //console.log(runtimeStuff);
}

function storeMovieIDs(movieId, runtimeStuff) {
  console.log("storeMovieIds");

  //movieIdsArr.push(movieId);
  movieRunTimesArr.push(runtimeStuff);
  //console.log(movieIdsArr);
  console.log(movieRunTimesArr);
  for (var i = 0; i < movieRunTimesArr.length; i++) {
    var runtimeEl = $("#runtime-" + [i]);
    //console.log(runtimeEl);
    runtimeEl.text(movieRunTimesArr[i] + " min");
  }
}
/////////////
//title, date, subject, description
//APIUrl = APIUrl + WITHGenre + "16";

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

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

    // movieTitleEl.append(posterEl, titleEl);
    // movieContentEl.append(overviewEl, ratingEl);
    movieContainerEl.append(movieContentEl);
  }
  console.log("showMoviesForEnded");
}
