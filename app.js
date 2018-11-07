function getSubjects(){
    for (var i = 0; i < 15; i++){
        var div = document.createElement('div');
        div.className = 'trigger';
        div.id = 'trigger'+i;
        div.onclick = "document.getElementById('id01').style.display='block'"
        div.textContent = 'Asignatura' + i;
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

