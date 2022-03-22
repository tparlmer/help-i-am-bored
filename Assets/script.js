var searchActBtn = document.getElementById("searchActivity");
var searchBookBtn = document.getElementById("searchBooks");
var saveBtn = document.getElementById("saveBtn");
var sendEmailBtn = document.getElementById("sendEmail");
var noteDiv = document.getElementById("notesId");
let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
const dt = new Date();

// On load function to display saved notes from local storage
window.addEventListener('load', (event) => {
    document.getElementById("searchDiv").style.display = "none";
    document.getElementById("notesDiv").style.display = "none";
    savedNotesJson = JSON.parse(localStorage.getItem("notes"));
    console.log("savedNotesJson",savedNotesJson);
    noteDiv.value = savedNotesJson;
})

helpButton.addEventListener("click",function(){
    document.getElementById("searchDiv").style.display = "block";
    document.getElementById("homeDiv").style.display = "none";
    document.getElementById("notesDiv").style.display = "block";
})

searchActBtn.addEventListener("click",function(){
    fetch("http://www.boredapi.com/api/activity/")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        divVar = document.createElement("div");
        contentVar = document.createElement("p");
        var content = data.activity + "\r\n" + data.type +  "\r\n" + data.link;
        console.log(content);
        contentVar.textContent = "Activity: " + data.activity;
        contentVar.textContent += "Type: " + data.type;

        console.log("data.link"+data.link);
        if(data.link != null && data.link != '') {
            contentVar.textContent += "Link: <a href='" + data.link + "'/>";
        }else {
            linkVar = document.createElement("a");
            linkVar.textContent = "https://www.google.com/"
            contentVar.textContent += "Link: ";
            contentVar.append(linkVar);
        }
        divVar.append(contentVar);
        document.getElementById("activities").append(divVar);
    })
})

searchBookBtn.addEventListener("click",function(){
     
    fetch("https://openlibrary.org/search/authors.json?q==j%20k%20rowling")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log("data"+data.docs[0].name);
        divVar2 = document.createElement("div");
        contentVar2 = document.createElement("p");
        var content2 = data.docs[0].name + "\r\n" + data.docs[0].top_work;
        console.log(content2);
        contentVar2.textContent = content2;       
        document.getElementById("books").appendChild(divVar2); 
    })
})

saveBtn.addEventListener("click",function(){
    console.log("noteText",document.getElementById("notesId"));   
    noteText = noteDiv.value;
    console.log("noteText",noteText);
    savedNotes.push(noteText);
    savedNotesJson = JSON.parse(localStorage.getItem("notes"));
    console.log("savedNotesJson",savedNotesJson);

    localStorage.setItem("notes",JSON.stringify(savedNotes));
})

sendEmail.addEventListener("click",function(){
    noteText = noteDiv.value;
    var email = document.createElement("a");
    var userEmail = "hguyguy123@yopmail.com";
    email.href = "mailto:"+userEmail + "?subject=Notes from "+ dt.getDate + "&body=" + noteText;
    console.log("emailText",email);
   
    sendEmailBtn.appendChild(email);
  //  email.click();
}) 
