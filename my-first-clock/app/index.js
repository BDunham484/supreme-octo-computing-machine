import clock from "clock";
import * as document from "document";
import display from "display";
import { preferences } from "user-settings";
import {
    backgrounds,
    changeBackground_12hr,
    changeBackground_24hr,
} from "../resources/index";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { today as todayStats } from "user-activity";
import { battery, charger } from "power";

// const backgroundImageEl = document.getElementById("background-image");
const myLabel = document.getElementById("myLabel");
const apLabel = document.getElementById("apLabel");
const mLabel = document.getElementById("mLabel");
const rect = document.getElementById("rect");
const statsCycle = document.getElementById("statsCycle");
const items = statsCycle.getElementsByClassName("cycle-item");
var assemble = document.getElementById("assemble");
const stepsLabel = document.getElementById("stepsLabel");
const caloriesLabel = document.getElementById("caloriesLabel");
const distanceLabel = document.getElementById("distanceLabel");
const floorsLabel = document.getElementById("floorsLabel");
const activeLabel = document.getElementById("activeLabel");



function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};

// Update the clock every minute
clock.granularity = "minutes";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12h format
        const text = (hours < 12) ? "A" : "P";
        apLabel.text = `${text}`;
        mLabel.text = "M";
        hours = hours % 12 || 12;

        changeBackground_12hr(hours, text, backgrounds);
    } else {
        // 24h format
        hours = zeroPad(hours);
        changeBackground_24hr(hours, backgrounds)
    }
    let mins = zeroPad(today.getMinutes());
    myLabel.text = `${hours}:${mins}`;
}

const wake = () => {
    assemble.animate("enable");
}

const sleep = () => {
    assemble.animate("disable");
}
// Hide a specific item by index
// items[2].style.display = "none";

wake();

setInterval(() => {
    wake();
}, 1000 * 10);

// display.addEventListener("change", function() {
//     display.on ? wake() : sleep();
// })

// Heart Rate Sensor
if (HeartRateSensor) {
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
        // console.log(`Current heart rate: ${hrm.heartRate}`);
        heartLabel.text = `${hrm.heartRate}`;
    });
    display.addEventListener("change", () => {
        // Automatically stop the sensor when the screen is off to conserve battery
        display.on ? hrm.start() : hrm.stop();
    });
    hrm.start();
}

// Body Presence Sensor
if (BodyPresenceSensor) {
    const body = new BodyPresenceSensor();
    body.addEventListener("reading", () => {
        if (!body.present) {
            heartLabel.text = "--"
        } else {

        }
    });
    body.start();
}

// Permissions
// if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
//     const hrm = new HeartRateSensor();
//     hrm.start();
// }

// Activities
function activities() {
    if (appbit.permissions.granted("access_activity")) {
        stepsLabel.text = `${todayStats.adjusted.steps}`;
        distanceLabel.text = `${todayStats.adjusted.distance}`;
        floorsLabel.text = `${todayStats.adjusted.elevationGain}`;
        if (todayStats.local.activeZoneMinutes !== undefined) {
            activeLabel.text = `${todayStats.adjusted.activeZoneMinutes.total}`;
        }
        if (todayStats.local.calories !== undefined) {
            caloriesLabel.text = `${todayStats.adjusted.calories}`;
        }
    }
}

// Battery Life Display
// console.log(Math.floor(battery.chargeLevel) + "%");
// powerLabel.text = `${battery.chargeLevel}%`; // initialize on startup
// battery.onchange = (charger, evt) => {
//     powerLabel.text = `${battery.chargeLevel}%`;
// }

// Determine which battery image needs to be shown
// function batteryLevel() {
//     if (battery.chargeLevel >= 99) {
//         batImg.href = "images/battery-100.png";
//     } else if (battery.chargeLevel < 99 && battery.chargeLevel >= 5) {
//         let ratio = Math.floor(battery.chargeLevel / 5);
//         batImg.href = 'images/battery-' + ratio * 5 + '.png';
//     } else {
//         batImg.href = "images/battery-dead.png";
//     }
// }

// Month and Date
function showDate(evt) {
    let today = evt.date;
    let monthnum = today.getMonth();
    let day = today.getDate();
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var days = new Array();
    days[0] = "Sun";
    days[1] = "Mon";
    days[2] = "Tue";
    days[3] = "Wed";
    days[4] = "Thu";
    days[5] = "Fri";
    days[6] = "Sat";
    let monthname = month[monthnum];
    let dayname = days[today.getDay()];
    monthLabel.text = `${monthname}`;
    dayLabel.text = `${day}`;
    dayNameLabel.text = `${dayname}`;
}
