//variables
let cards = document.querySelector('#cards');
let body = document.querySelector(".body")
let errorMsg = document.querySelector(".errorMsg");
let numberOfImages = document.querySelector(".numberOfImages");
let titleContainer = document.querySelector(".titleContainer");

//fetching data
const fetchPhotos = async () => {

    //loading message
    let span = document.createElement("span");
    span.setAttribute("class", "loadingMessage");
    span.innerText = "Loading...";
    body.appendChild(span);

    //getting the data back
    try {
        let response = await fetch(
            "https://jsonplaceholder.typicode.com/photos"
        );
        
        if (response.ok) {
            span.innerText = '';
            let data = await response.json();
            let result = data.slice(0, 12);
            numberOfImages.innerText = `(${result.length})`
            result.forEach((photo) => {
                let card = document.createElement("div");
                card.setAttribute('class', "card")
                card.innerHTML += `<img src=${photo.thumbnailUrl} class="picture">`;
                let p = document.createElement("p");
                p.innerText = photo.title;
                card.appendChild(p);
                cards.appendChild(card);
                console.log(cards)
            });
        } else {
            console.log(response.text());
            throw new Error('sorry could not fetch photos')
        }
    } catch (error) {
        span.innerText = "";
        let p = document.createElement("p");
        errorMsg.appendChild(p);
        if (error.message === "Failed to fetch") {
            let newErrorMessage = (error.message =
                "Error has occured with a code of: N-90: This Error can be due to unstable internet connection or bad fetch URL");
            p.innerText = newErrorMessage;
            
        } else {
            p.innerText = error.message;
            console.log(error.message)
        }
    }
    
    
}

fetchPhotos()

