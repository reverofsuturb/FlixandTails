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
  if (opSelected2 == 1) {
    getSavedDrink();
  } else {
    if (opSelected3 == 1) {
      getSavedMovie();
    }
  }
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
  var savedDrinkContentEl = document.createElement("div");

  //pull ingredients and measurements from api object

  var drinkIngMeas = [];
  for (i = 1; i < 15; i++) {
    var ingredienti = "arr[0].strIngredient" + i;
    var ingMeasurei = "arr[0].strMeasure" + i;
    // console.log(eval(ingredienti));
    //if there is data in that property, save it to array
    if (eval(ingredienti) != null) {
      //if there is no measurement data leave it out
      if (eval(ingMeasurei) != null) {
        drinkIngMeas[i - 1] =
          " " + eval(ingMeasurei) + " of " + eval(ingredienti);
      } else {
        drinkIngMeas[i - 1] = " " + eval(ingredienti);
      }
    }
  }
  //   console.log(drinkIngMeas);
  //get alcohol info
  var alcYN;
  if (arr[0].strAlcoholic == "Alcoholic") {
    alcYN = "Yes";
  } else if (arr[0].strAlcoholic == "Non alcoholic") {
    alcYN = "No";
  } else if (arr[0].strAlcoholic == "Optional alcohol") {
    alcYN = "Optional";
  }

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
            <p id="alc-type" class="">Contains alcohol?  ${alcYN}</p>
            <p id="glass-type" class="">Best served in a ${arr[0].strGlass}</p>
            <p id="ingredients" class="">Ingredients required:  ${drinkIngMeas}</p>
            <p id="Dinstructions" class = "">Instructions:  ${arr[0].strInstructions}</p>
          </div>
        </div>`;

  savedContainerEl.append(savedDrinkContentEl);
  if (opSelected3 == 1) {
    getSavedMovie();
  }
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

//make sure container is empty before adding new info
savedContainerEl.empty();

//get user picks from localStorage for beginning choices
opSelected1 = localStorage.getItem("dinnerYN");
opSelected2 = localStorage.getItem("drinkYN");
opSelected3 = localStorage.getItem("movieYN");

//condition decides which function to start with
if (opSelected1 == 1) {
  getsavedDinner();
} else if (opSelected1 == 0) {
  if (opSelected2 == 1) {
    getSavedDrink();
  } else if (opSelected2 == 0) {
    getSavedMovie();
  }
}

// getSavedDrink();
// getSavedMovie();
