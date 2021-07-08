// variables globales
var informationTutoria = ["Información tutoría 1", "Información tutoría 2", "Información tutoría 3"];

// operaciones de la vista
function highlightButton(buttonId) {
    // Reiniciar los estilos de los botones
    for (var i = 1; i <= 3; i++) {
        var button = document.getElementById("button-" + i);
        button.className = "buttonStatus";
    }
    
    var targetButton = document.getElementById("button-" + buttonId);
    targetButton.className = "buttonSelected";

    var infoOutput = document.getElementById("infoTutoria");
    infoOutput.innerHTML = informationTutoria[buttonId - 1];
}