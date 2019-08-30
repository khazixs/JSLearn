var express=require("express")
var app=express()

app.use(express.static("jsbase"))
app.listen(8080)
