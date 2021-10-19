window.onload = () => {
    const urlCategory = "http://168.138.249.104/api/Category/save";
    function dataCategory() {
        data = {
            "id": $("#id_category").val(),
            "name": $("#nombre").val(),
            "description": $("description").val()
        }
        return data;
    }

    $("#submitMessage").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataCategory());
        postData(urlCategory + "/save", data);
    })

    $("#updateMessage").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataCategory());
        putData(urlCategory, data);
    })

    $("#category_details").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataCategory());
        getData(urlCategory + "all");

    })

}
// ===================================================
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
            $("#id_category").val("");
            $("#nombre").val("");
            $("description").val("");
        }

    });
}

function putData(url, data) {
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
            $("#id_category").val("");
            $("#nombre").val("");
            $("description").val("");
        }
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
    const tableCabin = document.querySelector("#table_category");
    tableCabin.innerHTML = `
            <tr class = "rowTable">
                <th>name</th>
                <th>description</th>
                <th>cabañas</th>
                <th></th>
            </tr>
    `;
    for (i = 0; i < dataMessage.length; i++) {
        tableCabin.innerHTML += `
        <tr class = "rowTable">
            <td>${dataMessage[i].name}</td>
            <td>${dataMessage[i].description}</td>
            <td>${dataMessage[i].category_id}</td>
            <td><button type="button" onclick="deleteById(${dataMessage[i].id})">borrar</button></td>
        </tr>
        `;
    }

}

function deleteById(id) {
    window.alert("Está seguro que desea borrar esta cabaña");
    const url = "url";
    fetch(url + "/" + id, {
        method: "DELETE"
    })
        .finally(() => {
            getData(url);
        })
}