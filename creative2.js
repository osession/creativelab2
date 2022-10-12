/*global fetch */
document.getElementById("mealInput").addEventListener("keyup", function(event) {
  event.preventDefault();
  
  const value = document.getElementById("mealInput").value;
  if (value === "")
    return;
  console.log(value);
  
  const myurl = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + document.getElementById("mealInput").value;
  fetch(myurl)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      const everything = document.createElement("ul");
      for (let i = 0; i < json.meals.length; i++) {
        const value = json.meals[i].strMeal;
        const item = document.createElement("li");
        item.appendChild(document.createTextNode(value));
        everything.appendChild(item);
      };
                
      const txtHint = document.getElementById("txtHint");
      txtHint.textContent = "";
      txtHint.appendChild(everything);
    });
});


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
      //console.log(json);
      let results = "";
      results += "<div id=\"div1\">";
      results += '<h2>Ingredients in ' + json.meals[0].strMeal + "</h2>"; 
      //console.log(results);
      
      let ingredients = "";
      for (let i = 1; i < 21; i++) {
        let objectName = "strIngredient" + i;
        //console.log(objectName);
        if (json.meals[0][objectName] === "" || json.meals[0][objectName] === null) {
          break;
        } 
        ingredients += "<br>" + json.meals[0][objectName] + "</br>";
      } 
      //console.log(ingredients);
      document.getElementById("ingredientResults").innerHTML = ingredients;
      
      let measures = "";
      for (let i = 1; i < 21; i++) {
        let objectName = "strMeasure" + i;
        if (json.meals[0][objectName] === "" || json.meals[0][objectName] === null || json.meals[0][objectName] === " ") {
          break;
        }
        measures += "<br>" + json.meals[0][objectName] + "</br>";
      }
      //console.log(measures)
      document.getElementById("measurementResults").innerHTML = measures;
      
      let instructions = ""
      instructions += json.meals[0].strInstructions;
      document.getElementById("instructionResults").innerHTML = instructions;
    });
});