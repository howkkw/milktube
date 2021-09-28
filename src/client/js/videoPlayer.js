import regeneratorRuntime from "regenerator-runtime";
const playBtn = document.getElementById("playBtn")
const playBtnIcon = playBtn.querySelector("i")
const muteBtn = document.getElementById("muteBtn")
const muteBtnIcon = muteBtn.querySelector("i")
const volumeBar = document.getElementById("volumeBar")
const currentTime = document.getElementById("currentTime")
const durationTime = document.getElementById("durationTime")
const video = document.querySelector("video")
const timeLine = document.getElementById("timeLine")
const fullscreenBtn = document.getElementById("fullscreenBtn")
const fullscreenBtnIcon = fullscreenBtn.querySelector("i")
const videoContainer = document.querySelector(".videoContainer")
const controls = document.querySelector(".controls")
const commentsInput = document.querySelector("#comments input")


let Volume = 0.5
video.volume = Volume
let leaveTimeOUT
let TIMEOUT
const handlePlayBtn = () => {
    if(video.paused) {
        video.play()
        playBtnIcon.className="fas fa-pause"
        
    } else{
    video.pause()
    playBtnIcon.className="fas fa-play"}
    
}

const handleMuteBtn= () => {
    if(video.muted){
        muteBtnIcon.className="fas fa-volume-up"
        video.muted=false
        
    }else{
        muteBtnIcon.className="fas fa-volume-mute"
        video.muted=true
        
    }
    volumeBar.value = video.muted ? 0 : Volume
}

const handleInput = (event) => {
    if(video.muted){
        video.muted=false
        muteBtnIcon.className="fas fa-volume-up"
    }
   Volume = event.target.value
   video.volume= event.target.value

}
new Date().toISOString().substr(11, 8)
const handleLoadedMetaData = () => {
durationTime.innerText=new Date(Math.floor(video.duration)*1000).toISOString().substr(14, 5)
timeLine.max=Math.floor(video.duration)
}

const handleTimeUpdate = () => {
    timeLine.value=Math.floor(video.currentTime)
    currentTime.innerText=new Date(Math.floor(video.currentTime)*1000).toISOString().substr(14, 5)
}
const handleVideoInput = (event) => {
    video.currentTime=event.target.value
}

const handleFullscreen = () => {
    if(!document.fullscreen){
    videoContainer.requestFullscreen()
        fullscreenBtnIcon.className="fas fa-compress"
    }else{
        document.exitFullscreen()
        fullscreenBtnIcon.className="fas fa-expand"
    }
    
}
const handleESC = () => {
    if(!document.fullscreen){
        fullscreenBtnIcon.className="fas fa-expand"
            
        }else{
            fullscreenBtnIcon.className="fas fa-compress"
        }
}
const handleKeyDown= (event) =>{  
    if(event.keyCode===13){
        if(document.activeElement.type !== "text"){
             
            handleFullscreen() 
        }
    }
    if(event.keyCode===32){
       
        if(document.activeElement.type !== "text"){
        handlePlayBtn()
        event.preventDefault()}
    }
    if(event.keyCode===39 && video.currentTime >= video.duration-5){
        video.currentTime = video.duration
        playBtnIcon.className="fas fa-play"
    } 
    if (event.keyCode===39 && video.currentTime < video.duration-5){
        video.currentTime = video.currentTime+5
    }

    if(event.keyCode===37 && video.currentTime<=5){
        video.currentTime=0
        
    }
    if(event.keyCode===37 && video.currentTime>5){
        video.currentTime = video.currentTime-5
    }
    if(event.keyCode===37 && video.currentTime===video.duration)
    {  
        video.currentTime = video.currentTime-5
        video.play()
    }
}

const handleControls= () => {
    clearTimeout(leaveTimeOUT)

    controls.classList.add("showing")
    
    if(TIMEOUT){
        clearTimeout(TIMEOUT)
    
    }
    TIMEOUT= setTimeout(() => {
        controls.classList.remove("showing")}
    , 2000)

}
const handleControlsLeave = () => {
    
   leaveTimeOUT= setTimeout(()=> {
        controls.classList.remove("showing")
    }, 2000)
}

playBtn.addEventListener("click", handlePlayBtn)
video.addEventListener("click", handlePlayBtn)
muteBtn.addEventListener("click", handleMuteBtn)
volumeBar.addEventListener("input", handleInput)
video.addEventListener("loadedmetadata", handleLoadedMetaData)
video.addEventListener("timeupdate", handleTimeUpdate)
timeLine.addEventListener("input", handleVideoInput)
fullscreenBtn.addEventListener("click", handleFullscreen)
document.addEventListener("fullscreenchange", handleESC)
document.addEventListener("keydown", handleKeyDown)
const handleView = async() => {
    const id=video.dataset.id
    await fetch(`/video/${id}/api`, {
        method:"POST"
    })
    playBtnIcon.className="fas fa-play"
}
video.addEventListener("ended", handleView)
video.addEventListener("dblclick", handleFullscreen)
video.addEventListener("mousemove", handleControls)
video.addEventListener("mouseleave", handleControlsLeave)

const comments=document.getElementById("comments")
const commentsText=comments.querySelector("input")
const videoId=video.dataset.id



const fetchComment = (event) => {
    event.preventDefault()
    
}

comments.addEventListener("submit", fetchComment)

