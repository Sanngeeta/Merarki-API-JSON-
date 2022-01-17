const express=require('express')
const fs=require('fs')
const merarki=require('./config/saral.json')
const app=express()
app.use(express.json())

// get all meraki data
app.get('/',(req,res)=>{
    res.json({message:'Get all data succesfully',Saral:merarki})
})

// post new data in merarki
app.post('/api/saral',(req,res)=>{
    console.log(res)
    const newSaral={
          id:merarki.length+1,
          name:req.body.name,
          logo:req.body.logo,
          notes:req.body.notes,
          days_to_complete:req.body.days_to_complete,
          short_description:req.body.short_description,
          type:req.body.type,
          course_type:req.body.course_type,
          lang_available:req.body.lang_available
    }
    merarki.push(newSaral)
    fs.writeFileSync('./config/saral.json',JSON.stringify(merarki,null,5))
    res.send({message:'New data added succsfully',newSaral})
})


// update merarki data by id
app.put('/api/saral/:id',(req,res)=>{
    let id=req.params.id
    let name=req.body.name
    let logo=req.body.logo
    let notes=req.body.notes
    let days_to_complete=req.body.days_to_complete
    let short_description=req.body.short_description
    let type=req.body.type
    let course_type=req.body.course_type
    let lang_available=req.body.lang_available

    let index=merarki.findIndex((merarki)=>{
        return (merarki.id==Number.parseInt(id))
    })

if(index>=0){
    const srl=merarki[index]
    srl. name=name
    srl. logo=logo
    srl. notes=notes
    srl. days_to_complete=days_to_complete
    srl. short_description=short_description
    srl. type=type
    srl. course_type=course_type
    srl. lang_available=lang_available

    merarki.push(srl)
    fs.writeFileSync('./config/saral.json',JSON.stringify(merarki,null,5))
    res.send({message:'updated succsuflly',update:srl})

    
}
})

// delete merarki data by id
app.delete('/api/saral/:id',(req,res)=>{
    let id= req.params.id
    let index1= merarki.findIndex((merarki)=>{
        return (merarki.id==Number.parseInt(id))
    })
    if (index1>=0){
        let srl=merarki[index1] 
        merarki.splice(index1,1)
        fs.writeFileSync('./config/saral.json',JSON.stringify(merarki,null,5))
        res.send({message:'deleted succsfully',detele:srl})
    }else{
        res.json(404)
    }

})








app.listen(8000,()=>{
    console.log('PORT 8000 listing')
})