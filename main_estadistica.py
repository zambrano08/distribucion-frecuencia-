from flask import Flask, render_template, request, jsonify
from Estadistica_logic import procesador_estadistico_web 

app = Flask(__name__, 
            static_url_path='', 
            static_folder='frontend', 
            template_folder='frontend')

@app.route('/')
def home():
    # Renderiza el index.html que está en la carpeta frontend
    return render_template('index.html')

@app.route('/api/calcular', methods=['POST'])
def calcular():
    data = request.json
    entrada = data.get('datos', '')
    
    # Llama a la función que está en estadistica.py
    resultado = procesador_estadistico_web(entrada)
    
    return jsonify(resultado)

if __name__ == '__main__':
    # use_reloader=False evita que Windows interrumpa el programa al iniciar
    app.run(debug=True, use_reloader=False)