window.onload = () => {
    const urlReservation = "http://150.230.77.182:80/api/Reservation";
    getDataCabin("http://150.230.77.182:80/api/Cabin");
    getDataClient("http://150.230.77.182:80/api/Client");
    function dataReservation() {
        let date = $("#startDate").val();
        date = new Date(date)
        date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        let date2 = $("#endDate").val();
        date2 = new Date(date2)
        date2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate()
        const data = {
            "startDate": date,
            "devolutionDate": date2,
            "status":$("#status").val(),
            "createdDate":"2020-12-04",
            "cabin":parseInt($("#nameCabin").val()),
            "client": parseInt($("#nameClient").val())
        }
        return data
    }
    $("#submitReservation").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataReservation());
        postData(urlReservation, data);
    })

    $("#updateReservation").click((e) => {
        e.preventDefault();
        const data = JSON.stringify(dataReservation());
        putData(urlReservation, data);
    })

    $("#reservationDetails").click((e) => {
        e.preventDefault();
        getData(urlReservation);

    })
}
function postData(url, data) {
    $.ajax({
        url: url+"/save",
        type: "POST",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            alert('Petición realizada ' + xhr.status);
        },
        error: function (xhr, status) {
            console.log(data);
            alert('Error en la petición ' + xhr.status);
        },

    });
}
function putData(url, data){
    $.ajax({
        url: url+"/update",
        type: "PUT",
        data: data,
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            alert('Petición realizada ' + xhr.status);
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
        },

    });
}

function getData(url) {
    $.ajax({
        url: url+"/all",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            console.log(dataMessage);
            renderTable(dataMessage);
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
        },
    });
}

function renderTable(dataMessage) {
    const tableCabin = document.querySelector("#table_reservation");
    tableCabin.innerHTML = `
            <tr class = "rowTable">
                <th>StartDate</th>
                <th>EndDate</th>
                <th>status</th>
                <th>client</th>
                <th>cabin</th>
                <th></th>
            </tr>
    `;
    for(i=0;i<dataMessage.length; i++){
     tableCabin.innerHTML += `
        <tr class = "rowTable">
            <td>${dataMessage[i].startDate.slice(0,9)}</td>
            <td>${dataMessage[i].devolutionDate.slice(0,9)}</td>
            <td>${dataMessage[i].status}</td>
            <td>${dataMessage[i].client.name}</td>
            <td>${dataMessage[i].cabin.name}</td>
            <td><button type="button" onclick="deleteById(${dataMessage[i].idReservation})">borrar</button></td>
        </tr>
        `;
    }

}
function deleteById(id) {
    window.alert("Está seguro que desea borrar esta cabaña");
    const url = "http://150.230.77.182:80/api/Reservation";
    fetch(url+"/"+id,{
        method:"DELETE"
    })
    .finally(()=>{
        getData(url);
    })
}
function getDataCabin(url) {
    $.ajax({
        url: url+"/all",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            if(dataMessage !== []){
                dataMessage.forEach(element => {
                    $("#nameCabin").append(`
                    <option value="${element.id}">${element.name}</option>
                    `)
                });
            }
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
        },
    });
}
function getDataClient(url) {
    $.ajax({
        url: url+"/all",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (json, textStatus, xhr) {
            const dataMessage = json;
            if(dataMessage !== []){
                dataMessage.forEach(element => {
                    $("#nameClient").append(`
                    <option value="${element.idClient}">${element.name}</option>
                    `)
                });
            }
        },
        error: function (xhr, status) {
            alert('Error en la petición ' + xhr.status);
        }
    });
}
