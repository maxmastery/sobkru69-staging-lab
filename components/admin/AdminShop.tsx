import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, DollarSign, Package, X, Save, CheckCircle2, ShoppingCart, Eye, EyeOff, Store, Link as LinkIcon, Sparkles, Percent, Tag } from 'lucide-react';
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
  galleryImages: string[];
  categoryPart: string;
  subject: string;
  stripeUrl: string;
  isDiscounted: boolean;
  originalPrice: number;
  isNew: boolean;
  createdAt: string;
}

interface AdminShopProps {
  onPreviewShop?: () => void;
  onShopButtonVisibilityChange?: (isVisible: boolean) => void;
}

const AdminShop: React.FC<AdminShopProps> = ({ onPreviewShop, onShopButtonVisibilityChange }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<ProductItem>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShopButtonVisible, setIsShopButtonVisible] = useState(true);
  const [isSavingVisibility, setIsSavingVisibility] = useState(false);

  useEffect(() => {
    loadProducts();
    loadShopButtonSettings();
  }, []);

  const loadShopButtonSettings = async () => {
    try {
      const settings = await contentService.getShopButtonSettings();
      setIsShopButtonVisible(settings.isVisible);
      onShopButtonVisibilityChange?.(settings.isVisible);
    } catch (error) {
      console.error('Failed to load shop button settings', error);
      setIsShopButtonVisible(true);
    }
  };

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
      galleryImages: ['', ''],
      categoryPart: '',
      subject: '',
      stripeUrl: '',
      isDiscounted: false,
      originalPrice: 0,
      isNew: false,
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

  const handleGalleryImageChange = (index: number, value: string) => {
    const nextImages = [...(currentProduct.galleryImages || [])];
    nextImages[index] = value;
    setCurrentProduct({ ...currentProduct, galleryImages: nextImages.slice(0, 2) });
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

  const handleToggleShopButton = async (nextVisible: boolean) => {
    const previousVisible = isShopButtonVisible;
    setIsShopButtonVisible(nextVisible);
    onShopButtonVisibilityChange?.(nextVisible);
    setIsSavingVisibility(true);
    try {
      await contentService.setShopButtonSettings({ isVisible: nextVisible });
      setSaveMessage(nextVisible ? 'แสดงปุ่มไฟล์ E-book ที่หน้าหลักแล้ว' : 'ซ่อนปุ่มไฟล์ E-book จากหน้าหลักแล้ว');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save shop button settings', error);
      setIsShopButtonVisible(previousVisible);
      onShopButtonVisibilityChange?.(previousVisible);
      setSaveMessage('บันทึกสถานะปุ่มไม่สำเร็จ กรุณาตรวจสอบ Supabase app_settings');
      setTimeout(() => setSaveMessage(''), 3500);
    } finally {
      setIsSavingVisibility(false);
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" /> หมวดภาค
              </label>
              <select
                value={currentProduct.categoryPart || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, categoryPart: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              >
                <option value="">ทุกภาค / ไม่ระบุ</option>
                <option value="part_a">ภาค ก</option>
                <option value="part_b">ภาค ข</option>
                <option value="part_c">ภาค ค</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-400" /> วิชา / คำสำคัญ
              </label>
              <input
                type="text"
                value={currentProduct.subject || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, subject: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="เช่น ภาษาไทย, กฎหมาย, วิชาชีพครู"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" /> ลิงก์ชำระเงิน Stripe
              </label>
              <input
                type="url"
                value={currentProduct.stripeUrl || ''}
                onChange={(e) => setCurrentProduct({ ...currentProduct, stripeUrl: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="https://buy.stripe.com/..."
              />
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span>
                    <span className="flex items-center gap-2 text-sm font-black text-orange-900">
                      <Percent className="w-4 h-4" /> เปิดป้ายลดราคา
                    </span>
                    <span className="mt-1 block text-xs text-orange-700">แสดงราคาเต็มแบบขีดฆ่า + ป้าย SALE</span>
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={Boolean(currentProduct.isDiscounted)}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, isDiscounted: e.target.checked })}
                  />
                  <span className="relative h-7 w-14 rounded-full bg-orange-200 transition-colors peer-checked:bg-orange-500 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-7"></span>
                </label>
                {currentProduct.isDiscounted && (
                  <input
                    type="number"
                    min="0"
                    value={currentProduct.originalPrice || 0}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, originalPrice: Number(e.target.value) })}
                    className="mt-4 w-full px-4 py-2.5 bg-white border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    placeholder="ราคาเต็มก่อนลด"
                  />
                )}
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span>
                    <span className="flex items-center gap-2 text-sm font-black text-emerald-900">
                      <Sparkles className="w-4 h-4" /> เปิดป้าย New
                    </span>
                    <span className="mt-1 block text-xs text-emerald-700">ใช้เน้นสินค้าใหม่บนหน้าร้าน</span>
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={Boolean(currentProduct.isNew)}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, isNew: e.target.checked })}
                  />
                  <span className="relative h-7 w-14 rounded-full bg-emerald-200 transition-colors peer-checked:bg-emerald-500 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-7"></span>
                </label>
              </div>
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
                <ImageIcon className="w-4 h-4 text-slate-400" /> URL รูปภาพปกสินค้า
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

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1].map((index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-slate-400" /> URL ภาพรอง {index + 1}
                  </label>
                  <input
                    type="url"
                    value={(currentProduct.galleryImages || [])[index] || ''}
                    onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    placeholder="https://example.com/product-preview.jpg"
                  />
                </div>
              ))}
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

      <div className="relative overflow-hidden rounded-[28px] border border-amber-100 bg-gradient-to-br from-white via-amber-50/60 to-white p-5 shadow-sm">
        <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-amber-200/40 blur-2xl"></div>
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              isShopButtonVisible ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-100 text-slate-500'
            }`}>
              {isShopButtonVisible ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">Homepage Visibility</p>
              <h4 className="mt-1 text-xl font-black text-slate-900">ปุ่มไฟล์ E-book สรุปเนื้อหา</h4>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                เปิดเพื่อให้ผู้ใช้งานเห็นปุ่ม E-book ใต้ 3 ปุ่มหลักที่หน้าหลัก หรือปิดเพื่อซ่อนชั่วคราวโดยไม่กระทบข้อมูลสินค้า
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onPreviewShop}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-white px-5 py-3 text-sm font-black text-amber-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50"
            >
              <Store className="h-4 w-4" />
              ดูหน้าร้านค้า
            </button>
            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="text-sm font-bold text-slate-700">
                {isShopButtonVisible ? 'แสดงอยู่' : 'ซ่อนอยู่'}
              </span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isShopButtonVisible}
                disabled={isSavingVisibility}
                onChange={(e) => void handleToggleShopButton(e.target.checked)}
              />
              <span className="relative h-7 w-14 rounded-full bg-slate-300 transition-colors peer-checked:bg-amber-500 peer-disabled:opacity-60 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-7"></span>
            </label>
          </div>
        </div>
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
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.isNew && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-700">NEW</span>}
                      {item.isDiscounted && <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-black text-orange-700">SALE</span>}
                      {item.subject && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">{item.subject}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      {item.isDiscounted && item.originalPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">฿{item.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="font-bold text-amber-600">฿{item.price.toLocaleString()}</span>
                    </div>
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
