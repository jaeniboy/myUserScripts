// ==UserScript==
// @name          Metadaten Audiothek zu Digas
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Beispielscript, das eine Meldung mit dem Inhalt Hello World ausgibt.
// @include       http://aexpresso.swr.ard/sites/aexpresso_urlsearch.html
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

const templates = [ // Change value based on download url
  {
    "id": "Standard",
    "selector:": "",
    "template": function(title="",author="",description="",keywords="") { return `++0\n++1\nBETI: ${title}\nAUT: ${author}\nGATT:\nPTEX: ${description} (PR-Text)\nHD: ${keywords}`;}
  },
  {
   	"id": "Der Gangster, der Junkie und die Hure", 
   	"selector": "https://avdlswr-a.akamaihd.net/swr3/podcasts-audioreihen/der-gangster-der-junkie-und-die-hure/",
    "template": function(title="",author="",description="",keywords="") { return `++0\nRTI: Der Gangster, der Junkie und die Hure\n++1\nBETI: ${title}\nSPR: Pollux, Maximilian (ehem. Krimineller)\nSPR: Lemke, Roman (ehem. Drogenabhängiger)\nSPR: Workhard, Nina (Domina)\nGATT: Gespräch\nPTEX: ${description} (PR-Text)\nHD: ${keywords}`;}
  },
  {
  	"id": "SWR3 Topthema",
  	"selector": "https://avdlswr-a.akamaihd.net/swr3/podcasts-audioreihen/topthemen/",
    "template": function(title="",author="",description="",keywords="") {  return `++0\n++1\nBETI: ${title}\nAUT: ${author}\nSPR: ${author}\nOTG:\nGATT: Bericht\nPTEX: ${description} (PR-Text) AM-geeignet\nHD: ${keywords}`;}
  },
  {
    "id":"Fünf Minuten vor dem Tod - der Kriminalpodcast",
    "selector": "https://avdlswr-a.akamaihd.net/dasding/podcasts/5-minuten-vor-dem-tod-der-kriminalpodcast/",
    "template": function(title="",author="",description="",keywords="") { return `++0\nRTI: Fünf Minuten vor dem Tod - der Kriminalpodcast\n++1\nBETI: ${title}\nSPR: Bleich, Luisa\nSPR: Schmidt, Joost\nGATT: Gespräch\nGSP:\nPTEX: ${description} (PR-Text)\nHD: ${keywords}`;}
  },
  {
    "id":"Korridore",
    "selector": "https://avdlswr-a.akamaihd.net/swr/swr2/hoerspiel/korridore-mystery-horror-serie/",
    "template": function(title="",author="",description="",keywords="") { return `++0\nRTI: Korridore - Mystery-Horror-Serie\n++1\nBETI: ${title}\nSPR: Schimmelpfennig, Max\nSPR: Arikan, Nisan\nSPR: Bähnk, Ulrich\nTAL: Lodi, Giacomo (Aufnahmen)\nTAL: Frerks, Thies (Aufnahmen)\nTAL: Güthaus, Thomas (Sounddesign und Mischung)\nAUT: Haase, Moritz (Ideengeber)\nAUT: Henriks, Lars\nREG: Henriks, Lars\nDRA: Maage, Mareike\nPTEX: ${description} (PR-Text)\nHD: ${keywords}`;}

  }
]


function copyToClipboard(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


function getData() { // Metadaten abrufen
  
  let dataElements = document.getElementsByTagName("td")
  
  let title = dataElements[1].innerText
  let author = dataElements[5].innerText
  let description = dataElements[9].innerText
  let keywords = dataElements[7].innerText
  let url = document.getElementById("response").getElementsByTagName("div")[0].innerText;
  
  // Standard-Template zuweisen
  let templateData = templates[0].template(title,author,description,keywords)
  
  // wählen Template für Podcastreihe basierend auf der URL aus
 	for (var temp of templates){   
  	if (url.includes(temp.selector)){ templateData = temp.template(title,author,description,keywords);}  
  }
  
  return(templateData)
  
}



function submitData() { // formatierte Metadaten ausgeben
  let response = getData()
  copyToClipboard(response)
  alert("Formatierte Metadaten in Zwischenablage")
}

let zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Metadaten für Digas-Erfassung</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
zNode.addEventListener("click", submitData, false);
document.body.appendChild (zNode);
