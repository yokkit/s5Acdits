const jokeButton = document.querySelector(".acuditButton") as HTMLButtonElement;
jokeButton.addEventListener("click", ()=>dadJoke());

const dadJoke = async():Promise<void> =>{
    try{
        const res = await fetch(
            'https://icanhazdadjoke.com/',{
                headers:{
                    Accept: "application/json"
                }
            });
        const data = await res.json();
        console.log(data.joke);
    } catch(error){
        console.log(`Something went wrong! -- ${error}`);
    }
}

