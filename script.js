console.log("link test");

// hier roepen alle html elementen op en geven we ze een naam
//startscherm
var screenElement = document.querySelector(".screen");
//app icon
var appIcon = document.querySelector(".icon");
//ecit icon
var exitIcon = document.querySelector(".exitIcon");
//bel knop
var callArthur = document.querySelector(".callArthur");
//hint tekst
var hint = document.querySelector("h3");
// microfoon button
var micButton = document.querySelector(".mic");
//camera button
var camButton = document.querySelector(".cam");
//leave button
var leaveButton = document.querySelector(".leave");
//arthur
var arthurElement = document.querySelector(".arthur");
//progress bar
var timeBar = document.querySelector("#lesTijd");
//bedankt tekst
var bedankt = document.querySelector("h4");

//audio
// code van (https://www.codegrepper.com/code-examples/javascript/play+audio+in+javascript)
// audio van https://dlo.mijnhva.nl/d2l/le/content/324271/Home 
var audio = new Audio("arthurAudio.m4a");

//hier roepen we de progressbar op en geven we hem een naam
// we gebruiken de math.random om een random getal te genereren om te kijken hoe sad arthur is 
//(ligt natuurlijk ook aan hoe hij zich voelt die dag, maar Arthur is nooit meer sad dan 50%) 
var sadBar = document.querySelector("#file");
sadBar.value = Math.floor(Math.random() * 50);

//hier geven we verschillende elementen een status
// camera aan of uit
var camStatus = "on";
//microfoon aan of uit
var micStatus = "on";
//muis op het element of niet
var muisStatus = "off";
//in het belscherm of niet
var callStatus = "off";
//is de call begonnen (de les)
var callStarted = "false";
// de les klaar is of niet (dit bepalen we later)
var les;

//hier maken we een array aan met images voor de achtergrond
var imgArray = ["images/background1.png", 'images/background2.png', 'images/background3.png', 'images/background4.png'];
var i = 0;


// hier checken we welke waarde er in de sadbar zit
console.log(sadBar.value);





//hier maken we een functie aan die de tijd laat zien
// deze code heb ik van https://codepen.io/afarrar/pen/JRaEjP
function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}


//hier laten we de tijd zien
showTime();



//hier maken we een functie aan om duidelijk te maken wat je moet doen om de app te openen
// code heb ik van https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
function hoverTekst(){
if(muisStatus == "off"){
    hint.style.display = "block";
    muisStatus = "on";
}

else{
    hint.style.display = "none";
    muisStatus = "off";
}
 
 console.log("hint werkt");
}




// hier maken we de functie om de app te openen 
// daarmee veranderen we het plaatje, halen we de icon weg en laten we 2 andere icons tevoorschijn komen
function openApp(){
    console.log("functie openApp werkt");
    callStatus="off";

    screenElement.src="images/appScreen.png";
    appIcon.style.display = 'none';
    exitIcon.style.display = 'block';
    callArthur.style.display = 'block';
}

// hier maken we een functie die arthur sad maakt (plaatje veranderen)
// in elke functie die we uitvoeren wordt de value van arthurSad gecheckt of deze 100 of hoger is.
function arthurSad(){
    console.log("arthurSad Werkt");

    if (sadBar.value >= 100){
        arthurElement.src="images/arthurSad.png";
    }

}


// hier maken we een functie aan om de app te sluiten
// daarmee veranderen we het plaatje weer terug naar het startscherm, 
//halen we de 2 iconen weer weg en laten we de app weer zien op het bureaublad
function exitApp(){
    console.log("exitApp werkt");
    callStatus="off";

    // als de les klaar is zetten we bijna alle elementen uit en veranderen we de scherm img
    if (les == "klaar"){
        screenElement.src="images/startScreen.png";

        exitIcon.style.display = 'none';
        callArthur.style.display = 'none';
        appIcon.style.display = 'none';
        arthurElement.style.display = 'none';
        micButton.style.display = 'none';
        camButton.style.display = 'none';
        leaveButton.style.display = 'none';

    }
    // als de les nog niet klaar is zetten we de elementen die we niet nodig hebben uit en andere elementen die we wel nodig hebben aan

    else{   
        screenElement.src="images/startScreen.png";

        appIcon.style.display = 'block';
        
        exitIcon.style.display = 'none';
        callArthur.style.display = 'none';
        arthurElement.style.display = 'none';
        micButton.style.display = 'none';
        camButton.style.display = 'none';
        leaveButton.style.display = 'none';

        //als de call is gestart (callStarted = true) dan moet de audio gemute worden en krijgt de sadbar +5
        if (callStarted == "true"){
            audio.muted = true;
            sadBar.value+=5;

    }

    }


    arthurSad();
}



