document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here

const button = document.querySelector("button");

const inputs = document.querySelectorAll("input");
const dayInput = document.querySelector("#dayInput");
const monthInput = document.querySelector("#monthInput");
const yearInput = document.querySelector("#yearInput");

const dateInput = [dayInput, monthInput, yearInput]; 

const ageYear = document.querySelector(".yearSpan");
const ageMonth = document.querySelector(".monthSpan");
const ageDay = document.querySelector(".daySpan");
const error = document.querySelectorAll("p");
const label = document.querySelectorAll("label");
const icons = document.querySelectorAll(".icon");


let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

// find age function
function findAge(birthDay, birthMonth, birthYear) {
    let ageYearValue = currentYear - birthYear;
    let ageMonthValue = currentMonth - birthMonth;
    let ageDayValue = currentDay - birthDay;

    if (ageDayValue < 0) {
        ageDayValue += new Date(birthYear, birthMonth - 1, 0).getDate();
        ageMonthValue--;
    }

    if (ageMonthValue < 0) {
        ageMonthValue += 12;
        ageYearValue--;
    }

    ageYear.textContent = ageYearValue;
    ageMonth.textContent = ageMonthValue;
    ageDay.textContent = ageDayValue;
}

// valid or not
function validateDate(birthDay, birthMonth, birthYear) {
    const monthDays = new Date(birthYear, birthMonth, 0).getDate();

    if (birthDay < 1 || birthDay > monthDays) {
        return false;
    }

    if (birthMonth < 1 || birthMonth > 12) {
        return false;
    }

    if (birthYear < 1900 || birthYear > currentYear) {
        return false;
    }

    return true;
}

button.addEventListener("click", (event) => {
    let birthDay = parseInt(dayInput.value);
    let birthMonth = parseInt(monthInput.value);
    let birthYear = parseInt(yearInput.value);

    dateInput.forEach((item, index) => {
        if (item.value === "") {
            error[index].textContent = "Field is required";
            error[index].removeAttribute("hidden");
            item.style.border = "1px solid hsl(0, 100%, 67%)";
            label[index].style.color = "hsl(0, 100%, 67%)";
        } else if (!validateDate(birthDay, birthMonth, birthYear)) {
            error[index].textContent = "Must be a valid date";
            error[index].removeAttribute("hidden");
            item.style.border = "1px solid hsl(0, 100%, 67%)";
            label[index].style.color = "hsl(0, 100%, 67%)";
        } else {
            
            error[index].setAttribute("hidden", true);
            item.style.border = "1px solid hsl(0, 0%, 86%)";
            label[index].style.color = "hsl(0, 1%, 44%)";
        }

    });

    let allErrorsHidden = true;
    error.forEach((errorElement) => {
    if (!errorElement.hasAttribute("hidden")) {
        allErrorsHidden = false;
    }
});

    if (allErrorsHidden) {
    findAge(birthDay, birthMonth, birthYear);
}   

icons.forEach(icon => {
    icon.style.display = "none";
});

});
});