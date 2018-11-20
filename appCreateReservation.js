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
    subjects.forEach(subject => {
        var subjectOption = document.createElement("option");
        subjectOption.value = i++;
        subjectOption.text = subject;
        subjectsDropDownMenu.add(subjectOption);
    });
    subjectSelected = 0;
    loadDropDownLabData();
    reloadLabInformation();
}

// Cada vez que se cambie de asignatura, recargar los labs que tiene
function loadDropDownLabData() {
    var labsDropDownMenu = document.getElementById("dropdown-labs");
    // Hay que eliminar los que ya tiene, porque si no se sobreponen opciones
    while (labsDropDownMenu.length > 0) {
        labsDropDownMenu.remove(labsDropDownMenu.length-1);
    }
    subjectSelected = document.getElementById("dropdown-subjects").value;
    var i = 0;
    labs[subjectSelected].forEach(labsOfSubject => { // Only first subject
        var labOption = document.createElement("option");
        labOption.value = i++;
        labOption.text = labsOfSubject;
        labsDropDownMenu.add(labOption);
    });
    reloadLabInformation();
}

// Cada vez que se cambie de lab, recargar la info que tiene
function reloadLabInformation() {
    var labInformationPanel = document.getElementById("container-info");
    labSelected = document.getElementById("dropdown-labs").value;
    labInformationPanel.innerHTML = "<p>" + labInformation[subjectSelected][labSelected] + "</p>";
}