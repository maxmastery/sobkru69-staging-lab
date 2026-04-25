import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle2, Package } from 'lucide-react';
import { ProductItem } from './admin/AdminShop';
import { contentService } from '../services/contentService';

interface ShopPageProps {
  onBack: () => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onBack }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="text-2xl font-bold text-amber-600">
                    ฿{product.price.toLocaleString()}
                  </div>
                  <button 
                    disabled={product.status === 'out_of_stock'}
                    className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${
                      product.status === 'in_stock' 
                        ? 'bg-amber-500 text-white hover:bg-amber-600' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.status === 'in_stock' ? 'สั่งซื้อเลย' : 'สินค้าหมด'}
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
    </div>
  );
};

export default ShopPage;
