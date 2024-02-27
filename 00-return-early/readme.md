# Patrón return early

**El enfoque de este patrón es que tan pronto como una condición se cumple, se termina la ejecución de la función.**

Veamos un ejemplo ([fuente](https://dev.to/arikaturika/one-concept-a-day-early-return-pattern-in-javascript-3pol)):

```js
const addTwoIntegers = (firstInteger, secondInteger) => {
  let result;

  if (Number.isInteger(firstInteger) && Number.isInteger(secondInteger)) {
    if (firstInteger > 0 && secondInteger > 0) {
      result = firstInteger + secondInteger;
    } else {
      throw new Error("Both integers need to be positive!");
    }
  } else {
    throw new Error("Both arguments need to be integers!");
  }

  return result;
};
```

Tenemos la función `addTwoIntegers` la cual recibe dos parámetros. 

Primero se declara una variable llamada `result`.

Entonces se valida que ambos parámetros son números enteros, si ambos lo son, continuamos la ejecución por la parte `if`, y si no, por la del `else` que laza un error. Esta validación genera un nuevo nivel de indentación en el código y puedes perder el contexto de la validación en el `else` si el código en la parte el `if` es extenso o complejo.

Después, si ambos son enteros, validamos que ambos sean positivos, si ambos son positivos asignamos el resultado de la suma en la variable `result` y si no lanzamos un Error. Al igual que la validación anterior, esta genera otro nivel de indentación y puedes perder el contexto de la validación en el `else` si el código en la parte el `if` es extenso o complejo.

Finalmente, si todo a ido correctamente se devuelve el valor de `result`.

**Para aplicar el patron return early lo que haremos sera invertir las condiciones.**

Si invertimos la primera condición el código quedaría asi:

```js
const addTwoIntegers = (firstInteger, secondInteger) => {
  if (!Number.isInteger(firstInteger) || !Number.isInteger(secondInteger)) {
    throw new Error("Both arguments need to be integers!");
  }

  let result;

  if (firstInteger > 0 && secondInteger > 0) {
    result = firstInteger + secondInteger;
  } else {
    throw new Error("Both integers need to be positive!");
  }

  return result;
};
```

Ahora invertimos la segunda condición y el código resultante seria:

```js
const addTwoIntegers = (firstInteger, secondInteger) => {
  if (!Number.isInteger(firstInteger) || !Number.isInteger(secondInteger)) {
    throw new Error("Both arguments need to be integers!");
  }

  if (firstInteger <= 0 || secondInteger <= 0) {
    throw new Error("Both integers need to be positive!");
  }

  return firstInteger + secondInteger;
};
```

## Beneficios

El uso del patrón return early puede generar los siguientes beneficios:

- **Mejora la legibilidad del código.** 
  - Reduce la indentación y anidamiento del código.

- **Reduce la carga cognitiva.** 
  - Evita el anidamiento de condiciones que dificultan la compresión del código. 

- **Optimiza la ejecución del código.**
  - Evita el uso de variable temporales.
  - Evita la ejecución de código innecesario.

- **Facilita el mantenimiento.**
  - Permite modularizar el código.

## Parones de diseño relacionados

### Fail Fast

Cuando se produce un error, es mejor detectarlo y notificarlo de inmediato en lugar de dejar que el error se propague y cause problemas en el sistema o comportamientos inesperados.

Recursos:
- https://www.martinfowler.com/ieeeSoftware/failFast.pdf
- https://medium.com/@ricardo.zelaya/falla-tan-pronto-como-sea-posible-fail-fast-c26a69d568f0

### Guard Clause

Una clausula de guardia (o guard clause) es una comprobación que valida que se cumplan las condiciones necesaria para que se ejecute un código, evitando errores durante su ejecución.

Recursos:
- https://en.wikipedia.org/wiki/Guard_(computer_science)
- https://secture.com/blog/que-son-las-clausulas-de-guarda-con-ejemplos/
- https://medium.com/all-you-need-is-clean-code/cl%C3%A1usulas-de-guarda-d731395999bb

### Bouncer Pattern

Bouncer Pattern apuesta por un método que lance una excepción o no haga nada. Su uso nos permitirá mover las validaciones a su propia función y es especialmente util cuando tenemos muchas validaciones o validaciones complejas.

Por ejemplo, en el caso anterior de `addTwoIntegers` quedaría asi:

```js
const addTwoIntegers = (firstInteger, secondInteger) => {
  ensureParametersAreValid(firstInteger, secondInteger);

  return firstInteger + secondInteger;
};

const ensureParametersAreValid = (firstInteger, secondInteger) => {
  ensureParametersAreInteger(firstInteger, secondInteger);
  ensureParametersArePositive(firstInteger, secondInteger);
}

const ensureParametersAreInteger = (firstInteger, secondInteger) => {
  if (!Number.isInteger(firstInteger) || !Number.isInteger(secondInteger)) {
    throw new Error("Both arguments need to be integers!");
  }
}

const ensureParametersArePositive = (firstInteger, secondInteger) => {
  if (firstInteger <= 0 || secondInteger <= 0) {
    throw new Error("Both integers need to be positive!");
  }
}
```

Recursos:
- https://wiki.c2.com/?BouncerPattern

## Referencias

- [Return Early Pattern. A rule that will make your code more… | by Leonel Menaia Dev | The Startup | Medium](https://medium.com/swlh/return-early-pattern-3d18a41bba8)
- [Replace Nested Conditional with Guard Clauses | Refactoring Guru](https://refactoring.guru/es/replace-nested-conditional-with-guard-clauses)
- [The return early pattern | by Marny Lopez | LinkedIn ](https://www.linkedin.com/pulse/return-early-pattern-marny-lopez-eq6je/?trk=article-ssr-frontend-pulse_more-articles_related-content-card)
