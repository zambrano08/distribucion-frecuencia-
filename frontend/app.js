document.addEventListener('DOMContentLoaded', () => {
    crearTablaInicial(6);
    document.getElementById('agregarFilaBtn').addEventListener('click', () => crearFilaEnTabla());
});

async function procesarEstadistica() {
    const manualData = obtenerDatosDesdeTabla();
    const inputData = document.getElementById('datosInput').value.trim();

    if (manualData.length > 0) {
        const resultado = calcularFrecuenciasManual(manualData);
        mostrarResultados(resultado);
        return;
    }

    if (!inputData) {
        alert('Por favor ingresa datos en la tabla o en el campo de texto.');
        return;
    }

    // Si no hay datos manuales, enviamos la cadena al backend.
    const response = await fetch('/api/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ datos: inputData })
    });

    const data = await response.json();

    if (data) {
        mostrarResultados(data);
    } else {
        alert('Error al procesar los datos');
    }
}

function crearTablaInicial(filas) {
    const cuerpo = document.getElementById('tablaCuerpo');
    cuerpo.innerHTML = '';

    for (let i = 0; i < filas; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="dato-input" placeholder="Dato"></td>
            <td><input type="number" class="fi-input" min="0" step="1" placeholder="fi"></td>
            <td><span class="ni-cell"></span></td>
            <td><span class="Fi-cell"></span></td>
            <td><span class="Ni-cell"></span></td>
        `;
        cuerpo.appendChild(tr);
    }
}

function crearFilaEnTabla() {
    const cuerpo = document.getElementById('tablaCuerpo');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="dato-input" placeholder="Dato"></td>
        <td><input type="number" class="fi-input" min="0" step="1" placeholder="fi"></td>
        <td><span class="ni-cell"></span></td>
        <td><span class="Fi-cell"></span></td>
        <td><span class="Ni-cell"></span></td>
    `;
    cuerpo.appendChild(tr);
}

function obtenerDatosDesdeTabla() {
    const filas = Array.from(document.querySelectorAll('#tablaCuerpo tr'));
    const datos = [];

    filas.forEach(fila => {
        const datoInput = fila.querySelector('.dato-input');
        const fiInput = fila.querySelector('.fi-input');
        const dato = datoInput.value.trim();
        const fi = fiInput.value.trim();

        if (dato !== '' && fi !== '') {
            const fiNumero = Number(fi);
            if (!Number.isNaN(fiNumero) && fiNumero >= 0) {
                datos.push({ dato, fi: fiNumero });
            }
        }
    });

    return datos;
}

function calcularFrecuenciasManual(datos) {
    const conteo = {};
    let total = 0;

    datos.forEach(({ dato, fi }) => {
        const clave = dato.trim();
        conteo[clave] = (conteo[clave] || 0) + fi;
        total += fi;
    });

    if (total === 0) {
        return [];
    }

    const filas = Object.keys(conteo).map(dato => ({ dato, fi: conteo[dato] }));
    const valoresNumericos = filas.every(f => !Number.isNaN(Number(f.dato)));

    filas.sort((a, b) => {
        if (valoresNumericos) {
            return Number(a.dato) - Number(b.dato);
        }
        return String(a.dato).localeCompare(String(b.dato), 'es');
    });

    let acum_f = 0;
    let acum_n = 0;

    return filas.map(fila => {
        acum_f += fila.fi;
        const ni = fila.fi / total;
        acum_n += ni;

        return {
            dato: fila.dato,
            fi: fila.fi,
            ni: ni.toFixed(4),
            Fi: acum_f,
            Ni: acum_n.toFixed(4)
        };
    });
}

function mostrarResultados(filas) {
    const cuerpo = document.getElementById('tablaCuerpo');
    cuerpo.innerHTML = '';

    filas.forEach(fila => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="dato-input" value="${fila.dato}"></td>
            <td><input type="number" class="fi-input" value="${fila.fi}"></td>
            <td><span class="ni-cell">${fila.ni}</span></td>
            <td><span class="Fi-cell">${fila.Fi}</span></td>
            <td><span class="Ni-cell">${fila.Ni}</span></td>
        `;
        cuerpo.appendChild(tr);
    });
}
