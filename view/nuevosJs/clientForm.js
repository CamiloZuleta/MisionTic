window.onload = () => {
    const submitClient = document.querySelector("#submitClient");
    const urlClient = "https://gcb6640089cf2cb-db202109261438.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";

    function dataValClient() {
        const data = {
            "id": $("#id_client").val(),
            "name": $("#name").val(),
            "email": $("#email").val(),
            "age": $("#age").val(),
        }
        return data
    }

    submitClient.addEventListener("click", (e) => {
        e.preventDefault();
        data = JSON.stringify(dataValClient());
        postData(urlClient, data);
    })

    $("#updateClient").click((e) => {
        e.preventDefault();
        data = JSON.stringify(dataValClient());
        putData(urlClient, data);
    })

    $("#client_details").click(function () {
        getData(urlClient);
    })

}
postData = (url, data) => {
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {

        },
        error: function (xhr, status) {
            console.log(xhr.status);
        },
        complete: function (xhr) {
            alert('Petición realizada ' + xhr.status);
            $("#id_client").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
        }
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
            $("#id_client").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
        },

    });
}

function getData(url, func) {
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
        }
    });
}

function renderTable(dataMessage) {
    const tableClient = document.querySelector("#table_client");
    tableClient.innerHTML = `
        <tr class = "rowTable">
            <th>nombre</th>
            <th>email</th>
            <th>age</th>    
            <th></th>    
        </tr>
        `;
    for (i = 0; i < dataMessage.length; i++) {
        tableClient.innerHTML += `
                <tr class = "rowTable">
                    <td>${dataMessage[i].name}</td>
                    <td>${dataMessage[i].email}</td>
                    <td>${dataMessage[i].age} </td>                        
                    <td><button class="delete_button" onclick = 'deleteById(${dataMessage[i].id})'>borrar</button></td>
                </tr>
                `;
    }
}

function deleteById(id) {
    window.alert("Está seguro que desea borrar este cliente");
    const url = "https://gcb6640089cf2cb-db202109261438.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client";
    fetch(url+"/"+id,{
        method:"DELETE"
    })
    .finally(()=>{
        getData(url);
    })
}

