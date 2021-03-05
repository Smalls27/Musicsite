// Variables that will be used in this project. //////////////////////////////////////////////////////////
const songs = document.getElementById("playlist").children;
const songPlaying = document.getElementById("playlist").childNodes;
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
    }    
}

// The addEventListener with a for loop that will control the functioanlity of the player. //////////////////////////////////////////////////////////addEventListener("click", () => {
for (let i = 0; i < songs.length; i++) {
    songs[i].addEventListener("click", (event) => {
        musicPlayer.stopMusic();
        musicPlayer.deactivate();
        musicPlayer.activate(event);
        musicPlayer.playSong(event);
    });
}
            
        
