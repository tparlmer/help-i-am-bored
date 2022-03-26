var searchActBtn = document.getElementById("searchActivity");
var searchBookBtn = document.getElementById("searchBooks");
var saveBtn = document.getElementById("saveBtn");
var noteDiv = document.getElementById("notesId");
let savedNotes = localStorage.getItem("notes") || "";
const dt = new Date();

// On page load, hide all the sections except the Welcome Div
// On page load, display saved notes from local storage
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

// On click of Search Activity button, fire Bored Api 
searchActBtn.addEventListener("click",function(){
    document.getElementById("nxtAct").style.display = "block"; 
    document.getElementById("searchResults").style.display = "block"; 
    document.getElementById("actDiv").style.display = "block";
    document.getElementById("bookDiv").style.display = "none"; 
    document.getElementById("searchDiv").style.display = "none";
    fireActSearch();    
})

// When Next button is clicked on activities screen, fire the Bored Api again and get a random activity
nxtAct.addEventListener("click",function(){
    fireActSearch();
})

// Go back to Search buttons screen
backToButtons.addEventListener("click",function(){
    document.getElementById("searchResults").style.display = "none"; 
    document.getElementById("searchDiv").style.display = "block"; 
})

// Display the screen to input author name
searchBookBtn.addEventListener("click",function(){
    console.log("searchBookBtn");
    document.getElementById("searchResults").style.display = "block";
    document.getElementById("searchDiv").style.display = "none";
    document.getElementById("bookDiv").style.display = "block"; 
    document.getElementById("actDiv").style.display = "none";
    document.getElementById("bookName").value = '';
    document.getElementById("books").textContent = '';
})

// On click of Search Book button, fire Open Library Api
searchBook.addEventListener("click",function(){
    fireBookSearch();
})

// Save notes entered in local storage
saveBtn.addEventListener("click",function(){
    console.log("noteText",document.getElementById("notesId")); 

    noteText = noteDiv.value;
    localStorage.setItem("notes",noteText);
}) 

// Bored Api
function fireActSearch() {
    fetch("https://cors-anywhere.herokuapp.com/http://www.boredapi.com/api/activity/")
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

        document.getElementById("actName").textContent = "Activity : " + data.activity;
        document.getElementById("actType").textContent = "Type of Activity : " + data.type;
        document.getElementById("actInfo").textContent = "Interested in learning more about the activity? ";
        
        linkVar = document.createElement("a");
        linkVar.textContent = "Learn More";
        linkVar.setAttribute("href",linkText);
        linkVar.setAttribute("target","_blank");
        document.getElementById("actLink").innerHTML = "";
        document.getElementById("actLink").appendChild(linkVar);

    })
}

// Open Library Api
function fireBookSearch() {
    bookName = document.getElementById("bookName").value;

    if(bookName != null && bookName != '') {
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
                    const resultEntries = data.entries.filter(word => word.description);

                    console.log("resultEntries",resultEntries); 
                    
                    if(resultEntries && resultEntries.length>0) {
                        ulVar = document.createElement("ul");
                        document.getElementById("books").textContent = '';
                        for(i=0;i<resultEntries.length;i++) {

                            if(!(resultEntries[i].title != null && resultEntries[i].title != undefined &&
                                resultEntries[i].links != null)) {
                                continue;
                            }

                            var descStr = resultEntries[i].description + "";
                            if(descStr.toUpperCase() === "[OBJECT OBJECT]") {
                                continue;
                            }

                            console.log("resultEntries"+resultEntries[i].title + resultEntries[i].links[0].url);  
                            
                          /*  liVar = document.createElement("li"); 
                            liVar.setAttribute("id",resultEntries[i]);*/

                            liDiv = document.createElement("div");

                            divHVar = document.createElement("h2");  
                            divHVar.setAttribute("style","background-color: coral;font-weight: bold;margin: 0px;");                       
                            divHVar.textContent = resultEntries[i].title;

                            divPVar = document.createElement("p");
                            divPVar.setAttribute("style","background-color: #ef595947;color: black;margin: 0px;");                           
                            divPVar.textContent = resultEntries[i].description;

                            liDiv.appendChild(divHVar);
                            liDiv.appendChild(divPVar);

                          //  liVar.append(liDiv);

                           /* liHVar = document.createElement("h3");                           
                            liHVar.textContent = resultEntries[i].title;
                            liVar.appendChild(liHVar);
                            descDivVar = document.createElement("div");
                            
                            var indexChar = resultEntries[i].description.lastIndexOf('\r\n');
                            var descVar = resultEntries[i].description;
                            if(indexChar != -1) {
                                descVar = resultEntries[i].description.substring(0, resultEntries[i].description.indexOf('\r\n'));
                            } 
                            
                            descDivVar.textContent = resultEntries[i].description;
                            liVar.appendChild(descDivVar);*/
                           // ulVar.appendChild(liVar);

                            
                            document.getElementById("books").appendChild(liDiv);                      
                        }              
                    } else {
                        document.getElementById("books").textContent = '';
                        document.getElementById("books").textContent = "No books found for this author";
                    }
                })
            } else {
                document.getElementById("books").textContent = '';
                document.getElementById("books").textContent = "No books found for this author";
            }
        }) 
    }
    
}

/*
document.querySelector("#container1").addEventListener("click", function() {
    document.querySelector("#helpButton").style.display = "block";
}) */

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    document.getElementById("notesId").value = '';
    localStorage.removeItem("notes");
}

// Start file download.
document.getElementById("downloadBtn").addEventListener("click", function(){
    var text = document.getElementById("notesId").value;
    var filename = "Notes - " + dt.toLocaleDateString();
    
    download(filename, text);
}, false);

