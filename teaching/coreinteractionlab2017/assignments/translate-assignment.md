#assignment: two-way translation

*deliverable:* link to the assignment live on your github emailed to me  
*due on:* **9am on tuesday, March 28**

---

###**goal:** update the ASL "translator" example we built in class last week to...
1. accommodate any number of letters typed in the text field
2. highlight the images that correspond to what's typed in the text field
3. setup interaction so that users can spell out words by clicking on images (and output the result)

---
###how to get started:
1. Pull the latest changes to [the CI Lab repository](https://github.com/AditiSurana/Core-Interaction) by either:
   - using terminal to `cd` into your local copy of the repository and then typing `git pull`
   - selecting the repository in github desktop and going to **Repository > Pull** or its keyboard shortcut, **cmd+shift+F**
2. replace the four hard-coded div-image combinations with a grid of 26 divs, one for each letter
   - hint: you can make an array of letters by starting with a string and making an array:
   
```javascript
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var letter_array = [];
for(i = 0; i < alphabet.length; i++) {
    letter_array.push(alphabet[i]);
}
```
something
