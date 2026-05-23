const express=require('express')
const app=express()
const cors=require('cors')

app.use(cors())
app.post('/dashboard',async(req,res)=>{

    const options = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${347629}`,
  }
};
const response=fetch(
  'https://www.weatherapi.com/docs/?=efa4fca666404fccba5183511263103#',
  options
)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


const data = await response.json();
console.log(data);
  // }
// })
}
)


app.listen(5000,()=>{
    console.log('app started')
})