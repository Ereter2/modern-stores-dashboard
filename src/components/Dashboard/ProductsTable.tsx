
import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

const ProductsTable: React.FC = () => {
  const { filteredProducts, currentPage, setCurrentPage, totalPages } = useDashboard();
  
  // Use the filtered products instead of all products
  const currentProducts = filteredProducts.slice((currentPage - 1) * 10, currentPage * 10);

  // Helper function to safely format price with fallback
  const formatPrice = (storeData: any) => {
    if (!storeData || typeof storeData.price !== 'number') {
      return '$0.00';
    }
    return `$${storeData.price.toFixed(2)}`;
  };

  // Helper function to safely get status with fallback
  const getStatus = (storeData: any) => {
    if (!storeData) {
      return { status: "out-of-stock", stock: 0 };
    }
    return { 
      status: storeData.status || "out-of-stock", 
      stock: typeof storeData.stock === 'number' ? storeData.stock : 0 
    };
  };

  return (
    <div className="glass-card rounded-lg overflow-hidden animate-slide-up animation-delay-300">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold">Products Comparison</h2>
      </div>
      
      {currentProducts.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">No products match the current filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Store A
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Store B
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Store C
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Margin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentProducts.map((product) => {
                const storeAStatus = getStatus(product.storeA);
                const storeBStatus = getStatus(product.storeB);
                const storeCStatus = getStatus(product.storeC);
                
                return (
                  <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 bg-secondary/30 rounded flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">IMG</span>
                        </div>
                        <div>
                          <div className="font-medium">{product.name || "Unnamed Product"}</div>
                          <div className="text-xs text-muted-foreground">
                            SKU: {product.sku || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="font-medium">{formatPrice(product.storeA)}</div>
                      <StatusBadge status={storeAStatus.status} count={storeAStatus.stock} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="font-medium">{formatPrice(product.storeB)}</div>
                      <StatusBadge status={storeBStatus.status} count={storeBStatus.stock} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="font-medium">{formatPrice(product.storeC)}</div>
                      <StatusBadge status={storeCStatus.status} count={storeCStatus.stock} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-positive font-medium">
                        {product.margin ? `+${product.margin}%` : "N/A"}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="px-6 py-4 flex items-center justify-between border-t border-border">
        <div className="text-sm text-muted-foreground">
          {filteredProducts.length > 0 ? (
            <>
              Showing {Math.min((currentPage - 1) * 10 + 1, filteredProducts.length)} to{" "}
              {Math.min(currentPage * 10, filteredProducts.length)} of {filteredProducts.length} products
            </>
          ) : (
            "No products to display"
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || filteredProducts.length === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || filteredProducts.length === 0}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
