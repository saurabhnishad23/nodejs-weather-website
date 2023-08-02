
console.log('this is the client side javascript page')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

const messageTwo = document.querySelector('#msg-2')


const weatherForm = document.querySelector('form');
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value
    const messageOne = document.querySelector('#msg-1')

        fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ location +'?unitGroup=metric&key=5ANJVUG57KK9JRG5FHNU8NEXP&contentType=json').then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = 'data.error'
            }else {
                messageOne.textContent = data.resolvedAddress;
                const messageTwo = document.querySelector('#msg-2')
                messageTwo.textContent = data.days[0].description;
                const messageThree =document.querySelector('#msg-3')
                messageThree.textContent = 'Its '+ data.days[0].temp +' degree out there.'

                // console.log(data.address)
                // console.log(data.resolvedAddress)
                // console.log(data.days[0].description)
                // console.log('Its '+ data.days[0].temp +' degree out there')

            }
        })
    })

})

