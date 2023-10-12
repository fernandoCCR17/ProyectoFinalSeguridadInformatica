const botonCifrarVernamClase = document.querySelector("#cifrarVernamClase")
const botonDescifrarVernamClase = document.querySelector("#descifrarVernamClase")
const divMensajeProcesadoVernam = document.querySelector("#mensajeProcesadoVernam")

botonCifrarVernamClase.addEventListener("click", cifrarMensajeVernamClase)
botonDescifrarVernamClase.addEventListener("click", descifrarMensajeVernamClase)

function cifrarMensajeVernamClase(e){
    e.preventDefault()
    const datos = validaFormVernamClase()

    if(Object.keys(datos[0]).length !== 0){
        return
    }

    proceso(datos, "El mensaje cifrado es:", "Tabla Normal", "Tabla Cifrada")
}

function descifrarMensajeVernamClase(e){
    e.preventDefault()
    const datos = validaFormVernamClase()

    if(Object.keys(datos[0]).length !== 0){
        return
    }else if(!Number.isInteger(Math.sqrt(datos[1].length))){
        const errorMensajeVernamClase = document.querySelector("#errorMensajeVernamClase")
        errorMensajeVernamClase.textContent = "Este mensaje no esta encriptado correctamente"
        return
    }

    proceso(datos, "El mensaje descifrado es:", "Tabla Cifrada", "Tabla Descifrada")
}

function proceso(datos, textoTitulo, nombreTabla1, nombreTabla2){
    const tamanioMatriz = calcularTamañoMatrizSimetrica(datos[1].length)
    const matriz = crearPrimerTabla(tamanioMatriz, datos[1], nombreTabla1)

    const matrizCifrada = crearSegundaTabla(tamanioMatriz, matriz, nombreTabla2)
    divMensajeProcesadoVernam.innerHTML = ""
    const tituloMensajeVernam = document.createElement("H2")
    tituloMensajeVernam.textContent = textoTitulo
    tituloMensajeVernam.classList.add("font-bold", "text-xl", "md:text-4xl")

    const parrafoVernam = document.createElement("P")
    parrafoVernam.textContent = matrizCifrada.map(subArray => subArray.join("")).join("")
    parrafoVernam.classList.add("min-h-7", "bg-slate-400", "rounded-lg", "p-4", "min-h-7", "bg-slate-400", "rounded-lg", "p-4", "text-sm", "md:text-base")
    divMensajeProcesadoVernam.appendChild(tituloMensajeVernam)
    divMensajeProcesadoVernam.appendChild(parrafoVernam)
}

function validaFormVernamClase(){
    const inputMensaje = document.querySelector("#mensajeVernamClase").value
    const errorMensajeVernamClase = document.querySelector("#errorMensajeVernamClase")
    errorMensajeVernamClase.textContent = ""
    const errores = {}

    if(inputMensaje.trim() === ""){
        errorMensajeVernamClase.textContent = "El mensaje no puede ir vacío"
        errores.mensaje = "El mensaje no puede ir vacío"
    }

    return [errores, inputMensaje.replaceAll(" ","~").split("")]
}

function calcularTamañoMatrizSimetrica(n) {
    // Calcular la longitud de un lado de la matriz
    const tamañoLadoMatriz = Math.ceil(Math.sqrt(n));
  
    return tamañoLadoMatriz;
}

function crearPrimerTabla(tamanio, mensajeArray, nombreTabla) {
    const divTablas = document.querySelector("#tablaNormal")
    const titulo= document.createElement("H2")
    const matriz = []
    let aux = 0
    divTablas.innerHTML = ""
    titulo.textContent = nombreTabla
    titulo.classList.add("font-bold", "text-xl", "md:text-2xl", "text-center")
    divTablas.appendChild(titulo)

    const table = document.createElement("table");
    table.classList.add("border-collapse", "border", "border-slate-500", "mx-auto", "my-4", "text-sm", "md:text-base");
    const tbody = document.createElement("tbody");

    for (let row = 0; row < tamanio; row++) {
        const rowArray = [];
        const contentRow = document.createElement("tr");

        for (let col = 0; col < tamanio; col++) {
            rowArray.push(aux < mensajeArray.length ? mensajeArray[aux] : "_")
            const td = document.createElement("td");
            td.classList.add("border", "border-slate-600", "px-2");     
            td.textContent = aux < mensajeArray.length ? mensajeArray[aux] : "_";
            contentRow.appendChild(td);

            aux++
        }

        tbody.appendChild(contentRow);
        matriz.push(rowArray)
    }
    table.appendChild(tbody);

    divTablas.appendChild(table);

    return matriz;
}

function crearSegundaTabla(tamanio,mensajeArray, nombreTabla){
    const divTablas = document.querySelector("#tablaCifrada")
    const titulo= document.createElement("H2")
    const matriz = []
    let aux = 0, aux2 = 0;
    divTablas.innerHTML = ""
    titulo.textContent = nombreTabla
    titulo.classList.add("font-bold", "text-xl", "md:text-2xl", "text-center")
    divTablas.appendChild(titulo)

    const table = document.createElement("table");
    table.classList.add("border-collapse", "border", "border-slate-500", "mx-auto", "my-4", "text-sm", "md:text-base");
    const tbody = document.createElement("tbody");

    for (let row = 0; row < tamanio; row++) {
        const rowArray = [];
        const contentRow = document.createElement("tr");

        for (let col = 0; col < tamanio; col++) {
            rowArray.push(mensajeArray[aux][aux2])
            const td = document.createElement("td");
            td.classList.add("border", "border-slate-600", "px-2");     
            td.textContent = mensajeArray[aux][aux2];
            contentRow.appendChild(td);

            aux++
        }

        tbody.appendChild(contentRow);
        matriz.push(rowArray)
        aux2++
        aux=0
    }
    table.appendChild(tbody);

    divTablas.appendChild(table);

    return matriz;
}