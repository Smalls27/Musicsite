// Variables that will be used in this project. //////////////////////////////////////////////////////////
const songs = document.getElementsByTagName("li");
const audio = document.querySelectorAll("audio");

// The object that will house all of the functionality of the player. //////////////////////////////////////////////////////////

const musicPlayer = {
    activate(event) {
        if (event.target.getAttribute("class") !== "active") {
            event.target.setAttribute("class", "buffer makeTaller active");
            showSongInfo(event);
        }

        function showSongInfo(event) {
            let artist = document.getElementById("artist");
            let artistSong = document.getElementById("artistSong");

            artist.innerHTML = event.target.parentElement.getAttribute("artist");
            artistSong.innerHTML = (event.target.parentElement.firstElementChild.innerHTML);
        }
    },

    dynamicWidth(event) {
        const musicDuration = event.target.nextElementSibling.duration;
        const musicCurrentTime = event.target.nextElementSibling.currentTime;
        const elementWidth = document.getElementById("progress").offsetWidth;
        changeWidth = 50 / musicDuration;
        newDuration = (elementWidth / musicDuration * musicCurrentTime) / changeWidth;
        return newDuration;
    },

    deactivate() {
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].firstElementChild.getAttribute("class") === "buffer makeTaller active") {
                songs[i].firstElementChild.setAttribute("class", "buffer makeTaller");
            }
        }
    },
    
    playSong(event) {
        for (let i = 0; i < songs.length; i++) {
            if (event.target.parentElement.contains(audio[i])) {
                event.target.parentElement.lastElementChild.play();
            } 
        }
    },

    stopMusic() {
        audio.forEach(song => {
            song.pause();
            song.currentTime = 0;
        });
    },
    
    songVitals(event) {
        event.target.nextElementSibling.ontimeupdate = function() {songDuration(event)};

        function songDuration(event) {
            const duration = document.getElementById("progressBar");
            const songCounter = document.getElementById("duration");
            let s = parseInt(event.target.nextElementSibling.currentTime % 60);
            let m = parseInt(event.target.nextElementSibling.currentTime / 60) % 60;
    
            if (s < 10) {
                s = "0" + s;
            }

            if (s === 50) {
                event.target.nextElementSibling.pause();
                event.target.nextElementSibling.currentTime = 0;
            }
            songCounter.innerHTML = `${m}:${s}`;
            duration.style.width = parseInt(Math.floor(musicPlayer.dynamicWidth(event))) + "px";
        }
    }
}

// The addEventListener with a for loop that will control the functioanlity of the player. //////////////////////////////////////////////////////////addEventListener("click", () => {
for (let i = 0; i < songs.length; i++) {
    songs[i].addEventListener("click", (event) => {
        musicPlayer.stopMusic();
        musicPlayer.deactivate();
        musicPlayer.activate(event);
        musicPlayer.playSong(event);
        musicPlayer.songVitals(event);
    });
}

        
