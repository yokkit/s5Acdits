const jokeButton = document.querySelector(".acuditButton") as HTMLElement;
const jokeText = document.querySelector(".jokeText") as HTMLElement;
jokeButton.addEventListener("click", ()=>dadJoke());

const dadJoke = async():Promise<void> =>{
    try{
        jokeText.innerText="";
        const res = await fetch(
            'https://icanhazdadjoke.com/',{
                headers:{
                    Accept: "application/json"
                }
            });
        const data = await res.json();
        console.log(data.joke);
        jokeText.innerText=data.joke;
    } catch(error){
        console.log(`Something went wrong! -- ${error}`);
    }
}

