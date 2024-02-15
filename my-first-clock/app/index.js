import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";

const backgroundImageEl = document.getElementById("background-image");
const apLabel = document.getElementById("apLabel");
const mLabel = document.getElementById("mLabel");

function zeroPad(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

const backgroundChanger = (hours) => {
    console.log('🎃🎃🎃🎃 hours: ', hours);

    const imagesArr = [
        "cheddar-goblin.png",
        "day.png",
        "deepBlue (1).png",
        "moon.png",
        "sunrise-blend-crop.png",
        "sunset-blended-crop.png",
        "sunset-waves-crop.png"
    ]

    const index = Math.floor(Math.random() * 7)
    console.log('🎃🎃🎃🎃 index: ', index);

    backgroundImageEl.href=`images/${imagesArr[index]}`;
};


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
        
        backgroundChanger(hours);
    } else {
        // 24h format
        hours = zeroPad(hours);
    }
    let mins = zeroPad(today.getMinutes());
    myLabel.text = `${hours}:${mins}`;
}

var assembleEl = document.getElementById("assemble");


const wake = () => {
    console.log('wake ran');
    assembleEl.animate("enable");
}

wake();

setInterval(() => {
    wake();
}, 1000 * 10);
