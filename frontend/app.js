function mostrarTabla(filas) {
    const cuerpo = document.getElementById('tablaCuerpo');
    const area = document.getElementById('resultadoArea');
    
    cuerpo.innerHTML = ""; // Limpiar tabla anterior
    
    filas.forEach(fila => {
        const tr = document.createElement('tr');
        // Aquí usamos las claves que vienen de estadistica.py (fi, Fi, ni, Ni)
        tr.innerHTML = `
            <td>${fila.dato}</td>
            <td>${fila.fi}</td>
            <td>${fila.Fi}</td>
            <td>${fila.ni}</td>
            <td>${fila.Ni}</td>
        `;
        cuerpo.appendChild(tr);
    });

    area.style.display = "block"; 
}