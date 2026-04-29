import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, DollarSign, Package, X, Save, CheckCircle2, ShoppingCart } from 'lucide-react';
import { contentService } from '../../services/contentService';

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  features: string[];
  status: 'in_stock' | 'out_of_stock';
  viewCount: number;
}

const AdminShop: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<ProductItem>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

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

  const handleAddNew = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      features: [],
      status: 'in_stock',
      viewCount: 0,
    });
    setFeatureInput('');
    setIsEditing(true);
  };

  const handleEdit = (item: ProductItem) => {
    setCurrentProduct(item);
    setFeatureInput('');
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmId) {
      setIsLoading(true);
      try {
        await contentService.deleteProduct(deleteConfirmId);
        setProducts(current => current.filter(p => p.id !== deleteConfirmId));
      } catch (error) {
        console.error('Failed to delete product', error);
      } finally {
        setIsLoading(false);
      }
      setDeleteConfirmId(null);
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setCurrentProduct({
        ...currentProduct,
        features: [...(currentProduct.features || []), featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...(currentProduct.features || [])];
    newFeatures.splice(index, 1);
    setCurrentProduct({ ...currentProduct, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const saved = await contentService.saveProduct(currentProduct);
      setProducts(current =>
        currentProduct.id
          ? current.map(item => item.id === saved.id ? saved as ProductItem : item)
          : [saved as ProductItem, ...current]
      );
      setIsEditing(false);
      setSaveMessage('บันทึกสินค้าสำเร็จ');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save product', error);
      setSaveMessage('บันทึกสินค้าไม่สำเร็จ');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isEditing) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {currentProduct.id ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
          </h3>
          <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">ชื่อสินค้า</label>
              <input
                type="text"
                required
                value={currentProduct.name || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-lg font-medium"
                placeholder="เช่น ชีทสรุป ภาค ก"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">รายละเอียดสินค้า</label>
              <textarea
                required
                value={currentProduct.description || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all min-h-[120px]"
                placeholder="คำอธิบายสินค้า..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" /> ราคา (บาท)
              </label>
              <input
                type="number"
                required
                min="0"
                value={currentProduct.price || 0}
                onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" /> สถานะสินค้า
              </label>
              <select
                value={currentProduct.status || 'in_stock'}
                onChange={(e) => setCurrentProduct({ ...currentProduct, status: e.target.value as 'in_stock' | 'out_of_stock' })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              >
                <option value="in_stock">มีสินค้าพร้อมขาย (In Stock)</option>
                <option value="out_of_stock">สินค้าหมด (Out of Stock)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">จุดเด่นสินค้า (Features)</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  placeholder="เช่น ไฟล์ PDF โหลดอ่านได้ทันที"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
                >
                  เพิ่ม
                </button>
              </div>
              {currentProduct.features && currentProduct.features.length > 0 && (
                <ul className="space-y-2">
                  {currentProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-between bg-amber-50 text-amber-800 px-4 py-2 rounded-lg text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500" /> {feature}
                      </span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-amber-600 hover:text-red-600">
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> URL รูปภาพสินค้า
              </label>
              <input
                type="url"
                value={currentProduct.imageUrl || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="https://example.com/product.jpg"
              />
              {currentProduct.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 h-48 w-48 relative">
                  <img src={currentProduct.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400?text=Image+Error')} />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              บันทึกสินค้า
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {saveMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {saveMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          เพิ่มสินค้าใหม่
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 w-20">รูปภาพ</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">ชื่อสินค้า</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">ราคา</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">คนดู</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">สถานะ</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    กำลังโหลดข้อมูลสินค้า...
                  </td>
                </tr>
              )}
              {filteredProducts.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-300 m-auto mt-4" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 line-clamp-1">{item.name}</div>
                    <div className="text-xs text-slate-500 line-clamp-1 mt-1">{item.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-amber-600">฿{item.price.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-10 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700">
                      {item.viewCount || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'in_stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'in_stock' ? 'พร้อมขาย' : 'สินค้าหมด'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <ShoppingCart className="w-12 h-12 text-slate-300 mb-3" />
                      <p>ไม่พบข้อมูลสินค้า</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">ยืนยันการลบสินค้า</h3>
            <p className="text-center text-slate-500 mb-6 text-sm">
              คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? การดำเนินการนี้ไม่สามารถกู้คืนได้
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                ลบสินค้า
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShop;
