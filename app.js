var usuario='';
function getReservation(){
    var inforpanel = document.getElementById("container-subjects");
    while (inforpanel.firstChild) {
        inforpanel.removeChild(inforpanel.firstChild);
    }
    var i = 1;
    var database = firebase.database();
    var leadsRef = database.ref('Students');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        for(let j in childData.reservas){
            console.log("j", childData.reservas[j].reserva3);
        
        console.log(firebase.auth().currentUser);
        if(childData.uid == firebase.auth().currentUser.uid){
            var div = document.createElement('div');
            document.getElementById('reserva').textContent=childData.reservas[j];
            div.className = 'trigger';
            div.id = 'trigger'+i;
            div.onclick = "document.getElementById('id01').style.display='block'"
            div.textContent = childData.reservas[j].reserva3;
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
function cancelar(){

    var actual=document.getElementById("reserva").textContent;
    var database = firebase.database();
    var students = database.ref('Students');
    var labs = database.ref('Labs');
    var receptor;
    students.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childStudent = childSnapshot.val();
            if( childStudent.uid== firebase.auth().currentUser.uid){
                for(var j in childStudent.reservas){
                    if(childStudent.reservas[j]==actual){
                        console.log(childStudent.reservas[j]);
                        database.ref('Students/'+childSnapshot.key+"/reservas/reserva5").remove();
                    }
                }
            }
        });
    });
    var labo=actual.split('|')[0].trim();
    var puesto=actual.split('|')[1].trim();
    labs.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childStudent = childSnapshot.val();
            if( childStudent.name== labo){
                console.log('Labs/'+childSnapshot.key+"/puestos/"+puesto);
                database.ref('Labs/'+childSnapshot.key+"/puestos/"+puesto).set({
                    estado: "libre" 
                });
                getReservation();
            }
        });
    });
}

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
    leadsRef.once('value', function(snapshot) {
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
            console.log("j", childData.reservas[j].reserva3);
        
        console.log(firebase.auth().currentUser);
        if(childData.uid == firebase.auth().currentUser.uid){
            var div = document.createElement('div');
            div.className = 'trigger';
            div.id = 'trigger'+i;
            div.onclick = "document.getElementById('id01').style.display='block'"
            div.textContent = childData.reservas[j].reserva3;
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






