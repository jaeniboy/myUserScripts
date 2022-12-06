// ==UserScript==
// @name     			link-and-headline-grabber-and-translator
// @description   grabs url and h1 which is passed to google translate api then both copied to clipboard
// @version  			1
// @grant    			none
// @include       *
// ==/UserScript==

(function() {
  
  var url = "https://www.googleapis.com/language/translate/v2";
  var key = "YOUR_GOOGLE_API_KEY";
  var target_lang = "de"; // set target language
  var orig_lang = ""; // auto-detection if empty

  
  function copyToClipboard(text) { // copy to clibboard
    
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    	button.innerHTML = "kopiert und übersetzt ✓";
  }


  function getData() { // extract the data and send it to google translate API
    
    var orig_title = document.querySelector("h1").innerText;
    var current_url = window.location.href.toString();
    var domain_name = current_url.split("/")[2].replace("www.","");
    
    fetch(url + "?key=" + key + "&source=" + orig_lang + "&target=" + target_lang + "&q=" + encodeURIComponent(orig_title))
    	.then(res => res.json())
    	.then(data => data.data.translations[0].translatedText)
    	.then(new_title => copyToClipboard(domain_name + ": " + new_title + "\n" + current_url))
    
    //error handling coming soon

  }
  
  
  if (document.getElementsByTagName("h1").length > 0) { // h1 exists?
    
    // make button
    var button = document.createElement("Button");
    button.innerHTML = "kopieren und übersetzen";
    button.setAttribute ('id', 'getLinkAndTitleButton');
    button.addEventListener("click", getData, false);
    button.style.bottom = "20px";
    button.style.right = "50px";
    button.style.height = "50px";
    button.style.width = "200px";    
    button.style.position = "fixed";
    button.style.color = "black";
    button.style.backgroundColor = "#cdcdcd";
    button.style.fontFamily = "sans-serif";
    button.style.fontSize = "14px";
    button.style.padding = "3px";
    button.style.borderStyle = "none";
    button.style.borderRadius = "25px";
    button.style.zIndex = 99999999;
    button.style.cursor = "pointer";
    document.body.appendChild(button);

  }

})();
