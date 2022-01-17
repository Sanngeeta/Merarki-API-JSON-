const fs=require('fs')
const axios=require('axios')
const redline=require("readline-sync")
const marakiData=axios.get('https://api.merakilearn.org/courses ')
    .then((res)=>{
        let data=(res.data)
        let jsonData=JSON.stringify(data,null,5)
        fs.writeFileSync('saral.json',jsonData)
    })

