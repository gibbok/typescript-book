//@ts-ignore
Symbol.dispose ??= Symbol("Symbol.dispose");
//@ts-ignore
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed')
        }
    }
}

console.clear()
console.log(1)

{
    using work = doWork()
    console.log(2)
}

console.log(3)