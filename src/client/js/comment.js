import "../scss/styles.scss"
import regeneratorRuntime from "regenerator-runtime";

const comments=document.getElementById("comments")
const commentsText=comments.querySelector("input")
const video=document.querySelector("video")
const videoId=video.dataset.id
const commentsBtn=comments.querySelector("button")
const deleteICON = document.querySelectorAll("#deleteICON")
const editICON=document.querySelectorAll("#editICON")
const replyICON= document.querySelectorAll("#replyICON")


const editComment = (event) => {
    const ID=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id
    const selectedCommentsBox = document.querySelector(`[data-id="${ID}"]`)
    const CommentCotentedit = selectedCommentsBox.querySelector("#CommentContent")
    const removeElement = selectedCommentsBox.querySelector("#ICON")
    const iconBox=selectedCommentsBox.querySelector("#CommentIcon")
    const parent=event.target.parentElement.parentElement.parentElement.parentElement
    removeElement.remove()
    const spanValue=CommentCotentedit.querySelector("span").innerText
    CommentCotentedit.querySelector("span").remove()
    const input = document.createElement("input")
    input.id="editCommentInput"
    input.type="text"
    input.value=spanValue
    input.required=true
    CommentCotentedit.appendChild(input)
    const span=document.createElement("span")
    const icon = document.createElement("i")
    icon.className="far fa-check-square"
    icon.id="editICON"
    const div = document.createElement("div")
    div.id="ICON"
   
    iconBox.prepend(div)
    div.appendChild(span)
    span.appendChild(icon)

   
    icon.addEventListener("click", async()=>{
        const EditINPUT=parent.querySelector("#editCommentInput")
        const EditINPUTValue=EditINPUT.value
        location.reload()
    await fetch(`/video/${ID}/comment/edit`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({EditINPUTValue})
        })
    

        
       
    
            
        })
    
}
    
    
    
  




const deleteComment = async(event) => {
    const ID=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id
    await fetch(`/video/${videoId}/comment/delete`, {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({ID})
        
    })
    const selectedCommentsBox = document.querySelector(`[data-id="${ID}"]`)
    selectedCommentsBox.remove() 
}


const fetchComment = async (event) => {
    event.preventDefault()
    const commentsContent=commentsText.value
   const response = await  fetch(`/video/${videoId}/comment/write`, {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({commentsContent})
    })

    const json = await response.json()
    let img
    commentsText.value=""
    if(response.status ===200){
            const divBox=document.createElement("div")
            divBox.dataset.id=json.commentid
            divBox.id="commentsBox"
            const BoxColumn = document.createElement("div")
            BoxColumn.id="commentsColumn"
            const a = document.createElement("a")
       
            a.href=`/user/${json.ownerID}`
            const Writer = document.createElement("div")
            Writer.id="commentsWriter"

            if(json.avatarURL){ 
               img = document.createElement("img")
            img.src=`${json.avatarURL}`}
            else{
               img = document.createElement("span")
            img.innerText="😀"
        }
           
            const span = document.createElement("span")
            span.innerText=json.username
            const divContent = document.createElement("div")
            divContent.id="commentsContent"
            const divContent2 = document.createElement("span")
            divContent2.id="CommentContent"

            const ContentSpan = document.createElement("span")
            ContentSpan.innerText=commentsContent
            
           
        
            const divIcon = document.createElement("div")
            divIcon.id="CommentIcon"
            

            const divIcon2= document.createElement("div")
            divIcon2.id="ICON"
            
        
        
        
            const span3 = document.createElement("span")
            const icon2 = document.createElement("i")
            icon2.className="fas fa-edit"
            span3.id="editICON"
            const span4 = document.createElement("span")
            span4.innerText="❌"
            
            const remainTime=document.createElement("div")
            remainTime.innerText="방금 전"
            remainTime.id="time-remaining"
            
            commentsContainer.prepend(divBox)
            divBox.appendChild(BoxColumn)
            BoxColumn.appendChild(a)
            a.appendChild(Writer)
            Writer.appendChild(img)
            Writer.appendChild(span)
            BoxColumn.appendChild(divContent)
            divContent.appendChild(divContent2)
            divContent.appendChild(divIcon)
            divContent2.appendChild(ContentSpan)
            divIcon.append(divIcon2)
            divIcon.appendChild(remainTime)
            divIcon2.appendChild(span3)
            divIcon2.appendChild(span4)
            span4.id="deleteICON"
            span3.appendChild(icon2)

            icon2.addEventListener("click", editComment)
            span4.addEventListener("click", deleteComment)
        
        
            
        
        
        
    }

}
commentsBtn.addEventListener("click", fetchComment)
deleteICON.forEach(function(ICON){
    ICON.addEventListener("click", deleteComment)
})
editICON.forEach(function(ICON){
  ICON.addEventListener("click", editComment)  
})
replyICON.forEach(function(ICON){
    ICON.addEventListener("click", replyComment)
})
