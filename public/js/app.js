

const weatherForm = document.querySelector('form')
const searchQuery = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = 'Loading Data...'
    msgTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+searchQuery.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msgOne.textContent = 'Error'
            msgTwo.textContent = data.error

        } else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
    })
})
})