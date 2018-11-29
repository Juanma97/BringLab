function getSubjects2() {
    document.querySelector(".loading").style.visibility = "visible";
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
            div.onclick = "document.getElementById('id0'+i).style.display='block'"
            div.textContent = childData.subjects[j];
            var container = document.getElementById("container-subjects");
            container.appendChild(div);
            var modal = document.querySelector(".modal");
            var trigger = document.querySelector("#trigger"+i);
            console.log(trigger);
            i++;
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
        document.querySelector(".loading").style.visibility = "hidden";

    });
});
}
function mensajes() {
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Messages');
    var hr = document.createElement('hr');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData.receiver == firebase.auth().currentUser.uid){
            console.log("hola")
            var h2 = document.createElement('h2');
            var p = document.createElement('p');
            h2.textContent = "Mensaje "+i;
            p.textContent = childData.message;
            document.getElementById('message').appendChild(hr);
            document.getElementById('message').appendChild(h2);
            document.getElementById('message').appendChild(p);
            i++;
        }
    });
    i--;
    document.getElementById('count').textContent="Mensajes: "+i;
    
});
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


function getTeachers() {
    document.querySelector(".loading").style.visibility = "visible";
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Students');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("child", childData.subjects)
        for(let j in childData.teachers){
            console.log("j", childData.teachers[j]);
        
        console.log(firebase.auth().currentUser);
        if(childData.uid == firebase.auth().currentUser.uid){
            var div = document.createElement('div');
            div.className = 'trigger';
            div.id = 'trigger'+i;
            div.onclick = "document.getElementById('id01').style.display='block'"
            div.textContent = childData.teachers[j];
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
        document.querySelector(".loading").style.visibility = "hidden";      
        i++;
    });
});


}

function getReservations() {
    document.querySelector(".loading").style.visibility = "visible";
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Students');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("child", childData.reservas)
        for(let j in childData.reservas){
            console.log("j", childData.reservas[j]);
        
        console.log(firebase.auth().currentUser);
        if(childData.uid == firebase.auth().currentUser.uid){
            var div = document.createElement('div');
            div.className = 'trigger';
            div.id = 'trigger'+i;
            div.onclick = "document.getElementById('id01').style.display='block'"
            div.textContent = childData.reservas[j];
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
            
            i++;
        }
        document.querySelector(".loading").style.visibility = "hidden";      
    });
});


}


function getData() {
    document.querySelector(".loading").style.visibility = "visible";
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Labs');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("child", childData.name)
        if(childData.uid == firebase.auth().currentUser.uid){
            var div = document.createElement('div');
            div.className = 'trigger';
            div.id = 'trigger'+i;
            div.onclick = "document.getElementById('id01').style.display='block'"
            div.textContent = childData.name;
            var container = document.getElementById("container-reservations");
            console.log("container", container)
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
            
            i++;
        document.querySelector(".loading").style.visibility = "hidden";      
    });
});


}

function getStudents() {
    document.querySelector(".loading").style.visibility = "visible";
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Teachers');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("child", childData.subjects)
        for(let j in childData.subjects){
            var titulo = document.createElement('h3');
            titulo.innerHTML = childData.subjects[j].name;
            var tituloContainer = document.getElementById("container-subjects");
            tituloContainer.appendChild(titulo);
            console.log("data", childData.subjects[j].students)
            for(let x in childData.subjects[j].students){
                console.log("x", childData.subjects[j].students[x]);
                
                if(childData.uid == firebase.auth().currentUser.uid){
                    var div = document.createElement('div');
                    div.className = 'trigger';
                    div.id = 'trigger'+i;
                    div.onclick = "document.getElementById('id01').style.display='block'"
                    div.textContent = childData.subjects[j].students[x];
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
        }
        document.querySelector(".loading").style.visibility = "hidden";      
        i++;
    });
});



}

function getSubjectsTeacher() {
    document.querySelector(".loading").style.visibility = "visible";
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Teachers');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("child", childData.subjects)
        for(let j in childData.subjects){
            console.log("data", childData.subjects[j].name)
                
            if(childData.uid == firebase.auth().currentUser.uid){
                var div = document.createElement('div');
                div.className = 'trigger';
                div.id = 'trigger'+i;
                div.onclick = "document.getElementById('id01').style.display='block'"
                div.textContent = childData.subjects[j].name;
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
        document.querySelector(".loading").style.visibility = "hidden";      
        i++;
    });
});


}

function getTut() { 
    document.querySelector(".loading").style.visibility = "visible";
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Teachers');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log("child", childData.tutoriaTime)
        for(let j in childData.tutoriaTime){
            console.log("p", childData.tutoriaTime[j]) 
                
                if(childData.uid == firebase.auth().currentUser.uid){
                    var div = document.createElement('div');
                    div.className = 'trigger';
                    div.id = 'trigger'+i; 
                    div.onclick = "document.getElementById('id01').style.display='block'"
                    div.textContent = childData.tutoriaTime[j]
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
        document.querySelector(".loading").style.visibility = "hidden";      
        i++;
    });
});


}

    function addTuto() {
        var database = firebase.database();
    
        database.ref('Messages/' + document.getElementById('texto').value+firebase.auth().currentUser.uid).set({
          message: document.getElementById('texto').value,
          sender: firebase.auth().currentUser.uid,
          receiver : receptor
        });
        document.getElementById('texto').value=''
    }






