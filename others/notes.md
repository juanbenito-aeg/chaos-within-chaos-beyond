- TODOS:
    - Poner bloques en los límites del mapa para que el personaje no pueda salir del mismo
    
    - Programar los efectos adversos de tener más de "x" puntos de ira
    - Eliminar rampas antiguas de constants.js y de arrays de obstáculos en collisionsLogic.js
    - Buscar background img para cave sect 2 y hacer mapa para el nivel
    
    - Sprint 6:
        - Si las particulas hechas mediante el contexto del canvas ralentizan bastante el juego, hacer sprites que representen particulas individuales y dibujarlas como imagenes
        - Actualizar puntos de vida teniendo en cuenta los diferentes tipos de colisiones, etc. en las funciones update() de los sprites (p. ej., en updateEnemy() -> if isCollidingWithBullet -> lifePoints--)
            - Igual con el score
    - Cuando el personaje sea atacado, pasará a un estado DAMAGE, en el que parpadeará por unos segundos para indicar que no puede ser atacado