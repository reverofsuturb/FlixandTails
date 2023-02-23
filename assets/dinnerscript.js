var APIKey = "a68b28f687a6fab289f2323167117c84";
var APPID = "8422820f";

//api keys https://developer.edamam.com/edamam-docs-recipe-api

var foodsearch = $("#foodsearch");

//selects food user input box

$("#search").on("click", function () {
  event.preventDefault;
  getrecipe();
});

// event listener for the search button

var mealType = [
  null,
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "teatime",
];

var dishType = [
  null,
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
  null,
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

// arrays for the dropdown menus

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

// populates the dropdown menus with the arrays

$("#fquery").on("click", function () {
  getrecipe();
});
// event listener for the search button

function getrecipe() {
  $("#foodrecs").empty();
  var foodrequest =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    foodsearch.val() +
    "&app_id=8422820f&app_key=a68b28f687a6fab289f2323167117c84";
console.log($("#cuisine :selected")[0].value != 0);
  if ($("#cuisine :selected")[0].value !=0) {
    foodrequest +=
      "&cuisineType=" + $("#cuisine :selected").text().replace(/ /g, "%20");
  } if ($("#meal :selected")[0].value !=0) {
    foodrequest +=
      "&mealType=" + $("#meal :selected").text().replace(/ /g, "%20");
  } if ($("#dish :selected")[0].value !=0) {
    foodrequest +=
      "&dishType=" + $("#dish :selected").text().replace(/ /g, "%20");
  }
  // conditional to create the proper request url, uses if statements comparing the index value to see if more text needs to be added to the url
    console.log(foodrequest)
    fetch(foodrequest)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(foodrequest.replace(/%20/g, ""));
        console.log(data);
        for (var i = 0; i < data.hits.length; i++) {
          var createTableRow = document.createElement("tr");
          var tableData = document.createElement("td");
          var link = document.createElement("a");
          var ingredientlist = document.createElement("p");
          var foodimage = document.createElement("img");

          foodimage.src = data.hits[i].recipe.image;
          link.textContent = data.hits[i].recipe.label;
          link.href = data.hits[i].recipe.url;
          ingredientlist.textContent = data.hits[i].recipe.ingredientLines;

          tableData.append(link);
          tableData.append(foodimage);
          tableData.append(ingredientlist);
          createTableRow.append(tableData);
          $("#foodrecs").append(createTableRow);
        }
      });
  }
// creates a table of images based on user input