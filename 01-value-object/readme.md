# Value object

Un value object (u objeto de valor) es un objeto que encapsula un valor o conjunto de valores que representan un concepto, pero a diferencia de una entidad la igualdad es comparada por el valor o conjunto de valores en lugar de un identificador.

Los value object son immutables, por lo que cuando los valores cambien se debe generar una nueva instancia.

|           | Value Object          | Entidad                        |
| --------- | --------------------- | ------------------------------ |
| Inmutable | Todas las propiedades | Solo el identificador*         |
| Igualdad  | Por valor             | Por identificador o referencia |

\*  Aunque puede haber mas propiedades immutables por restricciones de dominio

El uso de value object permite encapsular la lógica y las validaciones entorno a un concerto, por ejemplo pensemos en un contador podríamos representar de la siguiente forma.

```TypeScript
class Counter {
 readonly #value: number;

 constructor(value: number) {
  this.#ensureIsValid(value);
  this.#value = value;
 }

 value(): number {
  return this.#value;
 }

 equals(other: Counter): boolean {
  return this.#value === other.value();
 }

 toString(): string {
  return this.#value.toString();
 }

 increase(): Counter {
  return new Counter(this.#value + 1);
 }

 decrease(): Counter {
  const decreasedValue = this.#value - 1;
  const isNegativeValue = decreasedValue < 0;

  return isNegativeValue ? Counter.zero() : new Counter(decreasedValue);
 }

 static zero(): Counter {
  return new Counter(0);
 }

 #ensureIsValid(value: number): void {
  this.#ensureIsDefined(value);
  this.#ensureIsInteger(value);
  this.#ensureIsNotLowerThanZero(value);
 }

 #ensureIsDefined(value: number): void {
  if (value === undefined || value === null) {
   throw new Error("Value is undefined");
  }
 }

 #ensureIsInteger(value: number): void {
  if (!Number.isInteger(value)) {
   throw new Error("Value must be an integer");
  }
 }

 #ensureIsNotLowerThanZero(value: number): void {
  if (value < 0) {
   throw new Error("Value cannot be lower than zero");
  }
 }
}
```

En el constructor se valida que el valor es correcto.

Luego, tenemos un método para obtener el valor `value()`, un método para comparar el valor `equals()` y un método para representar el valor como string `toString()`.

Por ultimo, tenemos dos métodos que gestionan el comportamiento `increase()`y `decrease()`, ademas de un un método estático `zero()` que genera un contador con 0 como valor. Todos estos métodos devuelven una nueva instancia de `Contador` para respetar que el valor sea inmutable.

## Referencias

- [Value Objects. Introducción al patrón Value Object | by Miguel Ángel Sánchez | All you need is Clean Code | Medium](https://medium.com/all-you-need-is-clean-code/value-objects-d4c24115fa69)
- [Value object - Wikipedia](https://en.wikipedia.org/wiki/Value_object)
- [Value Object | Martin Fowler](https://martinfowler.com/bliki/ValueObject.html)
-[Mejora la Calidad de tu Código utilizando Value Objects | CodelyTV | YouTube](https://youtu.be/q_biZCsoloU?si=TmQ8XHCiA5VbWOyq)
