var thething = document.querySelector("h1");

console.log(thething)

thething.addEventListener("click", clickyfunstuff);


function clickyfunstuff() {
	
	var paragraph = document.querySelector(".output p");

	paragraph.innerHTML = "hello <strong>tiffany</strong>, it works";

	var trigger = document.querySelector(".output p strong")
	console.log(trigger)

	trigger.addEventListener("click", addImage);

	console.log("it works!!!!");
}

function addImage() {
	var output = document.querySelector(".output");

	console.log(output)

	var catpicture = document.createElement("img")

	catpicture.src = "images/grumpy-cat.jpg";
	catpicture.id = "cat";

	console.log(catpicture);

	output.appendChild(catpicture);

	catpicture.addEventListener("click", 
		function(){
			document.querySelector("#cat").remove();
		}
	);
}








