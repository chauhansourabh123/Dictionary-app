console.log("Start Coding...");
let form = document.querySelector('#form');
let inputValue = document.getElementById('inputValue')
let content = document.querySelector('.content')
let URL = "https://api.dictionaryapi.dev/api/v2/entries/en"



function sendData(item) {
    try {
        let result = document.createElement('div')
        result.className = "result"
        result.innerHTML = `<h2>Word: ${item.word.toUpperCase()}</h2>
           <p>Verb</p>
           <h3>Meaning : <span>${item.meanings[0].definitions[0].definition}</span></h3>
           ${item.meanings[0].definitions[0].example ? `<h3>Example : <span>${item.meanings[0].definitions[0].example}</span></h3>` : ""}
       

           ${item.meanings[0].antonyms[0] > 0 ? `<div>
           <h3>Antonyms</h3>
           <ul>
               <li>${item.meanings[0].antonyms[0]}</li>
               <li>${item.meanings[0].antonyms[1]}</li>
           </ul>
        </div>` : ""}


         <button><a target="_blank" href="${item.phonetics[0].sourceUrl}">Read More</a></button>`

        content.appendChild(result)

    } catch (error) {
        console.log("Sorry, Data not found : " + error);
        content.innerHTML = "Sorry, data not found."
    }
}

const fetchapi = (value) => {
    content.innerHTML = ""
    fetch(`${URL}/${value}`)
        .then(res => res.json())
        .then((data) => sendData(data[0]))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchapi(inputValue.value)
    inputValue.value = ""
})
