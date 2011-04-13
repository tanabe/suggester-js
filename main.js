window.onload = function() {
  var suggester = new Suggester();
  suggester.initialize(list);

  var userInput = document.getElementById("userInput");
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
          userInput.value = this.innerHTML;

        };
        suggestions.appendChild(item);
      }

      //show
      suggestions.style.display = "block";
    } else {
      //hide
      hideSuggestions();
    }
  }

  var hideSuggestions = function() {
    suggestions.style.display = "none";
  };

  var search = function() {
    if (lastWord !== userInput.value) {
      var list = suggester.search(userInput.value);
      showSuggestions(list);
      lastWord = userInput.value;
    }
  }

  //polling
  var polling;
  var closeTimer;
  polling = setInterval(search, 500);

  /*
  userInput.onblur = function() {
    closeTimer = setInterval(hideSuggestions, 500);
    //hideSuggestions();
    lastWord = "";
    clearInterval(polling);
  };

  userInput.onfocus = function() {
    clearInterval(closeTimer);
    polling = setInterval(search, 500);
    search();
  };
  */

};
