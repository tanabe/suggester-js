window.onload = function() {
  var suggester = new Suggester();
  suggester.initialize(list);

  var input = document.getElementById("userInput");
  var suggestions = document.getElementById("suggestions");
  var lastWord = "";

  var showSuggestions = function(list) {
    while (suggestions.hasChildNodes()) {
      suggestions.removeChild(suggestions.firstChild);
    }
    if (list.length > 0) {
      //create list
      var html = "";
      for (var i = 0, length = list.length; i < length; i++) {
        var item = document.createElement("li")
        item.innerHTML = list[i];
        item.onclick = function() {
          input.value = this.innerHTML;

        };
        suggestions.appendChild(item);
      }

      //show
      suggestions.style.display = "block";
    } else {
      //hide
      suggestions.style.display = "none";
    }
  }

  //polling
  var polling = setInterval(function() {
    if (lastWord !== input.value) {
      var list = suggester.search(input.value);
      showSuggestions(list);
      lastWord = input.value;
    }
  }, 500);
};
