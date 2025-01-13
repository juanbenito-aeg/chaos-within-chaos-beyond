- TODOS:
    - Añadir cuarto punto de colisión en izquierda y derecha para X.G
    - Hacer que el gusano no tenga colisiones y pueda perseguir a X.G incluso volando (o quitar velocidad en y a gusano)
    - Hacer que el hell bat hand to hand tenga colisiones en los cuatro lados y funcione como en un pinball
    - Hacer que el chaotic human sword y el gusano no mueran al tocar pinchos
    
    - Programar los efectos adversos de tener más de "x" puntos de ira
    - Eliminar rampas antiguas de constants.js y de arrays de obstáculos en collisionsLogic.js
    - Buscar background img para cave sect 2 y hacer mapa para el nivel
    
    - Sprint 6:
        - Cuando la ira exceda "x" cantidad, hacer aparecer pociones a poca distancia para facilitar al jugador su reducción
        - Cada vez que un enemigo muera, hacer que respawnee en cierta posición después de un número aleatorio de segundos
        - Si las particulas hechas mediante el contexto del canvas ralentizan bastante el juego, hacer sprites que representen particulas individuales y dibujarlas como imagenes
        - Función checkIfGameOver():
            - Contendrá condiciones que, de resultar afirmativas, harán que el juego termine
        - Actualizar puntos de vida teniendo en cuenta los diferentes tipos de colisiones, etc. en las funciones update() de los sprites (p. ej., en updateEnemy() -> if isCollidingWithBullet -> lifePoints--)
            - Igual con el score