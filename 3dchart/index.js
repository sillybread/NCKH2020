const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
   res.send(Sample())
})
 
app.listen(5000, () => {
   console.log('App listening on port 5000')
})

function Sample(){
   let rd = function(){
     return Math.trunc(Math.random()*180-55);
   }
   let ret = [];
   for (let ii=0;ii<5*5*5;ii++){
      ret.push(rd());
   }
   return JSON.stringify({data: ret});
 }