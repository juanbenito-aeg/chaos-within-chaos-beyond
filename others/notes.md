- TODOS:
    - Hacer que se rendericen los sprites correspondientes en cada sección de la cueva aun inicializando la totalidad de los utilizados en el juego (para no tener que "hardcodear" los índices del player y los chaotic human bow en las funciones init de los orbes y las flechas)
    - Hacer que el gusano persiga a X.G a partir de cierta distancia (haz uso del teorema de Pitágoras)
    - En updateFastWorm, antes de calcular velocidad del sprite comprobar que no esté a menos de tantos píxeles del personaje, y si está ponerle velocidad a 0 (para eliminar efecto de cambio de dirección constante)

- Aclarar dudas:
    - ¿Cómo habrá que hacer el seguimiento en el documento IDEAL durante Navidades?

- A realizar próximamente:
    - Animar símbolo de ira con partículas o similares
    - Añadir alrededor de tres frames más a X.G que lo muestren aún más rojo (ojos, cara), mayor cantidad de sangre, etc.

------------------
------------------

- Sprint 05:
    - Uno de los enemigos puede no tener colisiones con elementos del mapa (¿hell bat hand-to-hand?)
    - Tutorial Collisions III: Tratar caso de vx === 0 aparte
    - En principio, cuando el gusano vaya por las rampas tras X.G, colisionará con las rampas como con el resto de bloques

- Navidades:
    - Refactoring:
        - Crear funciones init en las clases de cada sprite