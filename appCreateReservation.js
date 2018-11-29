// Variables globales

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
    var name=document.getElementById("options")[document.getElementById("options").value].text;
    var database = firebase.database();
    var leadsRef = database.ref('Labs');
    var classes = database.ref('Classrooms');
    var labInformationPanel = document.getElementById("container-info");
    console.log(name);
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        if(childData.name==name){
            console.log(childData.puestos);
                

        }
        });
    });
    
    labSelected = document.getElementById("dropdown-labs").value;
    labInformationPanel.innerHTML = "<p>" + labInformation[subjectSelected][labSelected] + "</p>";
}