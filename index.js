import * as document from "document";
const backgroundImageEl = document.getElementById("background-image");

export const backgrounds = [
    "sunrise.png",
    "daytime.png",
    "sunset.png",
    "hyper-moon.png",
]

export const changeBackground = (hours, text, backgrounds) => {
    if (((hours >= 6) && (hours <= 7)) && text === "A") {
        backgroundImageEl.href=`images/${backgrounds[0]}`
    } else if (((hours > 7) && (hours <= 12)) && text === "A") {
        backgroundImageEl.href=`images/${backgrounds[1]}`
    } else if (((hours > 12) && (hours <= 6)) && text === "P") {
        backgroundImageEl.href=`images/${backgrounds[1]}`
    } else if (((hours > 6) && (hours <= 7) && text === "P")) {
        backgroundImageEl.href=`images/${backgrounds[2]}`
    } else if (((hours > 7) && (hours <= 12)) && text === "P") {
        backgroundImageEl.href=`images/${backgrounds[3]}`
    } else if (((hours >= 1) && (hours < 6)) && text === "A") {
        backgroundImageEl.href=`images/${backgrounds[3]}`
    }
}
