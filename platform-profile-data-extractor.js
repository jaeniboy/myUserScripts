// ==UserScript==
// @name     platform-profile-data-extractor
// @description   excracts data (e.g. titles, followers, links) from platform profiles on facebook, insta, twitter and youtube to c&p them directly to an excel-file 
// @version  1
// @grant    none
// @include  https://www.facebook.com/groups/*
// @include  https://www.instagram.com/*
// @include  https://twitter.com/*
// @include  https://www.youtube.com/*
// ==/UserScript==



(function() {
  
  // get full pagelink
  var pagelink = window.location.href.toString();
  var domain_name = "";
  
  // define data-selectors here
  var queries = {

    Facebook: {
        title:    function(){return(document.querySelector("h1 a").innerText)},
        follower: function(){return(document.getElementsByClassName("x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz xt0b8zv xi81zsa x1s688f")[0].innerText)}
      },
    Twitter: {
        title:    function(){return("@" + pagelink.split(/[/?]/)[3])},
        follower: function(){return(document.getElementsByClassName("css-4rbku5 css-18t94o4 css-901oao r-18jsvk2 r-1loqt21 r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0")[1].innerText)}
      },
    Instagram: {
        title:    function(){return("@" + pagelink.split(/[/?]/)[3])},
        follower: function(){return(document.getElementsByClassName("_aacl _aacp _aacu _aacx _aad6 _aade")[1].innerText)}
      },
    Youtube: {
      	title:    function(){return(document.getElementById("channel-name").innerText)},
      	follower: function(){return(document.getElementById("subscriber-count").innerText)}
    }
  }

  // check, which platform we're on

  if (/facebook.com/.test(pagelink))
  	{domain_name = "Facebook"}
  else if (/twitter.com/.test(pagelink))
  	{domain_name = "Twitter"}
  else if (/instagram.com/.test(pagelink))
    {domain_name = "Instagram"}
  else if (/youtube.com/.test(pagelink))
  	{domain_name = "Youtube"}
  else {domain_name = "undefined"}


  function getMetadata() { // get the data using the selectors

      var type = domain_name;
      var title = queries[domain_name].title()
      var empty = "";
      var link = pagelink;
      var follower = queries[domain_name].follower();

      var metadata = [
        type,
        title,
        empty,
        follower,
        link
      ]

      return(metadata)

    }

  function formatMetadata(arr) { // transform data to html table

    var response = "<tr>";
    for (i in arr) {
      var response = response + "<td>" + arr[i] + "</td>";
    }
    var response = response + "</tr>";

    return(response)

  }

  function tableToClipboard(table) { // copy html table to clipboard

    //make temporary html table
    var dummy = document.createElement("table");
    document.body.appendChild(dummy);
    dummy.innerHTML = table;

    var urlField = document.querySelector('table');
    // create a Range object
    var range = document.createRange();  
    // set the Node to select the "range"
    range.selectNode(urlField);
    // add the Range to the set of window selections
    window.getSelection().addRange(range);

    // execute 'copy', can't 'cut' in this case
    document.execCommand('copy');

    //remove temporary html table
    document.body.removeChild(dummy);
  }

  function submitMetadata() { // start copying and change button 

    var data = getMetadata();
    var data = formatMetadata(data);
    tableToClipboard(data);

    button.innerHTML="Profildaten kopiert ✓";

  }

      // make a button
  var button = document.createElement("Button");
      button.innerHTML = "Profildaten kopieren";
      button.setAttribute ('id', 'getProfileDataButton');
      button.addEventListener("click", submitMetadata, false);
  
      //set styles
      button.style.bottom = "80px";
      button.style.right = "50px";
      button.style.height = "50px";
      button.style.width = "200px";    
      button.style.position = "fixed";
      button.style.color = "white";
      button.style.backgroundColor = "#d35400";
      button.style.fontFamily = "sans-serif";
      button.style.fontSize = "16px";
      button.style.padding = "3px";
      button.style.borderStyle = "none";
      button.style.borderColor = "gray";
      button.style.borderRadius = "30px";
      button.style.zIndex = 99999999;
      button.style.cursor = "pointer";
  
      // bin button element to document
      document.body.appendChild(button);

})();
