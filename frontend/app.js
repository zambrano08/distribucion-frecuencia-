async function procesarEstadistica() {
    const inputData = document.getElementById('datosInput').value;
    
    if (!inputData) {
        alert("Por favor ingresa algunos datos");
        return;
    }

    // Enviamos los datos al backend (Flask)
    const response = await fetch('/api/calcular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ datos: inputData })
    });

    const data = await response.json();

    if (data) {
        mostrarTabla(data);
    } else {
        alert("Error al procesar los datos");
    }
}

function mostrarTabla(filas) {
    const cuerpo = document.getElementById('tablaCuerpo');
    const area = document.getElementById('resultadoArea');
    
    cuerpo.innerHTML = ""; // Limpiar tabla anterior
    
    filas.forEach(fila => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${fila.dato}</td>
            <td>${fila.fi}</td>
            <td>${fila.Fi}</td>
            <td>${fila.ni}</td>
            <td>${fila.Ni}</td>
        `;
        cuerpo.appendChild(tr);
    });

    area.style.display = "block"; // Mostrar la tabla
}