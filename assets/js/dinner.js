//api keys https://developer.edamam.com/edamam-docs-recipe-api
var dinnerAPIKey = "a68b28f687a6fab289f2323167117c84";
var dinnerAPPID = "8422820f";
// variable declarations
var foodsearch = $("#foodsearch");
var inginp = $("#ingredientinp");
var ingadd = $("#ingredientadd");
var ingbox = $("#ingredientbox");

// arrays for the dropdown menus
var mealType = [
  "Meal Type",
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "teatime",
];

var dishType = [
  "Dish Type",
  "bread",
  "condiments and sauces",
  "desserts",
  "main course",
  "salad",
  "sandwiches",
  "soup",
  "starter",
];

var cuisineType = [
  "Cuisine",
  "american",
  "asian",
  "british",
  "caribbean",
  "central europe",
  "chinese",
  "eastern europe",
  "french",
  "greek",
  "indian",
  "italian",
  "japanese",
  "kosher",
  "mediterranean",
  "mexican",
  "nordic",
  "south american",
  "south east asian",
];

// populates the dropdown menus with the arrays
var dishDropdown = $("#dish");
$.each(dishType, function (val, text) {
  dishDropdown.append($("<option></option>").val(val).html(text));
});

var mealDropdown = $("#meal");
$.each(mealType, function (val, text) {
  mealDropdown.append($("<option></option>").val(val).html(text));
});

var cuisineDropdown = $("#cuisine");
$.each(cuisineType, function (val, text) {
  cuisineDropdown.append($("<option></option>").val(val).html(text));
});

//  conditional to create the proper request url, uses if statements comparing the index value to see if more text needs to be added to the url, saved to local storage to be used by results page
function saverecipe() {
  $("#foodrecs").empty();
  var foodrequest =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    $("#ingredientbox")
      .children()
      .text()
      .replace(/Remove/g, "%20") +
    "&app_id=8422820f&app_key=a68b28f687a6fab289f2323167117c84";
  if ($("#cuisine :selected")[0].value != 0) {
    foodrequest +=
      "&cuisineType=" + $("#cuisine :selected").text().replace(/ /g, "%20");
  }
  if ($("#meal :selected")[0].value != 0) {
    foodrequest +=
      "&mealType=" + $("#meal :selected").text().replace(/ /g, "%20");
  }
  if ($("#dish :selected")[0].value != 0) {
    foodrequest +=
      "&dishType=" + $("#dish :selected").text().replace(/ /g, "%20");
  }
  console.log(foodrequest);
  localStorage.setItem("foodresult", foodrequest);
}
// event listener for save recipe
$("#dinner-next").on("click", function () {
  saverecipe();
});

//adds ingredients when clicking button next to search bar

ingadd.on("click", function () {
  var finput = inginp.val();
  var tableData = document.createElement("td");
  var removebtn = document.createElement("button");
  var createTableRow = document.createElement("tr");

  $(".dinnerType").children("input").val("");

  tableData.textContent = finput;
  tableData.setAttribute("class", "fquery");
  createTableRow.setAttribute("id", "tr");
  removebtn.textContent = "Remove";
  removebtn.setAttribute("id", "removeitem");
  removebtn.setAttribute("class", "btn form-btn btn-outline-secondary");

  createTableRow.append(tableData);
  createTableRow.append(removebtn);
  $("#ingredientbox").append(createTableRow);
  console.log($("#ingredientbox").children().text());
});

//remove button for the ingredient box
$("#ingredientbox").on("click", function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  if (!event.target.matches("button")) return;
  console.log(event.target);
  $(event.target).parent().remove();
});
//event delegation -- you can't bind an event listener to an element that doesn't exist on page load

// random dinner query for im feeling lucky button
function dinnerlucky() {
  var mealType2 = ["breakfast", "lunch", "dinner"];

  var dishType2 = ["main course", "salad", "sandwiches", "soup", "starter"];

  var cuisineType2 = [
    "american",
    "asian",
    "british",
    "chinese",
    "french",
    "greek",
    "indian",
    "italian",
    "japanese",
    "mediterranean",
    "mexican",
  ];
  var mealrandom = mealType2[Math.floor(Math.random() * mealType2.length)];
  var dishrandom = dishType2[Math.floor(Math.random() * dishType2.length)];
  var cuisinerandom =
    cuisineType2[Math.floor(Math.random() * cuisineType2.length)];
  var mealrandom = mealType2[Math.floor(Math.random() * mealType2.length)];
  var dishrandom = dishType2[Math.floor(Math.random() * dishType2.length)];
  var cuisinerandom =
    cuisineType2[Math.floor(Math.random() * cuisineType2.length)];
  console.log(mealrandom);
  console.log(dishrandom);
  console.log(cuisinerandom);

  var dinnerrandom =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=8422820f&app_key=a68b28f687a6fab289f2323167117c84" +
    "&cuisineType=" +
    cuisinerandom.replace(/ /g, "%20") +
    "&mealType=" +
    mealrandom.replace(/ /g, "%20") +
    "&dishType=" +
    dishrandom.replace(/ /g, "%20");

  fetch(dinnerrandom)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.hits[Math.floor(Math.random() * 20)]._links.self.href);
      localStorage.setItem(
        "finaldinner",
        data.hits[Math.floor(Math.random() * 20)]._links.self.href
      );
      console.log(localStorage.getItem("finaldinner"));
    });

  // console.log(dinnerrandom);
  // console.log(localStorage.getItem("finaldinner"));

  localStorage.setItem("randomdinner", dinnerrandom);
  console.log(dinnerrandom);
}
$("#lucky").on("click", dinnerlucky);

