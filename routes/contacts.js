const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.post("/", contactsController.create);

router.get('/:id', contactsController.getSingle);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.del);


module.exports = router;