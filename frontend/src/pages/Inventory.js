import React from "react";

const InventoryPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-black" 
      style={{ backgroundImage: "url('/images/inventory-background.png')" }}>
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center shadow-lg">
        <img src="/images/brain_keyy-removebg-preview.png" alt="Inventory Logo" className="w-40 h-40 mx-auto mb-4 rounded-full" />
        <h1 className="text-4xl font-bold text-yellow-400" style={{ fontFamily: "'Cinzel', serif" }}>
          Inventory
        </h1>
        <p className="text-lg text-gray-300 mt-2" style={{ fontFamily: "'Cinzel', serif" }}>
          Gérez vos stocks avec élégance et efficacité.
        </p>
      </div>
    </div>
  );
};

export default InventoryPage;
