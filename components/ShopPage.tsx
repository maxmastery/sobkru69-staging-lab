import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle2, Package, X, Eye } from 'lucide-react';
import { ProductItem } from './admin/AdminShop';
import { contentService } from '../services/contentService';

interface ShopPageProps {
  onBack: () => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onBack }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const rows = await contentService.getProducts();
        setProducts(rows as ProductItem[]);
      } catch (error) {
        console.error('Failed to load products', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const openProduct = async (product: ProductItem) => {
    setSelectedProduct(product);
    try {
      await contentService.recordContentView('product', product.id);
    } catch (error) {
      console.error('Failed to record product view', error);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[60px] pb-8 animate-in fade-in duration-300">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" />
        กลับหน้าหลัก
      </button>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        สั่งซื้อ ชีทสรุปรวมอ่านเตรียมสอบ
      </h1>
      
      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">กำลังโหลดสินค้า</h3>
          <p className="text-slate-500">กำลังดึงข้อมูลสินค้าจากระบบกลาง...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col h-full group">
              <div className="h-56 bg-slate-100 overflow-hidden relative">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                    <Package className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                {product.status === 'out_of_stock' && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold transform -rotate-12 text-lg">
                      สินค้าหมด
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4 flex-1">
                  {product.description}
                </p>
                
                {product.features && product.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto gap-3">
                  <div className="text-2xl font-bold text-amber-600">
                    ฿{product.price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => void openProduct(product)}
                    className="px-4 py-2.5 rounded-xl border border-amber-200 text-amber-700 hover:bg-amber-50 font-medium flex items-center gap-2 transition-all"
                  >
                    <Eye className="w-5 h-5" />
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">ยังไม่มีสินค้าในขณะนี้</h3>
          <p className="text-slate-500">โปรดติดตามสินค้าใหม่ๆ เร็วๆ นี้</p>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-4xl bg-white rounded-[28px] overflow-hidden border border-amber-100 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="grid md:grid-cols-[1.05fr_0.95fr]">
              <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 min-h-[320px] flex items-center justify-center p-6">
                {selectedProduct.imageUrl ? (
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="max-h-[420px] w-full object-contain rounded-2xl" />
                ) : (
                  <div className="w-full h-full min-h-[280px] rounded-2xl bg-white border border-dashed border-amber-200 flex items-center justify-center text-amber-300">
                    <Package className="w-16 h-16" />
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {selectedProduct.status === 'in_stock' ? 'พร้อมสั่งซื้อ' : 'สินค้าหมดชั่วคราว'}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{selectedProduct.name}</h2>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-slate-600 leading-7 mb-6">{selectedProduct.description}</p>

                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="mb-8">
                    <div className="text-sm font-bold text-slate-900 mb-3">จุดเด่นสินค้า</div>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-400 font-bold">ราคา</div>
                    <div className="text-3xl font-black text-amber-600">฿{selectedProduct.price.toLocaleString()}</div>
                  </div>
                  <button
                    disabled={selectedProduct.status === 'out_of_stock'}
                    className={`px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all ${
                      selectedProduct.status === 'in_stock'
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {selectedProduct.status === 'in_stock' ? 'สั่งซื้อเลย' : 'สินค้าหมด'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
