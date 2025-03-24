// https://api.weatherapi.com/v1/current.json?key=0bfe8f5bfde341519d895323252403&q=Himachal Pradesh&aqi=no

const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchFeild = document.querySelector(".search_area");
const searchbutton = document.querySelector(".search_button");
const form = document.querySelector("form");

form.addEventListener('submit', searchForLocation);

let target = 'Himachal Pradesh';

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=0bfe8f5bfde341519d895323252403&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url); // gets the response
        const data = await res.json(); // converts the data in json format

        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {

    let splitDate = time.split(' ')[0]
    let splitTime = time.split(' ')[1]

    let currentday = getDayName(new Date(splitDate).getDay())

    temperatureField.innerText = temp;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentday} ${splitTime}`;
    conditionField.innerText = condition;


}

function searchForLocation(event) {
    event.preventDefault();
    target = searchFeild.value;
    fetchResults(target);
}

fetchResults(target);

function getDayName(number) {
    switch (number) {
        case 0:
            return 'Sunday'
            break;
        case 1:
            return 'Monday'
            break;
        case 2:
            return 'Tuesday'
            break;
        case 3:
            return 'Wednesday'
            break;
        case 4:
            return 'Thrusday'
            break;
        case 5:
            return 'Friday'
            break;
        case 6:
            return 'Saturday'
            break;
        default:
            console.log("some error")
    }
}
