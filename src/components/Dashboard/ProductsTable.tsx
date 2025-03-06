
import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

const ProductsTable: React.FC = () => {
  const { products, currentPage, setCurrentPage, totalPages } = useDashboard();

  return (
    <div className="glass-card rounded-lg overflow-hidden animate-slide-up animation-delay-300">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold">Products Comparison</h2>
      </div>
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
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-secondary/30 rounded flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">IMG</span>
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        SKU: {product.sku}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="font-medium">${product.storeA.price.toFixed(2)}</div>
                  <StatusBadge status={product.storeA.status} count={product.storeA.stock} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="font-medium">${product.storeB.price.toFixed(2)}</div>
                  <StatusBadge status={product.storeB.status} count={product.storeB.stock} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="font-medium">${product.storeC.price.toFixed(2)}</div>
                  <StatusBadge status={product.storeC.status} count={product.storeC.stock} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="text-positive font-medium">+{product.margin}%</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 flex items-center justify-between border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * 10 + 1} to{" "}
          {Math.min(currentPage * 10, products.length)} of {products.length} products
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
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
