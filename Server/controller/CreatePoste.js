const {connection}=require('../DataBaseMySQL/config')
module.exports={
    createPost:((req,res)=>{
        const query=`INSERT INTO postes(Title,Description,createdAt,Image,Video) VALUES("${req.body.Title}","${req.body.Description}","${req.body.createdAt}","${req.body.Image}","${req.body.Video}")`
        connection.query(query,(err,result)=>
          (err)?res.status(500).send(err):res.status(201).send('poste done')
        )
      })
}