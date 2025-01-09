- TODOS:
    - Solucionar colisiones gusano
        - Cambiar tanto atributos numéricos de ImageSet como atributos numéricos de HitBox y hacerlos enteros para TODOS los sprites en initialize.js
    - Para la auditoría del próximo lunes, hacer que cuando haya colisiones el hitbox de los sprites cambie de color
    - Solucionar X.G desaparece al atacar
    - Buscar background img para cave sect 2 y hacer mapa para el nivel
    - Programar los efectos adversos de tener más de "x" puntos de ira

- Duda(s) a aclarar:
    - ¿Cómo se creará el total de sprites de cada nivel? ¿Se ejecutarán múltiples funciones init correspondientes a cada uno de los tipos de sprites?
    - ¿Hacer que el chaotic human sword y el fast worm se detengan o mueran al tener un bloque de pinchos delante?

-----------------

- Rampas (casos para rampa cuya altura incrementa de izquierda a derecha):
    - Si sprite.state === State.RIGHT || State.STILL_RIGHT
        1. Desplazar overlap punto 4
        2. Usar punto 2 para comprobar si el siguiente bloque es una rampa
        3. Si es rampa, realizar cálculos nuevos, y si no lo es, cálculos antiguos (da igual que dupliques código por ahora, así que haz la comprobación y dependiendo del resultado llama a un bloque de código con todos los cálculos antiguos o a otro con parte de los cálculos antiguos y los nuevos para los puntos de colisión correspondientes)
        4. Cálculos nuevos:
            5. Se pone al personaje contra la cara inferior del bloque de rampa
            6. Subirlo proporcionalmente a lo que el personaje ha entrado en horizontal (overlapY = overlapX * A [A es un número a ajustar por mí para que quede bien])
    - Si sprite.state === State.LEFT || State.STILL_LEFT
        1. El punto 3 dice si el siguiente bloque es rampa
        2. Poner sprite en contra cara inferior del bloque de rampa y calcular overlapY igual que en el caso anterior, tomando overlapX desde inicio de cara izquierda del bloque de rampa