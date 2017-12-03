var textbox = document.querySelector("#chatbox")
console.log(textbox) // this is your <input> element


var possibilities = ["hi", "hello", "hey", "sup"] // array of possibile responses


textbox.addEventListener("keydown", handle_input)


function handle_input(e) {
  // note that event handler functions are always passed the Event object (in this case i'm putting it in a variable called e)
  if (e.keyCode === 13) {
    // ^ only pay attention to the enter key

    console.log("the event object:", e) // this is the whole Event object
    // if you look at it in the console, you'll see that what you're looking for is:
    // Event (the Event object) > target (the HTML element) > value (what's been typed into it)
    // you tunnel into object properties in JS with the ".":
    console.log("the value of #chatbox:", e.target.value)

    // since you're going to be doing multiple things with it, maybe store it in a variable:
    var incomingmsg = e.target.value // note that this is scoped within the handle_input function

    if ( possibilities.includes(incomingmsg.toLowerCase()) ) {
      respond("well hello there")
    }
    else {
      respond("i don't know what that means")
    }

    textbox.value = "" // clear the textbox (if you want)
  }
}

function respond(responsemsg) {
  console.log("response:", responsemsg)
}
