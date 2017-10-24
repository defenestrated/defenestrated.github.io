// alert("welcome to javascript!")

/*

document.getElementById("id_you_want")
document.getElementsByClassName("name_of_the_class")

document.querySelector("")
document.querySelectorAll("")

*/

var catImage = document.querySelector("#fixed img")
var relativebox = document.querySelector("#relative")

catImage.addEventListener("click", showpopup)
relativebox.addEventListener("click", printToConsole)


function printToConsole() {
	console.log("you clicked that one div")
	console.log(relativebox.style)
	relativebox.style.backgroundColor = "blue"
}


function showpopup() {
	alert("this is a popup")
}