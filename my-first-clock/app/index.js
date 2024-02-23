import clock from "clock";
import * as document from "document";
import display from "display";
import { preferences } from "user-settings";
import { 
    backgrounds,
    changeBackground_12hr,
    changeBackground_24hr,
} from "../resources/index";

// const backgroundImageEl = document.getElementById("background-image");
const myLabel = document.getElementById("myLabel");
const apLabel = document.getElementById("apLabel");
const mLabel = document.getElementById("mLabel");
const rect = document.getElementById("rect");
const statsCycle = document.getElementById("statsCycle");
const items = statsCycle.getElementsByClassName("cycle-item");
var assemble = document.getElementById("assemble");

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


