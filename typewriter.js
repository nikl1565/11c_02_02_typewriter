"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".js-start-button").addEventListener("click", getTypewriters);
});

let allTypewriters = [];
let allTypewriterText = [];

let typewriterIndex = 0;
let textIndex = 0;
let letterIndex = 0;

let oldText = "";

const soundTypeKey1 = document.querySelector("#typekey1");
const soundTypeKey2 = document.querySelector("#typekey2");
const soundTypeSpace = document.querySelector("#typespace");
const soundTypeReturn = document.querySelector("#typereturn");
const soundTypeLast = document.querySelector("#typelast");

function getTypewriters() {
    console.log("initTypewriter");

    document.querySelector("body").click();

    allTypewriters = document.querySelectorAll(".typewritten");
    console.log(allTypewriters);

    allTypewriters.forEach((typewriter) => {
        getTypewriterText(typewriter);
    });

    console.log(allTypewriterText);

    animateTypewriter(allTypewriters[typewriterIndex]);
}

function getTypewriterText(typewriter) {
    allTypewriterText.push(typewriter.innerHTML.split("<br>"));

    typewriter.textContent = "";
}

function animateTypewriter(typewriter) {
    // console.log("animateTypewriter");

    console.log(`Letter Index: ${letterIndex}
Text Index ${textIndex}
Typewriter Index ${typewriterIndex}
Typewriter: ${typewriter.outerHTML}
    `);

    const indexInText = allTypewriterText[typewriterIndex][textIndex][letterIndex];

    if (letterIndex < allTypewriterText[typewriterIndex][textIndex].length) {
        console.log("Letters baby", allTypewriterText[typewriterIndex][textIndex].length);
        letterIndex++;

        typewriter.innerHTML = oldText + allTypewriterText[typewriterIndex][textIndex].substring(0, letterIndex);

        if (indexInText === " ") {
            soundTypeSpace.play();
        } else {
            const randomTypingSound = Math.floor(Math.random() * 2) + 1;

            if (randomTypingSound === 1) {
                soundTypeKey1.play();
            } else {
                soundTypeKey2.play();
            }
        }

        const random = Math.floor(Math.random() * 4) + 1;

        var interval = setTimeout(() => {
            animateTypewriter(typewriter);
        }, 400);
    } else if (textIndex < allTypewriterText[typewriterIndex].length - 1) {
        soundTypeReturn.play();

        oldText += allTypewriterText[typewriterIndex][textIndex] + "<br>";
        console.log("Text baby");
        textIndex++;

        const isTheNextLetterASpace = allTypewriterText[typewriterIndex][textIndex][0];

        console.log(isTheNextLetterASpace);

        if (isTheNextLetterASpace === " ") {
            letterIndex = 1;
        } else {
            letterIndex = 0;
        }

        var interval = setTimeout(() => {
            animateTypewriter(allTypewriters[typewriterIndex]);
        }, 1300);
    } else if (typewriterIndex < allTypewriters.length - 1) {
        soundTypeReturn.play();

        typewriterIndex++;
        textIndex = 0;
        letterIndex = 0;
        oldText = "";

        var interval = setTimeout(() => {
            console.log(`New writter [${typewriterIndex}][${textIndex}]
            `);
            animateTypewriter(allTypewriters[typewriterIndex]);
        }, 1300);
    } else {
        var interval = setTimeout(() => {
            soundTypeLast.play();
        }, 300);
    }
}
