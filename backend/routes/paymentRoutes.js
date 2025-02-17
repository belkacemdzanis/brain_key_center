const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Obtenir tous les paiements
router.get("/", paymentController.getPayments);

// Ajouter un nouveau paiement
router.post("/", paymentController.addPayment);

// Mettre à jour un paiement
router.put("/:id", paymentController.updatePayment);

// Supprimer un paiement
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