// hier maken we een functie aan die arthur belt, 
//daarmee veranderen we weer het scherm met een andere afbeelding, komen iconen tevoorschijn en gaat er een audio afspelen
function startCall(){
    console.log("functie startCall werkt"); 

// hier zetten we een time out die na 1 minuut de functie timeUp start (de les is dan voorbij)
setTimeout (timeUp, 60000);


if (les == "klaar"){
    //hier gebreurt niks, omdat de les klaar is dit gebeurt wanneer de functie timeUp wordt afgespeelt
}

// als de les nog niet klaar is moeten er statussen worden aangepast, plaatjes worden veranderd en de audio aan gaan
else{

    callStarted = "true";
    callStatus="on";
    micStatus="on";
    audio.muted = false;

    micButton.src="images/mic.png";

    //scherm veranderen
    screenElement.src=imgArray[0];
    callArthur.style.display = 'none';

    //iconen mic, cam, leave en atrhur aan
    arthurElement.style.display = 'block';
    micButton.style.display = 'block';
    camButton.style.display = 'block';
    leaveButton.style.display = 'block'; 

    //hier zetten we de audio aan 
    //(deze code heb ik van https://www.codegrepper.com/code-examples/javascript/play+audio+in+javascript)
    audio.play();
    
    }

}


//deze functie zet de les status op "klaar" en start de functie leaveCall
// deze wordt aangeroepen door de setTimeout functie  
function timeUp(){
    console.log(" functie timeUp werkt")
    les = "klaar";
    leaveCall();
}


//in deze funtie kun je uit de call gaan 
// hier wordt de calStatus op off gezet, het scherm element verandert en een aantal andere elementen uitgezet
function leaveCall(){
    console.log("functie leaveCall werkt");

    screenElement.src="images/appScreen.png";

    callStatus="off";

    arthurElement.style.display = 'none';
    micButton.style.display = 'none';
    camButton.style.display = 'none';
    leaveButton.style.display = 'none';


// als de net klaar is moet de bedankt tekst in beeld komen, de bel knop weg zijn en de audio gepauseerd worden
    if (les == "klaar"){
        
        bedankt.style.display="block"; 
        callArthur.style.display = "none";
        audio.pause();
    }

// wanneer de les nog niet klaar is moet de bel knop weer zichtbaar worden de audio gemute worden en de sadBar +5 krijgen
    else{

    callArthur.style.display = 'block';
    sadBar.value+=5;
    audio.muted = true;
    } 

    arthurSad();
}



//hier maken we de functie aan om de achtergrond te veranderen 
//deze worden uit de array gehaald 
function background(){
    if(callStatus=="on"){
        if (i < 3 ){
            screenElement.src=imgArray[i+1]
            i = i + 1;
            console.log(i);
            sadBar.value+=5;
        } else {
            screenElement.src=imgArray[0];
            i = 0;
            console.log(i);
            sadBar.value+=5;
        }
    }

    arthurSad();

}


//hier is een functie aangemaakt om de camera uit te zetten we geven ook een status aan de camera zodat wanneer hij aan staat
// je hem uit kan klikken en als hij uit staat hij na 2 seconden weer aan gaat
function camOff(){

    if (camStatus == "on"){
        arthurElement.style.display = 'none';
        camStatus = "off";
        sadBar.value+=5;
        screenElement.src=imgArray[0];
        camButton.src="images/camOff.png";
        setTimeout(camOff, 2000); 
        }    
    
    else{
        arthurElement.style.display = 'block';
        camStatus = "on";
        camButton.src="images/cam.png";
    }

    arthurSad();
}

// hier hebben we een functie gemaakt om de microfoon uit te zetten 
// met de status wordt er bekeken of hij aan of uit staat 
function micOff(){

    if (micStatus == "off"){
        audio.muted = false;
        micButton.src="images/mic.png";
        micStatus = "on";
        
    }

    else{
        audio.muted = true;
        micButton.src="images/micOff.png";
        sadBar.value+=5;
        micStatus = "off";
    }

    arthurSad();
}


//hier maken we een functie waarbij elke seconde -1 van de tijdbalk afgaat 
// deze gaat pas van start wanneer de les is begonnen 
function callEndTime(){
    if (callStarted == "true"){
        timeBar.value-=1;
    }

}

//hier maken we een interval die elke seconde opnieuw afspeeld 
setInterval(callEndTime, 1000);


//door op de camera te klikken gaat de camera bij arthur uit en veranderd het icoon 
camButton.addEventListener("click",camOff);

// hier roepen we de functie openApp aan wanneer we dubbelklikken op de appIcon
appIcon.addEventListener("dblclick", openApp);

// hier roepen we de functie exitApp aan wanneer we klikken op de exitIcon 
exitIcon.addEventListener("click", exitApp);

//hier roepen we de functie startCall aan wanneer we klikken op callArthur
callArthur.addEventListener("click", startCall);

//hier roepen we de functie background aan wanneer we klikken op screenElement
screenElement.addEventListener("click", background);

// wanneer we op de leave Button klikken gaan we uit de call
leaveButton.addEventListener("click", leaveCall);

// wanneer we op de mic klikken gaat arthur op mute
micButton.addEventListener("click", micOff);

//wanneer we hoveren over de appicon krijg een een hint dat je moet dubbel klikken 
appIcon.addEventListener("mouseenter", hoverTekst);
appIcon.addEventListener("mouseout", hoverTekst);


