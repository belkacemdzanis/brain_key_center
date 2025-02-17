// controllers/inventoryController.js

// دالة للحصول على جميع العناصر في المخزون
const getInventory = (req, res) => {
    // المنطق للحصول على المخزون
    res.send('Get Inventory');
};

// دالة لإضافة عنصر جديد إلى المخزون
const addInventoryItem = (req, res) => {
    // المنطق لإضافة عنصر
    res.send('Add Inventory Item');
};

module.exports = {
    getInventory,
    addInventoryItem,
};
