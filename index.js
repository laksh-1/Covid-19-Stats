console.log('corona stats');

let searchButton = document.getElementById('searchButton');
let country = document.getElementById('country');
let searchResult = document.getElementById('searchResult');
let graph = document.getElementById('graph').getContext('2d');
let date = document.getElementById('date');
let chartType = document.getElementById('chartType');
Chart.defaults.global.defaultFontFamily = 'Lato';

searchButton.addEventListener('click', () => {
    let selectedCountry = country.value.toLowerCase();
    console.log(selectedCountry);
    if (date.value == "") {
        let today = new Date();
        date.value = `${today.toISOString().split('T')[0]}`;
        console.log(today.toISOString().split('T')[0]);
    }
    fetch(`https://covid-193.p.rapidapi.com/history?country=${selectedCountry}&day=${date.value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "233c9b2773mshfe80f6b6ef577c4p13f98ejsn7e3422935c64"
        }
    })
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            let html = `
            <div class="card-deck">
            <div class="card my-3 text-center bg-danger text-light">
            <div class="card-header font-weight-bold">
            Cases
            </div>
            <div class="card-body">
                <p class="card-text">Total: ${data.response[0].cases.total}</p>
                <p class="card-text">Active: ${data.response[0].cases.active}</p>
                <p class="card-text">New: ${data.response[0].cases.new}</p>
                <p class="card-text">Critical: ${data.response[0].cases.critical}</p>
            </div>
            <div class="card-footer">
            ${country.value}: ${data.response[0].time.slice(0, 10)}
            </div>
        </div>
        <div class="card my-3 text-center bg-success text-light">
            <div class="card-header font-weight-bold">
            Recovery
            </div>
            <div class="card-body">
                <p class="card-text">Total: ${data.response[0].cases.recovered}</p>
            </div>
            <div class="card-footer">
            ${country.value}: ${data.response[0].time.slice(0, 10)}
            </div>
        </div>
        <div class="card my-3 text-center bg-dark text-light">
            <div class="card-header font-weight-bold">
            Deaths
            </div>
            <div class="card-body">
                <p class="card-text">Total: ${data.response[0].deaths.total}</p>
                <p class="card-text">New: ${data.response[0].deaths.new}</p>
            </div>
            <div class="card-footer">
            ${country.value}: ${data.response[0].time.slice(0, 10)}
            </div>
        </div>
        </div>`
            searchResult.innerHTML = html;
            let newChart = new Chart(graph, {
                type: `${chartType.value}`,
                data: {
                    labels: ['Total', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'COVID-19',
                        data: [
                            data.response[0].cases.total,
                            data.response[0].cases.recovered,
                            data.response[0].deaths.total
                        ],
                        backgroundColor: [
                            'red',
                            'green',
                            'black'
                        ],
                        borderWidth: 2,
                        borderColor: 'grey',
                        hoverBorderWidth: 3,
                        hoverBorderColor: 'black'
                    }]
                },
            })
        });
    event.preventDefault();

})
