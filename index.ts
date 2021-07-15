const jokeButton = document.querySelector(".acuditButton") as HTMLElement;
const jokeText = document.querySelector(".jokeText") as HTMLElement;
const scoreDiv = document.querySelector(".score")as HTMLElement;
const scoresInput : HTMLInputElement[] = Array.from(document.querySelectorAll("input"));
scoreDiv.style.display = "none";
let reportJokes: Jokes[] = [];
interface Jokes {
    joke: string;
    score: number;
    date: string
};
let isScore: boolean = false; 
let dataDad: {joke: string};
let dataNorris: {value:string};
let isDad: boolean = false;

// Set Joke button
jokeButton.addEventListener("click", ()=>showAJoke());

const showAJoke = ():void =>{
    try{
        let score: number;
        changeBackground();
        // Add to array reportJokes
        if(isScore){
            addReportScore(score);
        }

        // Reset a joke and show radio buttons of scores
        jokeText.innerText="";
        scoreDiv.style.display = "block";
        isDad = !isDad;

        // Get a new joke and show it
        if (isDad){
            getDaddyJoke();
        } else {
            getNorrisJoke();
        }
        
        // only the first time
        if(!isScore){
            isScore = true;
        }   
    } catch(error){
        console.log(`Something went wrong! -- ${error}`);
    }
}

const addReportScore = (score:number):void =>{
    score = parseInt(scoresInput.filter(score=> score.checked === true)[0].value);
    scoresInput[0].checked = true;
    const fecha: string = new Date().toISOString();
    let selectedJoke: string;
    if (isDad){
        selectedJoke = dataDad.joke;
    } else {
        selectedJoke = dataNorris.value;
    }
    reportJokes.push({
        joke: selectedJoke,
        score: score,
        date: fecha
    })
    console.log("ReportJoke", reportJokes);
}

const getDaddyJoke = async () : Promise<void>=>{
    const res = await fetch(
        'https://icanhazdadjoke.com/',{
            headers:{
                Accept: "application/json"
            }
        });
    dataDad = await res.json();

    console.log("joke", dataDad.joke);
    jokeText.innerText=dataDad.joke;
}

const getNorrisJoke = async () : Promise<void>=>{
    const res = await fetch(
        'https://api.chucknorris.io/jokes/random',{
            headers:{
                Accept: "application/json"
            }
        });
    dataNorris = await res.json();

    console.log("joke", dataNorris.value);
    jokeText.innerText=dataNorris.value;
}

//weather api

const weatherDiv = document.querySelector(".weatherDiv") as HTMLElement;
const tempDiv = document.querySelector(".tempDiv") as HTMLElement;

const getWeather = async()=>{
    const response: Response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=barcelona&appid=ac5afeceedbfd9b43156af672f440fd1&units=metric',{
            headers:{
                Accept: "application/json"
            }
        });
    const weatherBCN: {weather:{main:string}[]} = await response.json();
    
    const weather: string = weatherBCN.weather[0].main;
    console.log("weather", weather);
    weatherDiv.innerHTML = weather;
}
getWeather();

// Background blob setting
const containerDiv = document.querySelector(".container") as HTMLElement;
const blobLeftDiv = document.querySelector(".blobLeft") as HTMLImageElement;
const blobRightDiv = document.querySelector(".blobRight") as HTMLImageElement;
const mainImageNames: string[] = ["blob1", "blob2", "blob3"];

const changeBackground = ():void => {
    let lenNum: number = Math.floor(Math.random() * 3);
    containerDiv.style.backgroundImage = `url(./imgs/${mainImageNames[lenNum]}.svg)`;
    blobLeftDiv.src = `./imgs/${mainImageNames[lenNum]}-1.svg`;
    blobRightDiv.src = `./imgs/${mainImageNames[lenNum]}-2.svg`;
}




