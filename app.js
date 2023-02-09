const express = require('express')
const app = express()
const port = 3000
const Controller = require("./controllers")


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
// app.use(router)

app.get('/', Controller.redirect)
app.get('/home', Controller.home)

app.get('/laundries', Controller.showLaundry)
app.get('/orders', Controller.showOrder)

app.get('/laundries/add', Controller.addLaundry)
app.post('/laundries/add', Controller.createLaundry)

app.get('/laundries/edit/:id', Controller.editLaundry)
app.post('/laundries/edit/:id', Controller.updateLaundry)

app.get('/laundries/delete/:id', Controller.destroyLaundry)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})