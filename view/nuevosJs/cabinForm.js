window.onload = () => {
    const urlCabin = "https://gcb6640089cf2cb-db202109261438.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin";
    const submitCabin = document.querySelector("#submit_cabin");
    const getCabin = document.querySelector("#cabin_details");

    function dataValCabin() {
        const data = {
            "id": $("#id_cabin").val(),
            "brand": $("#brand").val(),
            "rooms": $("#rooms").val(),
            "category_id": $("#category_id").val(),
            "name": $("#name").val()
        }
        return data
    }

    submitCabin.addEventListener("click", (e) => {
        e.preventDefault();
        const data = JSON.stringify(dataValCabin());
        postData(urlCabin, data);
    })

    $("#update_cabin").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataValCabin());
        putData(urlCabin, data);
    })

    getCabin.addEventListener("click", (e) => {
        e.preventDefault();
        data = JSON.stringify(dataValCabin());
        getData(urlCabin);

    })
}

function postData(url, data) {
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            alert('Petición realizada ' + xhr.status);
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
            $("#id_cabin").val("");
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("")
        },

    });
}

function putData(url, data){
    $.ajax({
        url: url,
        type: "PUT",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            alert('Petición realizada ' + xhr.status);
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
            $("#id_cabin").val("");
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("")
            
        },

    });
}

function getData(url) {
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json.items;
            renderTable(dataMessage);
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
        },
    });
}

function renderTable(dataMessage) {
    const tableCabin = document.querySelector("#table_cabin");
    tableCabin.innerHTML = `
            <tr class = "rowTable">
                <th>brand</th>
                <th>rooms</th>
                <th>category_id</th>
                <th>name</th>
                <th></th>
            </tr>
    `;
    for(i=0;i<dataMessage.length; i++){
     tableCabin.innerHTML += `
        <tr class = "rowTable">
            <td>${dataMessage[i].brand}</td>
            <td>${dataMessage[i].rooms}</td>
            <td>${dataMessage[i].category_id}</td>
            <td>${dataMessage[i].name}</td>
            <td><button type="button" onclick="deleteById(${dataMessage[i].id})">borrar</button></td>
        </tr>
        `;
    }

}

function deleteById(id) {
    window.alert("Está seguro que desea borrar esta cabaña");
    const url = "https://gcb6640089cf2cb-db202109261438.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/cabin/cabin";
    fetch(url+"/"+id,{
        method:"DELETE"
    })
    .finally(()=>{
        getData(url);
    })
}

