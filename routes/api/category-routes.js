const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
        include:[Product]
    });
    return res.json(categoryData)
} catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCategory = await Category.findByPk(req.params.id,{
        include:[Product]
    });
    if(oneCategory) {
       return res.json(oneCategory)
    } else {
        return res.status(404).json({msg:"no such record"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
});

router.post('/',async (req, res) => {
  // create a new category
  try{
    const newCategory =  await Category.create(
        req.body
    )
    res.status(201).json(newCategory)
} catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {

    const updateCategory = await Category.update({
      id:req.body.id,
        name:req.body.name
    },{
        where:{
            id:req.params.id
        }
    })
    if(updateCategory[0]){
        return res.json(updateCategory)
    } else {
        return res.status(404).json({msg:"no such category"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
});

router.delete('/:id',async (req, res) => {
  // delete a category by its `id` value
  try{
    const delCategory = await Category.destroy({
        where:{
            id:req.params.id
        }
    })
    if(delCategory){
        return res.json(delCategory)
    } else {
        return res.status(404).json({msg:"no such category"})
    }
}catch(err){
    console.log(err);
    res.status(500).json({
        msg:"an error occurred",
        err:err
    })
}
});

module.exports = router;
