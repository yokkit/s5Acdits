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

jokeButton.addEventListener("click", ()=>showAJoke());

const showAJoke = ():void =>{
    try{
        let score: number;
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
    const weatherBCN: {main:{temp:number}; weather:{icon:string}[]} = await response.json();
    
    const temperature: number = weatherBCN.main.temp;
    const icon: string = weatherBCN.weather[0].icon;
    const tempUrl: string = `http://openweathermap.org/img/wn/${icon}@2x.png`
    console.log("temperature", temperature);
    console.log("iconURL", tempUrl);
    const weatherImg:string = `<img class="weatherImg" src=${tempUrl}>`;
    weatherDiv.innerHTML = weatherImg;
    tempDiv.innerHTML = `${temperature} °`

}

getWeather();


