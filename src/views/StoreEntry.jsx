import { useState } from "react";
import FormSale from "../components/sales/FormSale";
import UltimateSales from "../components/sales/UltimateSales";

function StoreEntry() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="h-screen w-full">
      <main className="h-full">
        <section className="w-full h-full bg-red-500 flex">
          <div className="w-[60%] flex">
            <FormSale onSaleCreated={() => setRefreshKey((k) => k + 1)} />
          </div>
          <div className="w-[40%]">
            <div className="bg-gray-200 w-full h-full p-8">
              <UltimateSales refreshKey={refreshKey} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default StoreEntry;
