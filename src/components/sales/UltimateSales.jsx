import React from "react";
import RedirectLinks from "../RedirectLinks";

function UltimateSales() {
  return (
    <div className="p-4 justify-between flex flex-col h-full">
      <div>
        <h1 className="text-2xl mb-4 font-bold">Ventas Recientes</h1>
        <div className="p-6 bg-gray-500 rounded-4xl">
          <div className="text-md text-gray-200">
            Venta #001 - Camisa Blanca x2
          </div>
          <div className="text-sm text-gray-200">$160000</div>
          <div className="text-sm text-gray-200">Nicolas Parra</div>
          <div className="text-sm text-gray-200">2024-06-15 14:30</div>
        </div>
      </div>
      <div>
        <RedirectLinks />
      </div>
    </div>
  );
}

export default UltimateSales;
