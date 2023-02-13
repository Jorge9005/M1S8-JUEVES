console.log("Entro index.js");

let btnDanger = document.getElementById("btnDanger");

//aquí accedemos desde el HTML con onclick
function imprimirHolaMundo() {
    alert("Hola mundo.");
}

//aquí creamos el listener mediante el element (por el getElementById
btnDanger.addEventListener("click", function () {
    alert("Hola mundo desde el botón danger");
});

//function y addEventListener funcionan igual, la diferencia es que con function escribes código de js en el apartado de HTML, y con EventListener es lo contrario, a partas el código js en una sola parte.

//aquí se utilizo el mismo método que el anterior, pero se cambio la forma de especificar la función coloando solamente () =>
btnDanger.addEventListener("click", () => {
    alert("Hola mundo desde el botón danger");
});

document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveBtn");
    const changeThemeBtn = document.getElementById("changeThemeBtn");
    const inputName = document.getElementById("inputName");
    const inputPuesto = document.getElementById("inputPuesto");
    const tableBody = document.getElementById("tableBody");

    function loadData() {
        loadTheme();
        tableBody.innerHTML = `
        <tr id="noData">
            <td colspan="4" class="text-center">No hay datos</td>
        </tr>
            `;
        const data = JSON.parse(localStorage.getItem("data")) || [];
        if (data.length) {
            document.getElementById("noData").remove();
        }
        data.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.puesto}</td>
                <td class="text-center">
                <button type="button" class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
                <button type="button" class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function clearForm() {
        inputName.value = "";
        inputPuesto.value = "";
    }


    //Evento de guardar
    saveBtn.addEventListener("click", () => { //el primer parámetro es el evento y el segundo parámetro es una funcion

        const name = inputName.value; //con .value obtiene el valor que se encuentra en el HTML
        const puesto = inputPuesto.value;
        console.log(name);
        console.log(puesto);
        if (!name) {
            return;
        }

        //línea para leer cosas
        const data = JSON.parse(localStorage.getItem("data")) || []; //esto quiere decir que busque algo que se llame data y lo transforme y lo asigne a data, y en caso de que no encuentre nada lo almacena como un arreglo vacío
        //con los corchetes [] se define un array, con las llaves {} se define un objeto
        //un JSON es la representación de un objeto pero es un STRING GRANDE
        //un local storage tienen que ser a fuerzas un string, un array no es un string
        const index = saveBtn.getAttribute("data-index");
        console.log(index, "index");
        if (index) {
            data[index] = { name, puesto };
            saveBtn.removeAttribute("data-index");
            saveBtn.textContent = "Guardar";
        } else {
            data.push({
                name: name, //en el objeto se llama name y en mi variable también se llama name
                puesto: puesto //cuando se llaman igual se pueden simplificar utilizando solo el nombre, por ejemplo: "name, puesto" por el hecho de que javascript entiende que tenemos un objeto llamado name y que la variable también se llama name
            });
        }
        //línea para guardar cosas
        localStorage.setItem("data", JSON.stringify(data));
        loadData();
        clearForm();

    });

    function loadTheme() {
        const theme = localStorage.getItem("theme") || "light";
        document.body.dataset.bsTheme = theme;
        if (theme == "dark") {
            changeThemeBtn.textContent = "Light Mode";
        } else {
            changeThemeBtn.textContent = "Dark Mode";
        }
    }

    changeThemeBtn.addEventListener("click", function () {
        let body = document.body;

        if (body.dataset.bsTheme == "dark") {
            body.dataset.bsTheme = "light";
            changeThemeBtn.textContent = "Dark Mode";
            localStorage.setItem("theme", "light");
        } else {
            body.dataset.bsTheme = "dark";
            changeThemeBtn.textContent = "Light Mode";
            localStorage.setItem("theme", "dark");
        }
    });

    tableBody.addEventListener("click", function (e) {
        console.log(e.target.classList);
        if (e.target.classList.contains("btn-edit")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            const item = data[index];
            inputName.value = item.name;
            inputPuesto.value = item.puesto;
            saveBtn.textContent = "Actualizar";
            saveBtn.setAttribute("data-index", index);
        } else if (e.target.classList.contains("btn-delete")) {
            const index = e.target.dataset.index;
            const data = JSON.parse(localStorage.getItem("data")) || [];
            data.splice(index, 1);
            localStorage.setItem("data", JSON.stringify(data));
            loadData();
        }
    });

    loadData();
});