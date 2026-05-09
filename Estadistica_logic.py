def procesador_estadistico_web(datos_entrada):
    try:
        # 1. Limpieza de datos
        lista = [d.strip() for d in datos_entrada.split(",")]
        n_total = len(lista)
        
        # 2. Conteo de frecuencias (fi)
        conteo = {}
        for d in lista:
            conteo[d] = conteo.get(d, 0) + 1
        
        # 3. Generación de la tabla para la web
        valores_ordenados = sorted(conteo.keys())
        tabla_final = []
        acum_f = 0
        acum_n = 0
        
        for v in valores_ordenados:
            fi = conteo[v]
        ni = fi / n_total
        acum_n += ni
        
        # Guardamos cada fila como un objeto
        tabla_final.append({
            "dato": v,
            "fi": fi,
            "Fi": fi,
            })
            
        return tabla_final
    except Exception:
        return None