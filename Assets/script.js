var searchActBtn = document.getElementById("searchActivity");
var searchBookBtn = document.getElementById("searchBooks");
var saveBtn = document.getElementById("saveBtn");
var noteDiv = document.getElementById("notesId");
let savedNotes = localStorage.getItem("notes") || "";
const dt = new Date();


window.addEventListener('load', (event) => {
    document.getElementById("searchDiv").style.display = "none";
    document.getElementById("notesDiv").style.display = "none"; 
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("nxtAct").style.display = "none"; 
    noteDiv.value = savedNotes;
})

helpButton.addEventListener("click",function(){
    document.getElementById("searchDiv").style.display = "block";
    document.getElementById("homeDiv").style.display = "none";
    document.getElementById("notesDiv").style.display = "block";
})

searchActBtn.addEventListener("click",function(){
    document.getElementById("nxtAct").style.display = "block"; 
    document.getElementById("searchResults").style.display = "block"; 
    document.getElementById("actDiv").style.display = "block";
    document.getElementById("bookDiv").style.display = "none"; 
    document.getElementById("searchDiv").style.display = "none";
    fireActSearch();    
})

nxtAct.addEventListener("click",function(){
    fireActSearch();
})

backToButtons.addEventListener("click",function(){
    document.getElementById("searchResults").style.display = "none"; 
    document.getElementById("searchDiv").style.display = "block"; 
})

searchBookBtn.addEventListener("click",function(){
    console.log("searchBookBtn");
    document.getElementById("searchResults").style.display = "block";
    document.getElementById("searchDiv").style.display = "none";
    document.getElementById("bookDiv").style.display = "block";
    document.getElementById("nxtBook").style.display = "block"; 
    document.getElementById("actDiv").style.display = "none";

})

searchBook.addEventListener("click",function(){
    fireBookSearch();
})

nxtBook.addEventListener("click",function(){
    fireBookSearch();
})

saveBtn.addEventListener("click",function(){
    console.log("noteText",document.getElementById("notesId")); 

    noteText = noteDiv.value;
    // console.log("noteText",noteText);

    // if(savedNotes.indexOf(noteText) === -1) {
    //     savedNotes.push(noteText);
    // }
   // localStorage.removeItem("notes");
    localStorage.setItem("notes",noteText);
}) 

function createActRows(elemnt,textCnt,typeEl) {
    console.log("textCnt",textCnt);
    elemntVar = document.createElement(elemnt);
    if(typeEl === "text"){
        elemntVar.textContent = textCnt;
    }
    if(typeEl === "link") {
        linkVar = document.createElement("a");
        linkVar.textContent = "Learn More";
        linkVar.setAttribute("href",textCnt);
        linkVar.setAttribute("target","_blank");
        elemntVar.append(linkVar);
    }
    console.log("elemntVar",elemntVar);
    return elemntVar;
}

function fireActSearch() {
    fetch("http://www.boredapi.com/api/activity/")
    .then(function(response){
        return response.json();
    })
    .then(function(data){

        linkText = '';
        if(data.link != null && data.link != '') {
            linkText = data.link;
        }else {
            linkText = "https://www.google.com/search?q=" + data.activity;
        }

        document.getElementById("actName").textContent = data.activity;
        document.getElementById("actType").textContent = data.type;
        
        linkVar = document.createElement("a");
        linkVar.textContent = "Learn More";
        linkVar.setAttribute("href",linkText);
        linkVar.setAttribute("target","_blank");
        document.getElementById("actLink").innerHTML = "";
        document.getElementById("actLink").append(linkVar);

    })
}

function fireBookSearch() {
    bookName = document.getElementById("bookName").value;
    fetch("https://openlibrary.org/search/authors.json?q=="+bookName)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data != null && data.docs.length > 0) {
            console.log("data"+data.docs[0].key);

            fetch("https://openlibrary.org/authors/"+ data.docs[0].key + "/works.json")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log("data2"+data.entries);
                const resultEntries = data.entries.filter(word => word.description);

                console.log("resultEntries"+resultEntries.length); 
                
                if(resultEntries && resultEntries.length>0) {
                    for(i=0;i<resultEntries.length;i++) {
                        if(resultEntries.title != null) {
                            console.log("resultEntries"+resultEntries.title); 
                            document.getElementById("bookName").textContent = resultEntries[0].title;
                            document.getElementById("bookDesc").textContent = resultEntries[0].description;

                            linkVar = document.createElement("a");
                            linkVar.textContent = resultEntries[0].links[0].url;
                            linkVar.setAttribute("href",resultEntries[0].links[0].url);
                            linkVar.setAttribute("target","_blank");
                            document.getElementById("bookLink").innerHTML = "";
                            document.getElementById("bookLink").append(linkVar);
                        }                       
                    }                   
                }
            })
        } else {
            console.log("No records found");
        }
    }) 
}

document.querySelector("#container1").addEventListener("click", function() {
    document.querySelector("#helpButton").style.display = "block";
})