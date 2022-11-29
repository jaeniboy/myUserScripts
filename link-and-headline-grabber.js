// ==UserScript==
// @name     			link-and-headline-grabber
// @description   grabs h1, domain-name and link of the current page and passes it to the clipboard
// @version  			1
// @grant    			none
// @include  			*
// ==/UserScript==



(function() {

  
  function copyToClipboard(text) { // copy to clibboard
    
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }


  function getData() { // extract the data
    
    var title = document.querySelector("h1").innerText;
    var current_url = window.location.href.toString();
    var domain_name = current_url.split("/")[2].replace("www.","");
    var formed_data = domain_name + ": " + title + "\n" + current_url;

    var metadata = [
      title,
      current_url,
      domain_name
    ]

    return(formed_data)

  }

  function submitData() { // get data by click and change button

    var response = getData()
    copyToClipboard(response)
    button.innerHTML = "Kopiert ✓";
    
  }
  
  
  if (document.getElementsByTagName("h1").length > 0) { // h1 exists?
    
    // make button
    var button = document.createElement("Button");
    button.innerHTML = "Link und Seitentitel kopieren";
    button.setAttribute ('id', 'getLinkAndTitleButton');
    button.addEventListener("click", submitData, false);
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
