var savedContainerEl = $("#final-results-container");
function getsavedDinner() {
  var saveddinnershow = localStorage.getItem("finaldinner");
  fetch(saveddinnershow)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(foodrequest.replace(/%20/g, ""));
      console.log(data);
      console.log(data.recipe.image);
      console.log(data.recipe.url);
      showsavedDinner(data);
    });
}
function showsavedDinner(data) {
  var saveddinnerContentEl = document.createElement("div");
  var IMGUrl =
    (saveddinnerContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
          <div id="poster" class="col-md-2">
            <img
              id="food-img"
              src="${data.recipe.image}"
              class="img-fluid"
            />
          </div>
          <div id="food-content" class="col-md-10 p-5">
            <h2 id="food-name" class="display-5 col-md-9">${data.recipe.label}</h2>
            <p id="ingredients" class="">${data.recipe.ingredientLines}</p>
            <a id="link" href="${data.recipe.url}" class="display-5 col-md-9">View Full Recipe</a>
          </div>
        </div>`);

  savedContainerEl.append(saveddinnerContentEl);
  getSavedDrink();
}
function getSavedDrink() {
  var savedDrinkShow = localStorage.getItem("finaldrink");
  console.log(savedDrinkShow);
  fetch(savedDrinkShow)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showSavedDrink(data.drinks);
    });
}
function showSavedDrink(arr) {
  //   savedContainerEl.empty();

  var savedDrinkContentEl = document.createElement("div");

  savedDrinkContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
          <div id="poster" class="col-md-2">
            <img
              id="drink-img"
              src="${arr[0].strDrinkThumb}"
              class="img-fluid"
            />
          </div>
          <div id="food-content" class="col-md-10 p-5">
            <h2 id="food-name" class="display-5 col-md-9">${arr[0].strDrink}</h2>
            <p id="glass-type" class="">Best served in a ${arr[0].strGlass}</p>
            <p id="Dinstructions" class = "">Instructions:  ${arr[0].strInstructions}</p>
            <p id="ingredients" class="">${arr[0].strDrink}</p>
            <a id="link" href="${arr[0].strDrink} class="display-5 col-md-9">View Full Recipe</a>
          </div>
        </div>`;

  savedContainerEl.append(savedDrinkContentEl);
  getSavedMovie();
}
function getSavedMovie() {
  var savedMovieShow = localStorage.getItem("finalmovie");
  console.log(savedMovieShow);
  fetch(savedMovieShow)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      showSavedMovie(data);
    });
}
function showSavedMovie(data) {
  var savedMovieContentEl = document.createElement("div");
  var IMGUrl = "https://image.tmdb.org/t/p/w500";
  savedMovieContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
  <div id="poster" class="col-md-2">
  <img
  id="movie-poster"
  src="${IMGUrl + data.poster_path}"
  class="img-fluid"
  />
  </div>
  <div id="movie-content" class="col-md-10 p-5">
  <h2 id="movie-name" class="display-5 col-md-9">${data.title}</h2>
  <p id="runtime-${data.runtime}" class="">${"runtime"}</p>
  <p id="overview" class="">${data.overview}</p>
  <h3 id="rating" class="mb-3">Rating<span class="rating">${
    data.vote_average
  }</span></h3>
  </div>
  </div>`;

  savedContainerEl.append(savedMovieContentEl);
}

savedContainerEl.empty();
getsavedDinner();
// getSavedDrink();
// getSavedMovie();
