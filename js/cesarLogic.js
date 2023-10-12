const botonCifrar = document.querySelector("#cifrar")
const botonDescifrar = document.querySelector("#descifrar")
const divMensajeProcesado = document.querySelector("#mensajeProcesado")

botonCifrar.addEventListener("click", cifrarMensaje)
botonDescifrar.addEventListener("click", descifrarMensaje)

function cifrarMensaje(e){
    e.preventDefault()

    const datos = validaForm()

    if(Object.keys(datos[0]).length !== 0){
        return
    }

    const mensajeProcesado = []

    const llave = calcularAlfabetoCifrado(datos[1]);

    // Crea la tabla con el nuevo alfabeto
    const nuevaTabla = crearTabla(alphabet, llave);

    // Encuentra el elemento en el documento donde deseas insertar la tabla (por ejemplo, con un ID)
    const contenedorTabla = document.querySelector("#tabla");

    // Limpia cualquier contenido existente en el contenedor (si es necesario)
    contenedorTabla.innerHTML = "";

    // Agrega la nueva tabla al documento
    contenedorTabla.appendChild(nuevaTabla);

    datos[2].forEach(letra => {
        const newIndice = alphabet.findIndex(e => e === letra)
        newIndice != -1 ? mensajeProcesado.push(llave[newIndice]) : mensajeProcesado.push(letra)
    });

    const tituloMensajeCifrado = document.createElement("H2")
    tituloMensajeCifrado.textContent = "El mensaje cifrado es:"
    tituloMensajeCifrado.classList.add("font-bold", "text-xl", "md:text-4xl")

    divMensajeProcesado.innerHTML = ""
    const parrafoCifrado = document.createElement("P")
    parrafoCifrado.textContent = mensajeProcesado.join("")
    parrafoCifrado.classList.add( "bg-slate-400", "rounded-lg", "p-4", "text-sm", "md:text-base")
    divMensajeProcesado.appendChild(tituloMensajeCifrado)
    divMensajeProcesado.appendChild(parrafoCifrado)
}

function descifrarMensaje(e){
    e.preventDefault()

    const datos = validaForm()

    if(Object.keys(datos[0]).length !== 0){
        return
    }

    const mensajeProcesado = []

    const llave = calcularAlfabetoCifrado(datos[1]);

    // Crea la tabla con el nuevo alfabeto
    const nuevaTabla = crearTabla(alphabet, llave);

    // Encuentra el elemento en el documento donde deseas insertar la tabla (por ejemplo, con un ID)
    const contenedorTabla = document.querySelector("#tabla");

    // Limpia cualquier contenido existente en el contenedor (si es necesario)
    contenedorTabla.innerHTML = "";

    // Agrega la nueva tabla al documento
    contenedorTabla.appendChild(nuevaTabla);

    datos[2].forEach(letra => {
        const newIndice = llave.findIndex(e => e === letra)
        newIndice != -1 ? mensajeProcesado.push(alphabet[newIndice]) : mensajeProcesado.push(letra)
    });

    const tituloMensajeCifrado = document.createElement("H2")
    tituloMensajeCifrado.textContent = "El mensaje descifrado es:"
    tituloMensajeCifrado.classList.add("font-bold", "text-xl", "md:text-4xl")

    divMensajeProcesado.innerHTML = ""
    const parrafoCifrado = document.createElement("P")
    parrafoCifrado.textContent = mensajeProcesado.join("").replaceAll("~"," ")
    parrafoCifrado.classList.add("bg-slate-400", "rounded-lg", "p-4", "text-sm", "md:text-base")
    divMensajeProcesado.appendChild(tituloMensajeCifrado)
    divMensajeProcesado.appendChild(parrafoCifrado)
    
}


function validaForm(){
    const inputDesplazamiento = document.querySelector("#desplazamiento").value
    const inputMensaje = document.querySelector("#mensaje").value.toLowerCase()
    const errorDesplazamiento = document.querySelector("#errorDesplazamiento")
    const errorMensaje = document.querySelector("#errorMensaje")
    errorDesplazamiento.textContent = ""
    errorMensaje.textContent = ""
    const errores = {}

    if(inputDesplazamiento.trim() === ""){
        errorDesplazamiento.textContent = "Introduzca un número"
        errores.desplazamiento = "Introduzca un número"
    }else if(isNaN(+inputDesplazamiento)){
        errorDesplazamiento.textContent = "Solo introduzca números"
        errores.desplazamiento = "Solo introduzca números"
    }else if(+inputDesplazamiento <= 0){
        errorDesplazamiento.textContent = "Introduzca un número mayor a 0"
        errores.desplazamiento = "Introduzca un número mayor a 0"
    }
    
    if(inputMensaje.trim() === ""){
        errorMensaje.textContent = "El mensaje no puede ir vacío"
        errores.mensaje = "El mensaje no puede ir vacío"
    }

    return [errores, +inputDesplazamiento, inputMensaje.replaceAll(" ","~").split("")]
}

function calcularAlfabetoCifrado(desplazamiento) {
    const keyAlphabet = [];

    for (let i = 0; i < alphabet.length; i++) {
        const newIndex = (i + desplazamiento) % alphabet.length;
        keyAlphabet.push(alphabet[newIndex]);
    }

    return keyAlphabet;
}

function crearTabla(alphabet, keyAlphabet) {
    const table = document.createElement("table");
    table.classList.add("border-collapse", "border", "border-slate-500", "mx-auto", "my-4", "text-sm", "md:text-base");
  
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
  
    // Crea la fila de encabezado (thead)
    const headerRow = document.createElement("tr");
    alphabet.forEach((letter, index) => {
      const th = document.createElement("th");
      th.classList.add("border", "border-slate-600", "bg-slate-500");
      th.textContent = letter;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
  
    // Crea la fila de contenido (tbody)
    const contentRow = document.createElement("tr");
    keyAlphabet.forEach((letter, index) => {
      const td = document.createElement("td");
      td.classList.add("border", "border-slate-600", "px-2");
      td.textContent = letter;
      contentRow.appendChild(td);
    });
    tbody.appendChild(contentRow);
  
    // Agrega thead y tbody a la tabla
    table.appendChild(thead);
    table.appendChild(tbody);
  
    return table;
  }
  