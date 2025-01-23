const keys = document.querySelectorAll(".key"),
    note = document.querySelector(".nowplaying"),
    hints = document.querySelectorAll(".hints");

function playNoteByKeyCode(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`),
        key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!key) return;

    const keyNote = key.getAttribute("data-note");

    key.classList.add("playing");
    note.innerHTML = keyNote;
    audio.currentTime = 0;
    audio.play();
}

function playNote(e) {
    playNoteByKeyCode(e.keyCode);
}

function playNoteOnClick(e) {
    const key = e.currentTarget;
    const keyCode = key.getAttribute('data-key');
    playNoteByKeyCode(keyCode);
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

function hintsOn(e, index) {
    e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

keys.forEach(key => {
    key.addEventListener("transitionend", removeTransition);
    key.addEventListener("click", playNoteOnClick); // Mouse click event
    key.addEventListener("touchstart", playNoteOnClick); // Touch event for mobile devices
});

window.addEventListener("keydown", playNote);
