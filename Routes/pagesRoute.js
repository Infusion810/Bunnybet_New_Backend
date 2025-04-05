
const express = require('express');

const {cricketpageadmin,cricketpagesignup,titliadminlogin,matkapagelogin,avaitorpagesignup,aarpaarparchpagelogin,avaitoradminlogin,matkaadminlogin} = require('../controller/pagesControler');
const router = express.Router();


router.post('/admin/signupmatka', matkapagelogin);
router.post('/admin/avaitorpagesignup', avaitorpagesignup);
router.post('/admin/aarpaarparchpagelogin', aarpaarparchpagelogin);
router.post('/page/login', avaitoradminlogin);
router.post('/page/matka/login', matkaadminlogin);
// router.post('/admin/cricketpagesignup', cricketpagesignup);
router.post('/page/tittli/login', titliadminlogin);
router.post('/page/cricket/login', cricketpageadmin);

router.post('/admin/cricketpagesignup', cricketpagesignup);

module.exports = router;

