// ==UserScript==
// @name          Metadaten Audiothek zu Digas
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Beispielscript, das eine Meldung mit dem Inhalt Hello World ausgibt.
// @include       http://aexpresso.swr.ard/sites/aexpresso_urlsearch.html
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

var templates = [ // Change value based on download url
  
  {
   	"id": "Der Gangster, der Junkie und die Hure", 
   	"selector": "https://avdlswr-a.akamaihd.net/swr3/podcasts-audioreihen/der-gangster-der-junkie-und-die-hure/",
   	"template": function(data=""){return "SPR: Pollux, Maximilian (ehem. Krimineller)\nSPR: Lemke, Roman (ehem. Drogenabhängiger)\nSPR: Titan, Tara (ehem. Prostituierte)\n"}
  },
  {
  	"id": "SWR3 Topthema",
  	"selector": "https://avdlswr-a.akamaihd.net/swr3/podcasts-audioreihen/topthemen/",
  	"template": function(data="") {return "AUT: " + data + "\nSPR: " + data + "\nOTG:\n"}
  },
  {
    "id":"Fünf Minuten vor dem Tod",
    "selector":"https://avdlswr-a.akamaihd.net/dasding/podcasts/5-minuten-vor-dem-tod-der-kriminalpodcast/",
    "template": function(data="") {return "SPR: Bleich, Luisa\nSPR: Schmidt, Joost\n"}
  },
  {
    "id":"",
    "selector": "YOUR SELECTOR",
    "template": function(data="") {return ""}
  }
]


function getElementByXpath(path) { // Xpath benutzen
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


function getMetadata() { // Metadaten abrufen
  
  var title = getElementByXpath("/html/body/div[1]/div[3]/table/tbody/tr[2]/td[2]/text()").data;
  var author = getElementByXpath("/html/body/div[1]/div[3]/table/tbody/tr[4]/td[2]/text()").data;
  var description = getElementByXpath("/html/body/div[1]/div[3]/table/tbody/tr[6]/td[2]/text()").data;
  var keywords = getElementByXpath("/html/body/div[1]/div[3]/table/tbody/tr[5]/td[2]/text()").data;
  
  
  var metadata = [
    title,
    author,
    description,
    keywords
  ]

  return(metadata)
  
}

function getFormedMetadata() { // Metadaten formatieren
 
  var rawmetadata = getMetadata()
  var url = document.getElementById("response").getElementsByTagName("div")[0].innerText;
  var template = "AUT: " + rawmetadata[1] + " \n"
  
  // wählen Template für Podcastreihe basierend auf der URL aus
 	for (var temp of templates){   
    if (url.includes(temp.selector)){ template = temp.template(rawmetadata[1]);}  
  }
 
  
  var formedmetadata = "++0\n" +
      "++1\n" +
      "BETI: " + rawmetadata[0] + " \n" +
      template +
      "ABS: " + rawmetadata[2].replace(/\n\s*\n/g, '\n') + " (PR-Text)\n" + 
      "HD: " + rawmetadata[3] 

  return(formedmetadata)
  
}

function submitMetadata() { // formatierte Metadaten ausgeben
	
  var response = getFormedMetadata()
  copyToClipboard(response)
  alert("Formatierte Metadaten in Zwischenablage")
}

var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Metadaten für Digas-Erfassung</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
zNode.addEventListener("click", submitMetadata, false);
document.body.appendChild (zNode);
