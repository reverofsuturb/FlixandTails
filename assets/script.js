var APIKey = "a68b28f687a6fab289f2323167117c84";
//ffxiv api key
var APPID = "8422820f";

var mealType = ["", "breakfast", "brunch", "lunch/dinner", "snack", "teatime"];

var dishType = [
  "",
  "biscuits and cookies",
  "bread",
  "cereals",
  "condiments and sauces",
  "desserts",
  "drinks",
  "egg",
  "ice cream and custard",
  "main course",
  "pancake",
  "pasta",
  "pastry",
  "pies and tarts",
  "pizza",
  "preps",
  "preserve",
  "salad",
  "sandwiches",
  "seafood",
  "side dish",
  "soup",
  "special occasions",
  "starter",
  "sweets",
];
var cuisineType = [
  "",
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
  "korean",
  "kosher",
  "mediterranean",
  "nordic",
  "south american",
  "south east asian",
  "world",
];

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

$("#fquery").on("click", function () {
  getrecipe();
});

function getrecipe() {
  var foodrequest =
    "https://api.edamam.com/api/recipes/v2?type=public&app_id=8422820f&app_key=a68b28f687a6fab289f2323167117c84&cuisineType=" +
    $("#cuisine :selected").text() +
    "&mealType=" +
    $("#meal :selected").text() +
    "&dishType=" +
    $("#dish :selected").text();
  fetch(foodrequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.hits[2].recipe.label)
      for (var i = 0; i < data.hits.length; i++) {
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td");
        var link = document.createElement("a");
        var ingredientlist = document.createElement("p");
        
        link.textContent = data.hits[i].recipe.label;
        link.href = data.hits[i].recipe.url;
        ingredientlist.textContent = data.hits[i].recipe.ingredientLines;
        tableData.append(link);
        tableData.append(ingredientlist);
        createTableRow.append(tableData);
        $("#foodrecs").append(createTableRow);
      }
    });
}
