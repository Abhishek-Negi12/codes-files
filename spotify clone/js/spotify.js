
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
     if (isNaN(seconds) || seconds < 0) {
          return "00 : 00";
     }

     const minutes = Math.floor(seconds / 60);
     const remainingSeconds = Math.floor(seconds % 60);

     const formattrndMinutes = String(minutes).padStart(2, '0');
     const formattrndSeconds = String(remainingSeconds).padStart(2, '0');

     return `${formattrndMinutes} : ${formattrndSeconds}`;
}

async function getsongs(folder) {
     currFolder = folder;
     let a = await fetch(`http://127.0.0.1:5500/${folder}/`)
     let response = await a.text();
     let div = document.createElement("div")
     div.innerHTML = response;
     let as = div.getElementsByTagName("a")
     // console.log(as)
     songs = []
     for (let index = 0; index < as.length; index++) {
          const element = as[index];
          if (element.href.endsWith(".mp3")) {
               songs.push(element.href.split(`/${folder}/`)[1])
          }
     }

     // show all the songs in the playlist
     let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
     songul.innerHTML = ""
     for (const song of songs) {
          songul.innerHTML = songul.innerHTML + `<li>
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                               <div>  ${song} </div>
                               <div> Abhishek Negi</div>
                            </div>

                            <div class="playnow">
                                <span> Play Now </span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div></li>`;
     }


     // attach  an event listner to each song

     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
          e.addEventListener("click", element => {

               console.log(e.querySelector(".info").firstElementChild.innerHTML);
               playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());

          })
     })


     return songs
}

const playmusic = (track, pause = false) => {
     currentSong.src = `/${currFolder}/` + track
     if (!pause) {
          currentSong.play()
          play.src = "img/pause.svg"
     }
     document.querySelector(".songinfo").innerHTML = track
     document.querySelector(".songtime").innerHTML = "00 : 00" + " / " + "00 : 00"
}

async function displayAlbums() {
     let a = await fetch(`http://127.0.0.1:5500/songs/`)
     let response = await a.text();
     let div = document.createElement("div")
     div.innerHTML = response;
     // console.log(div)
     let anchors = div.getElementsByTagName("a")
     let cardContainer = document.querySelector(".cardContainer")
      let array = Array.from(anchors)
          for (let index = 0; index < array.length; index++) {
               const e = array[index];
               
          if (e.href.includes("/songs/") && !e.href.endsWith("/songs/")) {
               let folder = e.href.split("/").slice(-1)[0];
               //     get the meta deta of the folder

               let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
               let response = await a.json();
               // console.log(response)
               cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path
                                    d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h2> ${response.title} </h2>
                        <p> ${response.description}</p>
                    </div>`
          }
     };

     // load the playlist when ever card is clicked

     Array.from(document.getElementsByClassName("card")).forEach(e => {
          e.addEventListener("click", async item => {
               songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
               playmusic(songs[0])
          })
     })


}


async function main() {

     // get the list of all songs
     await getsongs("songs/cs")
     playmusic(songs[0], true)

     // display all the albums on the page

     displayAlbums()


     // attach an event listner to play , next and previous

     play.addEventListener("click", () => {
          if (currentSong.paused) {
               currentSong.play()
               play.src = "img/pause.svg"
          }
          else {
               currentSong.pause();
               play.src = "img/play.svg"
          }
     })

     // listen for timeupdate event 

     currentSong.addEventListener("timeupdate", () => {
          document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
          document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
     })

     // add an event lestener to seekbar

     document.querySelector(".seekbar").addEventListener("click", e => {
          let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
          document.querySelector(".circle").style.left = percent + "%"
          currentSong.currentTime = ((currentSong.duration) * percent) / 100
     })

     // add event listener for hamburger

     document.querySelector(".hamburger").addEventListener("click", () => {
          document.querySelector(".left").style.left = "0"
     })

     // add event listener for close button

     document.querySelector(".close").addEventListener("click", () => {
          document.querySelector(".left").style.left = "-100%"
     })

     // add event listener for previous  

     previous.addEventListener("click", () => {
          let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
          if ((index - 1) >= 0) {
               playmusic(songs[index - 1])
          }

     })

     // add event listener for next 

     next.addEventListener("click", () => {
          let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
          if ((index + 1) < songs.length) {
               playmusic(songs[index + 1])
          }
     })

     

}
main();