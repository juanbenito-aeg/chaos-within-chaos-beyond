- TODOS:
    - Para la auditoría del próximo lunes, hacer que cuando haya colisiones el hitbox de los sprites cambie de color
    - Solucionar X.G desaparece al atacar
    - Buscar background img para cave sect 2 y hacer mapa para el nivel
    - Programar los efectos adversos de tener más de "x" puntos de ira

- Duda(s) a aclarar:
    - ¿Cómo se creará el total de sprites de cada nivel? ¿Se ejecutarán múltiples funciones init correspondientes a cada uno de los tipos de sprites?
    - ¿Hacer que el chaotic human sword y el fast worm se detengan o mueran al tener un bloque de pinchos delante?

- Sprint 6:
    - Cuando la ira exceda "x" cantidad, hacer aparecer pociones a poca distancia para facilitar al jugador su reducción
    - Cada vez que un enemigo muera, hacer que respawnee en cierta posición después de un número aleatorio de segundos
    - Si las particulas hechas mediante el contexto del canvas ralentizan bastante el juego, hacer sprites que representen particulas individuales y dibujarlas como imagenes

-----------------
-----------------

- Rampas (casos para rampa cuya altura incrementa de izquierda a derecha):
    - Si sprite.state === State.RIGHT || State.STILL_RIGHT
        1. Desplazar overlap punto 4
        2. Usar punto 2 para comprobar si el siguiente bloque es una rampa
        3. Si es rampa, realizar cálculos nuevos, y si no lo es, cálculos antiguos (da igual que dupliques código por ahora, así que haz la comprobación y dependiendo del resultado llama a un bloque de código con todos los cálculos antiguos o a otro con parte de los cálculos antiguos y los nuevos para los puntos de colisión correspondientes)
        4. Cálculos nuevos:
            1. Se pone al personaje contra la cara inferior del bloque de rampa
            2. Subirlo proporcionalmente a lo que el personaje ha entrado en horizontal (overlapY = overlapX * A [A es un número a ajustar por mí para que quede bien])
    - Si sprite.state === State.LEFT || State.STILL_LEFT
        1. El punto 3 dice si el siguiente bloque es rampa
        2. Poner sprite en contra cara inferior del bloque de rampa y calcular overlapY igual que en el caso anterior, tomando overlapX desde inicio de cara izquierda del bloque de rampa

--------

- Rampas (optimizado - casos para rampa cuya altura incrementa de izquierda a derecha)
    - Comprobar estado del personaje (right/left)
        - Si right y siguiente bloque es rampa, lo cual se comprueba con el punto 2 (¿y con el 3?), llamar a función específica de colisión con rampa
            - con punto 3, comprobar si se hace overlap en y con bloque que no sea una rampa, y si se hace mover sprite hacia arriba para corregir posición
                - mover sprite de nuevo hacia arriba (overlapy 2) según overlapX multiplicado por un número A constante
        - Si left y sigueinte es rampa (que va hacia abajo de derecha a izquierda), comprobado con punto 3, mover sprtie hacia la parte inferior de rampa
            - mover de nuevo overlapy calculado a partir de overlapx desde principio de bloque rampa hasta el punto 3