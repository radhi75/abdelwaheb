const router=require('express').Router();
const PosteController=require('../controller/CreateUser');

router.post('/api/Create/newuser',PosteController.CreateStudent);

module.exports={UserRouter:router}