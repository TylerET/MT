let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let duration = [6, 7, 8, 9, 5, 6, 4];
let userName;
let age;

let $ = function (id) {
  return document.querySelector("#" + id);
};

document.addEventListener("DOMContentLoaded", function () {
  //event handlers here
  const userInfo = $("userInfo");
  userInfo.addEventListener("submit", (e) => {
    e.preventDefault();
    userName = $("userName").value;
    age = $("age").value;
  });
  const update = $("updateBtn");
  update.addEventListener("click", (e) => {
    e.preventDefault();
    updateSleep();
  });
  const average = $("averageBtn");
  average.addEventListener("click", (e) => {
    e.preventDefault();
    showAverageMinMaxSleep();
  });
  const trackSleep = $("trackSleepBtn");
  trackSleep.addEventListener("mouseover", displaySleepDuration);
});

// define functions here
const getDateInput = () => {
  let radios = document.getElementsByName("day");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return null;
};

const changeHoursForDay = (day, val) => {
  duration[days.indexOf(day)] = val;
};

const updateSleep = () => {
  const sleepDur = $("sleepDuration");
  if (sleepDur.value === null || sleepDur.value === "") {
    alert("Enter a valid number for sleep duration");
    sleepDur.value = "";
  } else {
    const day = getDateInput();
    changeHoursForDay(day, sleepDur.value);
    alert(`Your updated sleep duration is ${sleepDur.value} hrs on ${day}`);
  }
};

const showAverageMinMaxSleep = () => {
  let min = 999;
  let max = 0;
  let sum = 0;
  duration.forEach((dur) => {
    if (dur > max) max = dur;
    if (dur < min) min = dur;
    sum += dur;
  });
  const avg = Math.floor(sum / duration.length);
  const sleepDurationForWeek = $("averageSleepDuration");
  sleepDurationForWeek.value = `Average sleep duration for this week: ${avg}`;
  sleepDurationForWeek.style.color = "green";
  sleepDurationForWeek.style.borderColor = "red";
};

const test = () => {
  console.log("hey!");
};

const displaySleepDuration = () => {
  $("result_here").innerHTML = `Hey ${
    $("userName").value
  }! You slept less than 5 hours on the following days`;
  let tableData = "<tr><th>Day</th><th>Hour</th></tr>";
  for (let i = 0; i < duration.length; i++) {
    if (duration[i] < 5) {
      tableData += `<tr><td>${days[i]}</td><td>${duration[i]}</td></tr>`;
    }
  }
  $("sleep_table").innerHTML = tableData;
};
