// Variables globales
var usuario="";
var subjectSelected = 0;
var labSelected = 0;
var subjects = ["Redes de Computadores", "Ingeniería del Software II", "Fundamentos de los computadores"]
var labs = 
            [
                [
                    "Lab. 3-1", "Lab. 3-2" // subjects[0]
                ], 
                [
                    "Lab. 3-3", "Lab. 3-4" // subjects[1]
                ],
                [
                    "Lab. 1-2", "Lab. 1-3" // subjects[2]
                ]
            ];
var labInformation =            
                [
                    [
                        "Información Lab. 3-1", "Información Lab. 3-2" // subjects[0]
                    ], 
                    [
                        "Información Lab. 3-3", "Información Lab. 3-4" // subjects[1]
                    ],
                    [
                        "Información Lab. 1-2", "Información Lab. 1-3" // subjects[2]
                    ]
                ];

// Operaciones de la vista

function loadData() {
    // El menú de las asignaturas se carga sólo una vez
    var subjectsDropDownMenu = document.getElementById("dropdown-subjects");
    var i = 0;
    var database = firebase.database();
    var leadsRef = database.ref('Students');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData.uid == firebase.auth().currentUser.uid){
            for (var j in childData.subjects){
                var subjectOption = document.createElement("option");
                subjectOption.value = i++;
                subjectOption.text = childData.subjects[j];
                subjectsDropDownMenu.add(subjectOption);
            }
        }
        });
    });
    subjectSelected = 0;
    loadDropDownLabData();
    reloadLabInformation();
}

// Cada vez que se cambie de asignatura, recargar los labs que tiene
function loadDropDownLabData() {
    var labsDropDownMenu = document.getElementById("dropdown-labs");
    var i = 0;
    var database = firebase.database();
    var leadsRef = database.ref('Labs');
    var classes= database.ref('Classrooms');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
        var subjectOption = document.createElement("option");
        subjectOption.value = i++;
        subjectOption.text = childData.name;
        labsDropDownMenu.add(subjectOption);
        });
    });
    classes.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
            var subjectOption = document.createElement("option");
            subjectOption.value = i++;
            subjectOption.text = childData.name;
            labsDropDownMenu.add(subjectOption);
        });
    });
    reloadLabInformation();
}

// Cada vez que se cambie de lab, recargar la info que tiene
function reloadLabInformation() {
    var e = document.getElementById("dropdown-labs");
    var strUser = e.options[e.selectedIndex].text;
    var database = firebase.database();
    var leadsRef = database.ref('Labs');
    var classes = database.ref('Classrooms');
    var inforpanel = document.getElementById("container-info");
    while (inforpanel.firstChild) {
        inforpanel.removeChild(inforpanel.firstChild);
    }
    leadsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData.name==strUser){
            console.log(childData.puestos);
            var i=1;
            for(var j in childData.puestos){
                
                console.log(childData.puestos[j].estado);
                var div= document.createElement('div');
                div.id = 'trigger'+i;
                div.className="trigger";
                if(childData.puestos[j].estado=="libre"){
                    div.className+=" verde";
                    div.textContent=j;
                    inforpanel.appendChild(div);
                    var modal = document.querySelector(".modal");
                    var trigger = document.querySelector("#trigger"+i);
                    var closeButton = document.querySelector(".close-button");
                    var enviar = document.querySelector(".trigger");
                    console.log(trigger);
                    document.getElementById("puesto").textContent="¿Esta seguro de que desea reservar el "+trigger.textContent+"?";
                    function toggleModal() {
                        modal.classList.toggle("show-modal");
                    }
                    
                    function windowOnClick(event) {
                        if (event.target === modal) {
                            toggleModal();
                        }
                        usuario=event.target.textContent;
                    }
        
                    if(trigger && closeButton){
                        closeButton.addEventListener("click", toggleModal);
                        trigger.addEventListener("click", toggleModal);
                    }
                    window.addEventListener("click", windowOnClick);
                    enviar.addEventListener("click", windowOnClick);
                }else if(childData.puestos[j].estado=="ocupado"){
                    div.className+=" rojo";
                    div.textContent=j;
                    inforpanel.appendChild(div);
                }else{
                    div.className+=" amarillo";
                    div.textContent=j;
                    inforpanel.appendChild(div);
                }
                i++;
                
            }
                

        }
        });
    });
    
}
function reservar(){
    
    var e = document.getElementById("dropdown-labs");
    var strUser = e.options[e.selectedIndex].text;
    var str= strUser+" | "+usuario;
    
    var database = firebase.database();
    var students = database.ref('Students');
    var labs = database.ref('Labs');
    var receptor;
    students.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childStudent = childSnapshot.val();
            if( childStudent.uid== firebase.auth().currentUser.uid){
                database.ref('Students/'+childSnapshot.key + "/reservas").child(str).set({
                    reserva3: str 
                });
            }
        });
    });
    labs.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childStudent = childSnapshot.val();
            if( childStudent.name== strUser){
                console.log('Labs/'+childSnapshot.key+"/puestos/"+usuario);
                database.ref('Labs/'+childSnapshot.key+"/puestos/"+usuario).set({
                    estado: "ocupado" 
                });
                usuario="";
                reloadLabInformation();
            }
        });
    });
    
}