//@ts-ignore
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log("Closing the connection...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Connection closed.");
    }
}


async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection();
    console.log("Doing some work...");
}

doWork();

