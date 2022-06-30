const express = require('express');
const faker = require('faker');
UsersService = require('./../services/users.services');
const validatorHandler = require('./../middlewares/validator.handler');
const {createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/users.schema');

const router = express.Router();
const service = new UsersService();

//QUERY PARAMS
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay parametros')
  }
});

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter')
})

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
    } catch (error) {
      next(error);
    }
  });

  router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json( newUser);
  })

  router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const rta = service.delete(id);
    res.json(rta);
  });




module.exports = router;
