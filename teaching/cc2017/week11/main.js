var hipsterstring = "Mixtape tbh taxidermy schlitz DIY meh, tumblr trust fund shoreditch gochujang paleo palo santo. Kickstarter humblebrag kale chips celiac, vaporware gastropub migas post-ironic gluten-free snackwave synth slow-carb."
// console.log(hipsterstring)

var hipArray = hipsterstring.split(" ")
// console.log(hipArray)

// var newstring = hipArray.join("PUPPY")
// console.log(newstring)


var tupperware = document.querySelector(".output")

// console.log(tupperware)

// var word1 = document.createElement("p")
// word1.textContent = hipArray[0]
// tupperware.appendChild(word1)

// var word2 = document.createElement("p")
// word2.textContent = hipArray[1]
// tupperware.appendChild(word2)

// var word3 = document.createElement("p")
// word3.textContent = hipArray[2]
// tupperware.appendChild(word3)


hipArray.forEach(buildboxes);

function buildboxes(individual, number) {


	var box = document.createElement("div")
	var image = document.createElement("img")
	var caption = document.createElement("p")

	box.classList.add("catwrapper")

	box.id = "cat" + number



	image.src="images/grumpy-cat.jpg"

	caption.textContent = individual

	box.appendChild(image)
	box.appendChild(caption)


	tupperware.appendChild(box)
}


var listOfCats = document.querySelectorAll(".catwrapper")

console.log(listOfCats)


listOfCats.forEach(listen)

function listen(el, ix) {
	el.addEventListener("click", changecolor)
}

function changecolor(event) {
	console.log(event.target.id)

	var thingtochange = document.querySelector("#" + event.target.id)

	if (thingtochange.classList.contains("clicked")) {
		thingtochange.classList.remove("clicked")
	}
	else {
		thingtochange.classList.add("clicked")
	}

}


// var first = document.querySelector("#cat0")
// first.addEventListener("click", dostuff)




// for(var i = 0; i < nameArray.length; i++) {
// 	console.log(nameArray[i])
// }

// nameArray.forEach(function(theElement, itsIndex, theOriginalArray) {
// 	console.log(theElement + " is in position " + itsIndex)
// })


// nameArray.forEach(make_a_list);

// function make_a_list(el, ix) {
// 	var listItem = document.createElement("li")

// 	listItem.textContent = el + ": index " + ix

// 	container.appendChild(listItem)
// }


var names = document.querySelectorAll(".output ul li")
// console.log(names)


names.forEach(changeBackground)

function changeBackground(el) {
	el.style.backgroundColor = "rgba(0,0,255," + Math.random() + ")";
}













// somethingFancy("pleather")
// somethingFancy("velour")
// somethingFancy("glitter")
// somethingFancy(6)
// somethingFancy(["one", 2, "nine"])


// function somethingFancy(aFancyThing) {
// 	console.log(aFancyThing)
// }

// addFive(6)

// function addFive(incomingNumber) {
// 	var finalNumber = incomingNumber + 5
// 	console.log(finalNumber)
// }


// function addJess(incomingString) {
// 	var finalText = incomingString + " jess"
// 	console.log(finalText)
// }








