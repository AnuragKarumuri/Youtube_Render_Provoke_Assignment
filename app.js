
const apiKey = 'AIzaSyAVgzImy_m4lReoEOfvvI5Gi6DvpG7G-0Y';
const videoId = '6ZBa0Q330Lg';

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    updateDuration();
}

function onPlayerReady(event) {
    event.target.playVideo();

    setInterval(function () {
        updateDuration();
        updateCurrentTime();
    }, 1000); // Update every second
}

function onPlayerStateChange(event) {
    // sample
}

function loadYouTubeApi() {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.onload = function () {
        onYouTubeIframeAPIReady();
    };
    document.head.appendChild(script);
}

function updateDuration() {
    const duration = formatTime(player.getDuration());
    document.getElementById('duration').innerText = duration;
}

function updateCurrentTime() {
    const currentTime = formatTime(player.getCurrentTime());
    document.getElementById('currentTime').innerText = currentTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function playPause() {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function muteUnmute() {
    if (player.isMuted()) {
        player.unMute();
    } else {
        player.mute();
    }
}

function setVolume() {
    let volume = document.getElementById('volumeControl').value;
    player.setVolume(volume);
}


loadYouTubeApi();
