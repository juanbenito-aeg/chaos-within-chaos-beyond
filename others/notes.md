- Aclarar dudas:
    - ¿Puedo programar salto sin sprites específicos para tal movimiento?

- A realizar próximamente:
    - Animar símbolo de ira con partículas o similares
    - Añadir alrededor de tres frames más a X.G que lo muestren aún más rojo (ojos, cara), mayor cantidad de sangre, etc.

- Disparos:
    - El orbe no se añade al array "sprites" (es decir, no se crea) desde el principio del juego, sino cuando se pulsa la tecla correspondiente ("S" en mi caso)
    - Cómo borrar un orbe tras ser lanzado:
        - Se le asignará el estado "OFF" (de valor -1)
        - Se eliminará en la función "updateSprites()", tras hacer una comprobación del estado actual del sprite
    - Para retrasar disparos sucesivos, usar temporizadores

- Cómo calcular dirección en la que mover un sprite mientras persigue a otro:
    - 