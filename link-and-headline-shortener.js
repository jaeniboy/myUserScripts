// ==UserScript==
// @name     			link-and-headline-shortener
// @description   grabs h1, domain-name and link of the current page and passes it to bit.ly then to clipboard
// @version  			1
// @grant    			none
// @include             *
// ==/UserScript==

(function() {

    // your bit.ly token and group ID here
  	var token = TOKEN
    var groupID = GROUPID

    function sendToShortener(url) { // send url to bit.ly api to get shortened link

        var payload = {
            "group_guid": groupID,
            "domain": "bit.ly",
            "long_url": url
        }

        fetch("https://api-ssl.bitly.com/v4/shorten", {

            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'},
            body: JSON.stringify(payload)

        }).then(response => response.json())
          .then(data => copyToClipboard(getHeadline() + "\n" + data.link + " (Quelle: " + getDomain() + ")")) // when finished copy text to clipboard

    }

    function getDomain() { // extract domain name out of url

        var current_url = window.location.href.toString();
        var domain_name = current_url.split("/")[2].replace("www.","");
        return domain_name

    }

    function getHeadline() { // grab headline if exists


        var res = "";
        try {
            res = document.querySelector("h1").innerText;
        } catch (error) {
            res = "No h1-tag found!";
        }
        return res

    }

    function copyToClipboard(text) { // copy text to clibboard and change button

        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        button.innerHTML = "in Zwischenablage ✓";
    }

    function grabLink() { // just another wrapper function

        sendToShortener(window.location.href.toString())

    }


    var button = document.createElement("button");
        button.innerHTML = "Link kürzen";
        button.setAttribute ('id', 'myshortenLink');
        button.addEventListener("click", grabLink, false);
        button.style.bottom = "20px";
        button.style.right = "50px";
        button.style.height = "50px";
        button.style.width = "200px";
        button.style.position = "fixed";
        button.style.color = "black";
        button.style.backgroundColor = " #00c0d3";
        button.style.fontFamily = "sans-serif";
        button.style.fontSize = "14px";
        button.style.padding = "3px";
        button.style.borderStyle = "none";
        button.style.borderRadius = "25px";
        button.style.zIndex = 99999999;
        button.style.cursor = "pointer";
        document.body.appendChild(button);

})();
