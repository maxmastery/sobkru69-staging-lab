import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle2, Package, Search, SlidersHorizontal, Sparkles, Percent, Clock, Tag, ExternalLink } from 'lucide-react';
import { ProductItem } from './admin/AdminShop';
import { contentService } from '../services/contentService';

interface ShopPageProps {
  onBack: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  part_a: 'ภาค ก',
  part_b: 'ภาค ข',
  part_c: 'ภาค ค',
};

const getProductImages = (product: ProductItem) => [
  product.imageUrl,
  ...(product.galleryImages || []),
].filter(Boolean);

const ShopPage: React.FC<ShopPageProps> = ({ onBack }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

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

  const subjects = useMemo(() => {
    return Array.from(new Set(products.map(product => product.subject).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'th'));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products
      .filter(product => {
        const searchableText = [
          product.name,
          product.description,
          product.subject,
          ...(product.features || []),
        ].join(' ').toLowerCase();
        const matchesSearch = !query || searchableText.includes(query);
        const matchesCategory = categoryFilter === 'all' || product.categoryPart === categoryFilter;
        const matchesSubject = subjectFilter === 'all' || product.subject === subjectFilter;
        return matchesSearch && matchesCategory && matchesSubject;
      })
      .sort((a, b) => {
        if (sortOrder === 'oldest') {
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        }
        if (sortOrder === 'price_low') {
          return a.price - b.price;
        }
        if (sortOrder === 'price_high') {
          return b.price - a.price;
        }
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [categoryFilter, products, searchTerm, sortOrder, subjectFilter]);

  const openProduct = async (product: ProductItem) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'auto' });
    try {
      await contentService.recordContentView('product', product.id);
    } catch (error) {
      console.error('Failed to record product view', error);
    }
  };

  if (selectedProduct) {
    const images = getProductImages(selectedProduct);
    const activeImage = images[activeImageIndex] || selectedProduct.imageUrl;
    const hasDiscount = selectedProduct.isDiscounted && selectedProduct.originalPrice > selectedProduct.price;
    const canBuy = selectedProduct.status === 'in_stock' && Boolean(selectedProduct.stripeUrl);

    return (
      <div className="w-full max-w-[1180px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[56px] pb-14 animate-in fade-in duration-300">
        <button onClick={() => setSelectedProduct(null)} className="mb-7 inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors font-bold">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับไปหน้าสินค้า
        </button>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)]">
          <section className="space-y-4">
            <div className="relative overflow-hidden rounded-[32px] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-[0_24px_60px_rgba(148,94,22,.10)]">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl"></div>
              <div className="relative flex min-h-[420px] items-center justify-center rounded-[24px] bg-white/70">
                {activeImage ? (
                  <img src={activeImage} alt={selectedProduct.name} className="max-h-[520px] w-full object-contain" />
                ) : (
                  <Package className="h-20 w-20 text-amber-200" />
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {images.slice(0, 3).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-28 overflow-hidden rounded-2xl border bg-white p-2 transition-all ${
                      activeImageIndex === index ? 'border-orange-400 shadow-lg shadow-orange-900/10' : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <img src={image} alt={`${selectedProduct.name} preview ${index + 1}`} className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="flex flex-col">
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedProduct.isNew && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                  <Sparkles className="h-3.5 w-3.5" /> NEW
                </span>
              )}
              {hasDiscount && (
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">
                  <Percent className="h-3.5 w-3.5" /> SALE
                </span>
              )}
              {selectedProduct.categoryPart && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                  <Tag className="h-3.5 w-3.5" /> {CATEGORY_LABELS[selectedProduct.categoryPart] || selectedProduct.categoryPart}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-950">{selectedProduct.name}</h1>
            {selectedProduct.subject && <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-orange-600">{selectedProduct.subject}</p>}
            <p className="mt-6 text-lg leading-8 text-slate-600">{selectedProduct.description}</p>

            {selectedProduct.features && selectedProduct.features.length > 0 && (
              <div className="mt-8 rounded-[28px] border border-slate-100 bg-white p-5">
                <div className="mb-4 text-sm font-black text-slate-900">สิ่งที่จะได้รับ</div>
                <ul className="space-y-3">
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto pt-8">
              <div className="mb-5">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">ราคา</div>
                <div className="mt-1 flex items-end gap-3">
                  <span className="text-5xl font-black text-orange-600">฿{selectedProduct.price.toLocaleString()}</span>
                  {hasDiscount && <span className="pb-2 text-xl font-bold text-slate-400 line-through">฿{selectedProduct.originalPrice.toLocaleString()}</span>}
                </div>
              </div>

              <a
                href={canBuy ? selectedProduct.stripeUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canBuy}
                onClick={(event) => {
                  if (!canBuy) {
                    event.preventDefault();
                  }
                }}
                className={`inline-flex w-full items-center justify-center gap-3 rounded-3xl px-6 py-4 text-lg font-black transition-all ${
                  canBuy
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_20px_45px_rgba(234,88,12,.28)] hover:-translate-y-1 hover:shadow-[0_26px_54px_rgba(234,88,12,.34)]'
                    : 'cursor-not-allowed bg-slate-100 text-slate-400'
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
                {selectedProduct.status === 'out_of_stock' ? 'สินค้าหมด' : selectedProduct.stripeUrl ? 'สั่งซื้อเลย' : 'ยังไม่ได้ตั้งค่าลิงก์ชำระเงิน'}
                {canBuy && <ExternalLink className="h-5 w-5" />}
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1120px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[60px] pb-10 animate-in fade-in duration-300">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium">
        <ArrowLeft className="w-5 h-5 mr-2" />
        กลับหน้าหลัก
      </button>
      <div className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">
          <Clock className="h-3.5 w-3.5" /> เรียงตามวันเวลา
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900">สั่งซื้อ ชีทสรุปรวมอ่านเตรียมสอบ</h1>
      </div>

      <div className="mb-8 grid gap-3 rounded-[28px] border border-slate-100 bg-white/80 p-3 shadow-sm md:grid-cols-[1.35fr_.8fr_.8fr_.8fr]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="ค้นหาชื่อสินค้า หรือคำสำคัญ..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
        </label>
        <label className="relative">
          <SlidersHorizontal className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-bold outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100">
            <option value="all">ทุกภาค</option>
            <option value="part_a">ภาค ก</option>
            <option value="part_b">ภาค ข</option>
            <option value="part_c">ภาค ค</option>
          </select>
        </label>
        <select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100">
          <option value="all">ทุกวิชา</option>
          {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
        </select>
        <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100">
          <option value="newest">ใหม่ล่าสุด</option>
          <option value="oldest">เก่าสุด</option>
          <option value="price_low">ราคาต่ำสุด</option>
          <option value="price_high">ราคาสูงสุด</option>
        </select>
      </div>

      {isLoading ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">กำลังโหลดสินค้า</h3>
          <p className="text-slate-500">กำลังดึงข้อมูลสินค้าจากระบบกลาง...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid max-w-[1020px] grid-cols-[repeat(auto-fit,minmax(240px,292px))] justify-start gap-6">
          {filteredProducts.map((product) => {
            const hasDiscount = product.isDiscounted && product.originalPrice > product.price;
            return (
              <button
                type="button"
                key={product.id}
                onClick={() => void openProduct(product)}
                className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_46px_rgba(148,94,22,.14)]"
              >
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-slate-50 p-3">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <Package className="w-12 h-12 text-slate-300" />
                  )}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {product.isNew && <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black text-white shadow-sm">NEW</span>}
                    {hasDiscount && <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-black text-white shadow-sm">SALE</span>}
                  </div>
                  {product.status === 'out_of_stock' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
                      <span className="rotate-[-10deg] rounded-full bg-red-600 px-4 py-2 text-sm font-black text-white">สินค้าหมด</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {product.categoryPart && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-600">{CATEGORY_LABELS[product.categoryPart] || product.categoryPart}</span>}
                    {product.subject && <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-black text-orange-700">{product.subject}</span>}
                  </div>
                  <h3 className="line-clamp-2 text-lg font-black leading-snug text-slate-900 transition-colors group-hover:text-orange-600">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
                  <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                      {hasDiscount && <div className="text-xs font-bold text-slate-400 line-through">฿{product.originalPrice.toLocaleString()}</div>}
                      <div className="text-2xl font-black text-orange-600">฿{product.price.toLocaleString()}</div>
                    </div>
                    <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-black text-orange-700 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                      ดูรายละเอียด
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">ไม่พบสินค้าที่ตรงกับตัวกรอง</h3>
          <p className="text-slate-500">ลองเปลี่ยนคำค้นหา หมวดภาค หรือวิชาอีกครั้ง</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
