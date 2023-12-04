const express = require("express");
const app = express()
const cors = require("cors")
const port = 3200;
const handlelogregis = require("./route/handlelogregis")
const siswa = require("./route/siswa")
const pembayaran_route = require("./route/pembayaran")
const kelas_route = require("./route/kelas")
const petugas_route = require("./route/petugas")
const spp_route = require("./route/spp")
const refpetugas_route = require("./route/refpetugas")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res) => {
    res.send(`Running at port ${port} `)
})

app.use(handlelogregis)
app.use(siswa)
app.use(pembayaran_route)
app.use(kelas_route)
app.use(petugas_route)
app.use(spp_route)
app.use(refpetugas_route)

app.listen(port,() => {
    console.log(`listening at localhost : ${port}`)
})