const express = require('express');
const cors  = require('cors');
const routerApi= require('./routes');

const { logErrors, errorHandler, boomerrorHandler } = require('./middlewares/error.handler')

const app = express();
// const port = 3000;
const port=process.env.PORT||3000; // variable de entorno

app.use(express.json());

const whitelist=['http://localhost:3000', 'http://localhost:8080','http://localhost:5000'];
const options={
  origin: (origin, callback)=>{
    if(whitelist.includes(origin)|| !origin){
      callback(null,true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));// habilita a cualquier dominio
// app.use(cors());
// app.get('/', (req, res) => {
//   res.send('Hola mi server en express');
// })

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
})

app.get('/', (req,res)=>{
  res.sendFile(__dirname + "/frontend.html")

});
// app.get('/products', (req,res)=>{
//   res.sendFile(__dirname + "/views/products.html")

// });

routerApi(app);

app.use(logErrors);
app.use(boomerrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port '+ port);
});
