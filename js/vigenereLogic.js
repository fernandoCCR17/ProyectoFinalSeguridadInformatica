const botonCifrarVigenere = document.querySelector("#cifrarVigenere");
const botonDescifrarVigenere = document.querySelector("#descifrarVigenere");
const divMensajeProcesadoVigenere = document.querySelector("#mensajeProcesadoVigenere")

let accion = ""
botonCifrarVigenere.addEventListener("click", cifrarMensajeVigenere);
botonDescifrarVigenere.addEventListener("click", descifrarMensajeVigenere);
function cifrarMensajeVigenere(e){
    e.preventDefault()
    accion = botonCifrarVigenere.value
    const datos = validaFormVigenere()

    if(Object.keys(datos[0]).length !== 0){
        return
    }

    // Crea la tabla con el nuevo alfabeto
    const nuevaTabla = crearTablaVigenere(alphabet, Array.from({length: alphabet.length}, (_, i)=>i));

    // Encuentra el elemento en el documento donde deseas insertar la tabla (por ejemplo, con un ID)
    const contenedorTabla = document.querySelector("#tablaVigenere");

    // Limpia cualquier contenido existente en el contenedor (si es necesario)
    contenedorTabla.innerHTML = "";

    // Agrega la nueva tabla al documento
    contenedorTabla.appendChild(nuevaTabla);

    const tituloMensajeCifrado = document.createElement("H2")
    tituloMensajeCifrado.textContent = "El mensaje cifrado es:"
    tituloMensajeCifrado.classList.add("font-bold", "text-xl", "md:text-4xl")

    divMensajeProcesadoVigenere.innerHTML = ""
    const parrafoCifrado = document.createElement("P")
    parrafoCifrado.textContent = vigenere(datos[1], datos[2])
    parrafoCifrado.classList.add( "bg-slate-400", "rounded-lg", "p-4", "text-sm", "md:text-base")
    divMensajeProcesadoVigenere.appendChild(tituloMensajeCifrado)
    divMensajeProcesadoVigenere.appendChild(parrafoCifrado)
}

function descifrarMensajeVigenere(e){
    e.preventDefault()
    accion = botonDescifrarVigenere.value
    const datos = validaFormVigenere()

    if(Object.keys(datos[0]).length !== 0){
        return
    }


    // Crea la tabla con el nuevo alfabeto
    const nuevaTabla = crearTablaVigenere(alphabet, Array.from({length: alphabet.length}, (_, i)=>i));

    // Encuentra el elemento en el documento donde deseas insertar la tabla (por ejemplo, con un ID)
    const contenedorTabla = document.querySelector("#tablaVigenere");

    // Limpia cualquier contenido existente en el contenedor (si es necesario)
    contenedorTabla.innerHTML = "";

    // Agrega la nueva tabla al documento
    contenedorTabla.appendChild(nuevaTabla);

    const tituloMensajeCifrado = document.createElement("H2")
    tituloMensajeCifrado.textContent = "El mensaje descifrado es:"
    tituloMensajeCifrado.classList.add("font-bold", "text-xl", "md:text-4xl")

    divMensajeProcesadoVigenere.innerHTML = ""
    const parrafoCifrado = document.createElement("P")
    parrafoCifrado.textContent = vigenere(datos[1], datos[2])
    parrafoCifrado.classList.add("bg-slate-400", "rounded-lg", "p-4", "text-sm", "md:text-base")
    divMensajeProcesadoVigenere.appendChild(tituloMensajeCifrado)
    divMensajeProcesadoVigenere.appendChild(parrafoCifrado)
    
}


function validaFormVigenere(){
    const inputLlave = document.querySelector("#llave").value.toLowerCase()
    const inputMensajeVigenere = document.querySelector("#mensajeVigenere").value.toLowerCase()
    const errorLlave = document.querySelector("#errorLlaveVigenere")
    const errorMensajeVigenere = document.querySelector("#errorMensajeVigenere")
    errorLlave.textContent = ""
    errorMensajeVigenere.textContent = ""
    const errores = {}

    if(inputLlave.trim() === ""){
        errorLlave.textContent = "La llave no puede ir vacía"
        errores.desplazamiento = "La llave no puede ir vacía"
    }
    
    if(inputMensajeVigenere.trim() === ""){
        errorMensajeVigenere.textContent = "El mensaje no puede ir vacío"
        errores.mensaje = "El mensaje no puede ir vacío"
    }

    return [errores, inputLlave.replaceAll(" ","~").split(""), inputMensajeVigenere.replaceAll(" ","~").split("")]
}

function crearTablaVigenere(alphabet, keyAlphabet) {
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
  

function vigenere(llave, mensaje){
    const palabraProcesada = []
    if(llave.length > mensaje.length){
        llave = llave.slice(0, mensaje.length)
    }
    if(mensaje.length > llave.length){
        const limite = mensaje.length - llave.length
        for(let indice = 0; indice < limite; indice++){
            llave.push(llave[indice % llave.length])
        }
    }
    
    for(let i = 0; i < mensaje.length; i++){
        let resultado = accion === CIFRAR 
        ? (alphabet.indexOf(mensaje[i]) + alphabet.indexOf(llave[i])) % alphabet.length 
        : (alphabet.indexOf(mensaje[i]) - alphabet.indexOf(llave[i])) % alphabet.length 
        resultado < 0 ? resultado = resultado + alphabet.length : ""
        palabraProcesada.push(alphabet[resultado])
    }

    return palabraProcesada.join("").replaceAll("~", " ")
}