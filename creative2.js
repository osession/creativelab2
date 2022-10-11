/* global fetch */

document.getElementById("mealSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("mealInput").value;
  if (value === "")
    return;
  console.log(value);
  let searchKey = value.replaceAll(" ", "_");
  console.log(searchKey);
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchKey + "&APPID=1";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {	
      console.log(json);
      let results = "";
      results += "<div id=\"div1\">";
      results += '<h2>Ingredients in ' + json.meals[0].strMeal + "</h2>"; 
      console.log(results);
      
      let ingredients = "";
      for (let i = 1; i < 21; i++) {
        let objectName = "strIngredient" + i;
        console.log(objectName);
        if ((json.meals[0][objectName]) === "" || (json.meals[0][objectName]) === null) {
          break;
        } 
        ingredients += "<br>" + (json.meals[0][objectName]); + "</br>";
      } 
      console.log(ingredients);
    });
});