- TODOS:
    - Sprint 8:
        - mostrar texto "LEVEL 1/LEVEL 2. READY?" o semejante al comenzar cada nivel
        - hacer aparecer murcielagos a partir de 75 de ira, cuando el jugador alcance "x" puntos de ira entre 75 y 100 (punto que desencadena el evento se selecciona de manera aleatoria)
        
    - Sprint 9:
        - la clase HighScore contendrá los siguientes atributos: position, name, score
        - String.fromCharCode() para segundo EI
        - que el jugador meta su nombre en el estado game over, justo antes de mostrar el menú para ir a high scores o menú principal
        - la ordenación de las diferentes entradas de high scores hacerla en el estado LOADING_HIGH_SCORES_MENU
        
    - Otros:
        - Cuando se superan "x" puntos de ira (p. ej., 50) hacer que tanto el personaje como los enemigos se muevan más rápido
        - Refactorizar clases haciendo una de Enemy (¿?)
        - ¿Crear atributos/propiedades con valores idénticos entre instancias de una clase en su constructor en vez de en el bucle de la función init de "initialize.js"?