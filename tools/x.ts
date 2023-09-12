
//@ts-ignore
Symbol.metadata ??= Symbol("Symbol.metadata"); // Simple polify

type Context =
    | ClassFieldDecoratorContext | ClassAccessorDecoratorContext | ClassMethodDecoratorContext // Context contains property metadata: DecoratorMetadata;

function setMetadata(_target: any, context: Context) {
    // Set the metadata object with a custom value
    context.metadata[context.name] = true;
}

class MyClass {
    @setMetadata
    a = 123;

    @setMetadata
    accessor b = "b";

    @setMetadata
    fn() { }
}

// Get metadata information
const metadata = MyClass[Symbol.metadata];

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}


// const serializables = Symbol();

// type Context =
//     | ClassAccessorDecoratorContext
//     | ClassGetterDecoratorContext
//     | ClassFieldDecoratorContext
//     ;

// export function serialize(_target: any, context: Context): void {
//     console.log(_target)
//     if (context.static || context.private) {
//         throw new Error("Can only serialize public instance members.")
//     }
//     if (typeof context.name === "symbol") {
//         throw new Error("Cannot serialize symbol-named properties.");
//     }

//     const propNames =
//         (context.metadata[serializables] as string[] | undefined) ??= [];
//     propNames.push(context.name);
// }

// export function jsonify(instance: object): string {
//     const metadata = instance.constructor[Symbol.metadata];
//     const propNames = metadata?.[serializables] as string[] | undefined;
//     if (!propNames) {
//         throw new Error("No members marked with @serialize.");
//     }

//     const pairStrings = propNames.map(key => {
//         const strKey = JSON.stringify(key);
//         const strValue = JSON.stringify((instance as any)[key]);
//         return `${strKey}: ${strValue}`;
//     });

//     return `{ ${pairStrings.join(", ")} }`;
// }

// class Person {
//     firstName: string;
//     lastName: string;

//     @serialize
//     age: number

//     @serialize
//     get fullName() {
//         return `${this.firstName} ${this.lastName}`;
//     }

//     toJSON() {
//         return jsonify(this)
//     }

//     constructor(firstName: string, lastName: string, age: number) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.age = age
//     }
// }

// const p = new Person('John', 'Smith', 20)
// console.log(p.toJSON())