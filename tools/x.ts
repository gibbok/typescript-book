//@ts-ignore
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");

async function doWork() {
    await new Promise(resolve => setTimeout(resolve, 1000));
}

const log = (id: string): AsyncDisposable => {
    return {
        async [Symbol.asyncDispose]() {
            console.log(`disposing (async) ${id}`);
            await doWork();
        },
    }
}

async function func() {
    await using a = log("a");
    await using b = log("b");
    {
        await using c = log("c");
        await using d = log("d");
    }
    await using e = log("e");
    return;

    // Unreachable.
    // Never created, never disposed.
    await using f = log("f");
}

func();