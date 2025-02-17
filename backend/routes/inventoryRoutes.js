const express = require('express');
const router = express.Router();

// على سبيل المثال: يجب أن تكون وظيفة رد النداء موجودة مثل `getInventory` في ملف controller المناسب
const { getInventory } = require('../controllers/inventoryController'); 

// تأكد من أن `getInventory` تم تعريفه وأنه وظيفة رد النداء
router.get('/inventory', getInventory);

module.exports = router;
