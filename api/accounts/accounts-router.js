const router = require('express').Router()
const Accounts = require('./accounts-model')

const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      next(err);
    })
});

router.get('/:id', checkAccountId, async (req, res,) => {
  res.status(200).json(req.account)
})

router.post('/',checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  try {
    const newPost = await Accounts.create(req.body);
    res.status(201).json(newPost);
  }
  catch(err) {
    next(err);
  }
});

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  try {
    const updatedPost = await Accounts.updateById(req.params.id, req.body);
    res.status(200).json(updatedPost);
  }
  catch(err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(deletedPost => {
      res.status(200).json(deletedPost);
    })
    .catch(err => {
      next(err);
    })
});

router.use((err, _, res, ) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
