function mostrarTabla(filas) {
    const cuerpo = document.getElementById('tablaCuerpo');
    const area = document.getElementById('resultadoArea');
    
    cuerpo.innerHTML = ""; // Limpiar tabla anterior
    
    filas.forEach(fila => {
        const tr = document.createElement('tr');
        
        // Ajustado para que coincida con tus nombres en mayúsculas (FI y NI)
        tr.innerHTML = `
            <td>${fila.dato}</td>
            <td>${fila.fi}</td>
            <td>${fila.FI}</td> 
            <td>${fila.ni}</td>
            <td>${fila.NI}</td>
        `;
        cuerpo.appendChild(tr);
    });

    area.style.display = "block"; 
}