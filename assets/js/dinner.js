//api keys https://developer.edamam.com/edamam-docs-recipe-api
var dinnerAPIKey = "a68b28f687a6fab289f2323167117c84";
var dinnerAPPID = "8422820f";
var foodsearch = $("#foodsearch");
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

$("#dinner-next").on("click", function () {
  saverecipe();
});

var inginp = $("#ingredientinp");
var ingadd = $("#ingredientadd");
var ingbox = $("#ingredientbox");

ingadd.on("click", function () {
  var finput = inginp.val();
  var tableData = document.createElement("td");
  var removebtn = document.createElement("button");
  var createTableRow = document.createElement("tr");

  $('.dinnerType').children('input').val('')

  tableData.textContent = finput;
  tableData.setAttribute("class", "fquery");
  createTableRow.setAttribute("id", "tr");
  removebtn.textContent = "Remove";
  removebtn.setAttribute("id", "removeitem");
  removebtn.setAttribute("class", "btn form-btn btn-outline-secondary");

  createTableRow.append(tableData);
  createTableRow.append(removebtn);
  $("#ingredientbox").append(createTableRow);
  console.log($("#ingredientbox").children().text())
});

$("#ingredientbox").on("click", function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  if (!event.target.matches("button")) return;
  console.log(event.target);
  $(event.target).parent().remove();
});


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
//               src="${IMGUrl + data.hits[i].recipe.image}"
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
