import axios from 'axios'


function air(){

    const res=axios.get('https://api.ambeedata.com/latest/by-lat-lng?lat=28.6139&lng=77.2090&key=bdfc9d069ed174b69e303755f580f84038f9f9ee07df330921d0c0b2aef8e467')
    .then((res)=>{
           console.log(res.data)
    })
}

air();