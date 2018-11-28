var usuario='';
function getSubjects2() {
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Students');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("child", childData.subjects)
        for(let j in childData.subjects){
            console.log("j", childData.subjects[j]);
        
        console.log(firebase.auth().currentUser);
        if(childData.uid == firebase.auth().currentUser.uid){
            var div = document.createElement('div');
            div.className = 'trigger';
            div.id = 'trigger'+i;
            div.onclick = "document.getElementById('id01').style.display='block'"
            div.textContent = childData.subjects[j];
            var container = document.getElementById("container-subjects");
            container.appendChild(div);
            var modal = document.querySelector(".modal");
            var trigger = document.querySelector("#trigger"+i);
            console.log(trigger);
            var closeButton = document.querySelector(".close-button");
        }
            function toggleModal() {
                modal.classList.toggle("show-modal");
            }
    
            function windowOnClick(event) {
                if (event.target === modal) {
                    toggleModal();
                }
            }

            if(trigger && closeButton){
                closeButton.addEventListener("click", toggleModal);
                trigger.addEventListener("click", toggleModal);
            }
            window.addEventListener("click", windowOnClick);
        }
        i++;
    });
});
}
function send() {
    var database = firebase.database();
    var students = database.ref('Students');
    var teachers = database.ref('Teachers');
    var receptor;
    students.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childStudent = childSnapshot.val();
            if( childStudent.name== usuario){
                receptor=childStudent.uid;
            }
        });
    });
    teachers.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childStudent = childSnapshot.val();
            if( childStudent.name== usuario){
                receptor=childStudent.uid;
            }
        });
    });
    database.ref('Messages/' + document.getElementById('texto').value+firebase.auth().currentUser.uid).set({
      message: document.getElementById('texto').value,
      sender: firebase.auth().currentUser.uid,
      receiver : receptor
    });
    document.getElementById('texto').value=''
  }

function mensajes() {
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Messages');
    var students = database.ref('Students');
    var teachers = database.ref('Teachers');
    var closeButton = document.querySelector(".close-button");
    var enviar = document.querySelector(".trigger");
    var hr = document.createElement('hr');
    var modal = document.querySelector(".modal");
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData.receiver == firebase.auth().currentUser.uid){
            var h2 = document.createElement('h3');
            var p = document.createElement('p');
            students.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childStudent = childSnapshot.val();
                    if( childStudent.uid== childData.sender){
                        h2.textContent=childStudent.name;
                    }
                });
            });
            teachers.on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childStudent = childSnapshot.val();
                    if( childStudent.uid== childData.sender){
                        h2.textContent=childStudent.name;
                    }
                });
            });
            p.textContent = childData.message;
            
            h2.id = 'id'+i;
            h2.addEventListener("click", windowOnClick);
            document.getElementById('message').appendChild(hr);
            document.getElementById('message').appendChild(h2);
            document.getElementById('message').appendChild(p);
            i++;
        }
        
    });
    i--;
    
    document.getElementById('count').textContent="Mensajes: "+i;
    
});
function windowOnClick(event) {
    if(modal.className==='modal'){
        modal.className= 'modal show-modal';
        usuario=event.target.textContent;
    }else{
        modal.className= 'modal';
    }
}
closeButton.addEventListener("click", windowOnClick);
enviar.addEventListener("click", windowOnClick);
}

function login(){
    document.querySelector(".loading").style.visibility = "visible";
    document.querySelector(".lds-ring").style.visibility = "visible";
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;
    firebase.auth().signInWithEmailAndPassword(user, pass).then(function(){

    })
    .catch(function(error) {
        alert("Usuario o contraseña erroneos");
    });
    
}
function signout(){
    firebase.auth().signOut().then(function(){
        location.href="index.html";
    });
}
firebase.auth().onAuthStateChanged(function(user){
    if(window.location.href.includes("index.html")){
        if(user && user.email.includes("@alu.ulpgc")){
            userUID = user.uid;
            location.href="mainStudent.html";
        }else if(user && user.email.includes("@ulpgc")){
            userUID = user.uid;
            location.href="mainTeacher.html";
        }
    }
});
var modal = document.querySelector(".modal1");
var trigger = document.querySelector(".trigger1");
var closeButton = document.querySelector(".close-button1");

function toggleModal() {
    modal.classList.toggle("show-modal1");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
if(trigger && closeButton){
    closeButton.addEventListener("click", toggleModal);
    trigger.addEventListener("click", toggleModal);
}
window.addEventListener("click", windowOnClick)