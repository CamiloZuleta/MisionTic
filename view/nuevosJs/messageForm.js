window.onload = () => {
    const urlMessage = "https://gcb6640089cf2cb-db202109261438.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
    const submitMessage = document.querySelector("#submitMessage");
    const messageDetails = document.querySelector("#message_details");

    function dataValMessage() {
        const data = {
            "id": $("#id_message").val(),
            "messagetext": $("#messagetext").val(),
        }
        return data
    }

    submitMessage.addEventListener("click", (e) => {
        e.preventDefault();
        data = JSON.stringify(dataValMessage());
        postData(urlMessage, data);
    })

    $("#actualizarMessage").click((e) => {
        e.preventDefault();
        data = JSON.stringify(dataValMessage());
        putData(urlMessage, data);
    })

    messageDetails.addEventListener("click", (e) => {
        e.preventDefault();
        getData(urlMessage);
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
        },
        complete: function (xhr) {
            alert('Petición realizada ' + xhr.status);
            $("#id_message").val("");
            $("#messagetext").val("");
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
            $("#id_message").val("");
            $("#messagetext").val("");
        },

    });
}

function renderTable(dataMessage) {
    const tableMessage = document.querySelector("#table_message");
    tableMessage.innerHTML = `
            <tr class = "rowTable">
                <th>Message</th>
                <th></th>
            </tr>`;
    for (i = 0; i < dataMessage.length; i++) {
        tableMessage.innerHTML += `
        <tr class = "rowTable">
            <td>${dataMessage[i].messagetext}</td>
            <td><button type="button" class="delete_button" onclick = 'deleteById(${dataMessage[i].id})'>borrar</button></td>
        </tr>
        `;
    }
}

function deleteById(id) {
    window.alert("Está seguro que desea borrar este mensaje");
    const url = "https://gcb6640089cf2cb-db202109261438.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message";
    fetch(url+"/"+id,{
        method:"DELETE"
    })
    .finally(()=>{
        getData(url);
    })
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