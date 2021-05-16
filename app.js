const app = require("./server");

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function (error, address) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log(`server listening on ${address}`);
});
