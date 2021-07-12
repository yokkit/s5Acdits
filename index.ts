const jokeButton = document.querySelector(".acuditButton") as HTMLElement;
const jokeText = document.querySelector(".jokeText") as HTMLElement;
const scoreDiv = document.querySelector(".score")as HTMLElement;
const scoresInput : HTMLInputElement[] = Array.from(document.querySelectorAll("input"));
scoreDiv.style.display = "none";
let reportJokes: Jokes[] = [];
let isScore: boolean = false; 
let data: {
    id: string;
    joke: string;
    status: number
};
interface Jokes {
    joke: string;
    score: number;
    date: string
};

jokeButton.addEventListener("click", ()=>dadJoke());

const dadJoke = async():Promise<void> =>{
    try{
        let score: number;

        // Add to array reportJokes
        if(isScore){
            score = parseInt(scoresInput.filter(score=> score.checked === true)[0].value);
            scoresInput[0].checked = true;
            const fecha: string = new Date().toISOString();
            reportJokes.push({
                joke: data.joke,
                score: score,
                date: fecha
            })
            console.log("Report jokes (array)", reportJokes);
        }
        // Reset a joke and show score radio button
        jokeText.innerText="";
        scoreDiv.style.display = "block";

        // Get a new joke and show it
        const res = await fetch(
            'https://icanhazdadjoke.com/',{
                headers:{
                    Accept: "application/json"
                }
            });
        data = await res.json();

        console.log("joke", data.joke);
        jokeText.innerText=data.joke;
        
        // only the first time
        if(!isScore){
            isScore = true;
        }   
    } catch(error){
        console.log(`Something went wrong! -- ${error}`);
    }
}

