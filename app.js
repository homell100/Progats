const KEYSARRAY = ["nombre", "raza", "ingresado"];
const LENGTHJSON = KEYSARRAY.length;

tableBody = document.querySelector("#cats-table tbody");
btnUpdate = document.querySelector("#cats-update");
checkUpdateAll = document.querySelector("#all-cats-update");

btnUpdate.addEventListener('click', uploadInfo);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        emptyTable();
        var gatitosArray = JSON.parse(this.responseText);
        for(var i=0; i< gatitosArray.length; i++){
            var newRow = createRow(gatitosArray[i]);
            if(newRow){
                tableBody.appendChild(newRow);
            }
        }
    }
};

function uploadInfo(){
    xhttp.open("GET", "http://127.0.0.1:5500/Progats/datos-ingresos/gatos.json", true);
    xhttp.send();
}

function emptyTable(){
    while(tableBody.firstChild){
        tableBody.removeChild(tableBody.lastChild);
    }
}

function createRow(json){
    checkDatesConsistency(json);
    if(!json["fecha-alta"] || checkUpdateAll.checked){
        var tr = document.createElement("tr");
        for(var i=0; i<LENGTHJSON;i++){
            var td = document.createElement("td");
            if((KEYSARRAY[i])=="ingresado"){
                var IsoDate = new Date(json[KEYSARRAY[i]]);
                var normalDate = `${IsoDate.getUTCDate()} - ${IsoDate.getUTCMonth()} - ${IsoDate.getUTCFullYear()}`;
                td.innerHTML = normalDate;
            }else{
                td.innerHTML = json[KEYSARRAY[i]];
            }
            tr.appendChild(td);
        }
        return tr;
    }
    return null;
    
}

function checkDatesConsistency(json){
    if(json["fecha-alta"]){
        d1 = new Date(json["ingresado"]);
        d2 = new Date(json["fecha-alta"]);
        if(d2<d1) console.log(`Error in dates in cat ${json["nombre "]}`);
    }
}