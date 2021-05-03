const app = require("./app");

app.listen(3000, function (error, address) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log(`server listening on ${address}`);
});
