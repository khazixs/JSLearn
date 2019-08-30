const express = require('express');

var server = express();
server.listen(43334);

server.get('/',function (req,res) {
    var number = req.query['number'];
    function Sum(n)
    {
        var sum = 0;
        for (let i = 1; i <= number; i++) {
            sum += i;
        };
        return sum;
    };
    var sum1 = Sum (number);
    console.log(sum1);
    res.send(`${sum1}`);
    res.end();
});
