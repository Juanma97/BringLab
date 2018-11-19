var bool=false;
function getSubjects(text){
    for (var i = 0; i < 15; i++){
        var div = document.createElement('div');
        div.className = 'trigger';
        div.id = 'trigger'+i;
        div.onclick = "document.getElementById('id01').style.display='block'"
        div.textContent = text+ i;
        var container = document.getElementById("container-subjects");
        div.style.width = '300px';
        div.style.height = '20px';
        div.style.margin = '16px';
        container.appendChild(div);
        var modal = document.querySelector(".modal");
        var trigger = document.querySelector("#trigger"+i);
        console.log(trigger);
        var closeButton = document.querySelector(".close-button");

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

function login(){
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
        alert("Usuario o contraseña erroneos");
      });
    
}
function signout(){
    firebase.auth().signOut().then(function(){
        location.href="index.html";
    });
}
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        location.href="mainStudent.html";
    }
});
