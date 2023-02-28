var dropdownListEl = $("#themeDropdown");
var savedThemes = JSON.parse(localStorage.getItem("userThemes"));
console.log(savedThemes);

dropdownListEl.children().on("click", function (event) {
  themeName = event.target.textContent;
  var themeIndex = savedThemes.findIndex((theme) => theme.name === themeName);
  console.log(themeIndex);
  localStorage.setItem("finaldinner", savedThemes[themeIndex].foodURL);
  localStorage.setItem("finaldrink", savedThemes[themeIndex].drinkURL);
  localStorage.setItem("finalmovie", savedThemes[themeIndex].movieURL);

  //wait  half a second and go to Saved page
  setTimeout(() => {
    window.location.href = "Saved.html";
  }, 500);
});