// grabs the query for saved selection/final results

$("#dinner-container").on("click", function (event) {
  var foodID = event.target.previousSibling.previousSibling.innerHTML;
  localStorage.setItem("finaldinner", foodID);
  console.log(foodID);
});

// solution: bind to parent element that exists and traverse down the DOM (event.target.matches) works best in this case
//
//
// displayResults.js functions below****

// get recipe do not include****

// function getrecipe() {
//   var foodshow = localStorage.getItem("foodresult")
//     fetch(foodshow)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(foodrequest.replace(/%20/g, ""));
//         console.log(data);
//         showDinner(data);
//       }
//   )}

// get random recipe do not include****

// function getreciperand() {
//   var foodshow = localStorage.getItem("randomdinner")
//     fetch(foodshow)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//         showDinner(data);
//       }
//   )}

// display results function do not include****

// var dinnerContainerEl = $("#dinner-container");

// function showDinner(data) {
//   dinnerContainerEl.empty();

//   for (let i = 0; i < 5; i++) {
//     var dinnerContentEl = document.createElement("div");
//     console.log(data[i].id);

//     dinnerContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
//           <div id="poster" class="col-md-2">
//             <img
//               id="food-img"
//               src="${data.hits[i].recipe.image}"
//               class="img-fluid"
//             />
//           </div>
//           <div id="food-content" class="col-md-10 p-5">
//             <h2 id="food-name" class="display-5 col-md-9">${data.hits[i].recipe.label}</h2>
//             <p id="ingredients" class="">${data.hits[i].recipe.ingredientLines}</p>
//           </div>
//         </div>`;

//     dinnerContainerEl.append(dinnerContentEl);
//           }
//         }

// function for final results page/saved page

// var saveddinnerContainerEl = $("#saveddinner-container");

// function getsavedDinner(data) {

//   var saveddinnershow = localStorage.getItem("finaldinner")
//     fetch(saveddinnershow)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(foodrequest.replace(/%20/g, ""));
//         console.log(data);
//         showsavedDinner(data);
//       }
//   )}

// function showsavedDinner() {

//   saveddinnerContainerEl.empty();

//     var saveddinnerContentEl = document.createElement("div");
//     console.log(data[i].id);

//     saveddinnerContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
//           <div id="poster" class="col-md-2">
//             <img
//               id="food-img"
//               src="${data.recipe.image}"
//               class="img-fluid"
//             />
//           </div>
//           <div id="food-content" class="col-md-10 p-5">
//             <h2 id="food-name" class="display-5 col-md-9">${data.recipe.label}</h2>
//             <p id="ingredients" class="">${data.recipe.ingredientLines}</p>
//             <a id="link" href="${data.recipe.url}" class="display-5 col-md-9">View Full Recipe</a>
//           </div>
//         </div>`;

//     saveddinnerContainerEl.append(saveddinnerContentEl);
//           }

// dinner error function if array shows up with 0 results

// getrecipe();

// function getrecipe() {
//   var foodshow = localStorage.getItem("foodresult");
//   fetch(foodshow)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       if (data.length < 2) {

//       } else {}
//       showDinner(data);
//     });
// }

// var dinnerContainerEl = $("#dinner-container");

// function showDinnerError() {
//   dinnerContainerEl.empty();

//   var dinnerContentEl = document.createElement("div");

//     dinnerContentEl.innerHTML = `<div class="movie-card d-flex flex-row m-3 border border-3 border-light rounded-2">
//     <div id="poster" class="col-md-2">
//     <img
//     id="food-img"
//     src="assets/Images/sarah-kilian-icecream-unsplash.jpg"
//     class="img-fluid"
//     />
//     </div>
//     <div id="food-content" class="col-md-10 p-5">
//     <h2 id="food-name" class="display-5 col-md-9">We're Sorry your results were inconclusive, please try different parameters and try again, please go back to search!</h2>

//     </div>
//     </div>`;

//     dinnerContainerEl.append(dinnerContentEl);
//   }
