import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle2, Package, Search, SlidersHorizontal, Sparkles, Percent, Tag, ExternalLink, Loader2 } from 'lucide-react';
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

const ProductRibbon = ({ label, tone = 'new' }: { label: string; tone?: 'new' | 'upcoming' }) => (
  <div className="pointer-events-none absolute left-0 top-0 z-20 h-32 w-32 overflow-hidden">
    <div
      className={`absolute flex items-center justify-center py-2 text-center text-[11px] font-black uppercase leading-none tracking-[0.16em] text-white shadow-lg ring-1 ring-white/50 whitespace-nowrap ${
        tone === 'upcoming'
          ? 'bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 shadow-slate-900/25'
          : 'bg-gradient-to-r from-orange-700 via-orange-500 to-amber-400 shadow-orange-900/30'
      }`}
      style={{
        left: '-64px',
        top: '38px',
        width: '210px',
        transform: 'rotate(-45deg)',
        transformOrigin: 'center',
      }}
    >
      {label}
    </div>
    <div className={`absolute left-[92px] top-0 h-4 w-4 shadow-sm ${tone === 'upcoming' ? 'bg-slate-800/80' : 'bg-orange-800/80'}`} />
    <div className={`absolute left-0 top-[92px] h-4 w-4 shadow-sm ${tone === 'upcoming' ? 'bg-slate-800/80' : 'bg-orange-800/80'}`} />
  </div>
);

const DiscountRibbon = ({ percent }: { percent: number }) => (
  <div className="pointer-events-none absolute right-0 top-2 z-30 bg-red-600 px-4 py-1.5 text-sm font-black leading-none text-white shadow-lg shadow-red-900/25">
    -{percent}%
    <span className="absolute -bottom-1 right-0 border-l-[8px] border-t-[4px] border-l-red-900 border-t-red-900/80" />
  </div>
);

const ShopPage: React.FC<ShopPageProps> = ({ onBack }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [checkoutProductId, setCheckoutProductId] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

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
        if (Boolean(a.isUpcoming) !== Boolean(b.isUpcoming)) {
          return a.isUpcoming ? 1 : -1;
        }
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
    if (product.isUpcoming) {
      return;
    }

    setSelectedProduct(product);
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'auto' });
    try {
      await contentService.recordContentView('product', product.id);
    } catch (error) {
      console.error('Failed to record product view', error);
    }
  };

  const handleCheckout = async (product: ProductItem) => {
    const canBuyProduct = product.status === 'in_stock' && Boolean(product.stripePriceId);
    if (!canBuyProduct || checkoutProductId) return;

    setCheckoutError('');
    setCheckoutProductId(product.id);
    try {
      const response = await fetch('/api/create-stripe-checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success || !data.url) {
        throw new Error(data.message || 'สร้างลิงก์ชำระเงินไม่สำเร็จ');
      }
      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'สร้างลิงก์ชำระเงินไม่สำเร็จ');
      setCheckoutProductId('');
    }
  };

  if (selectedProduct) {
    const images = getProductImages(selectedProduct);
    const activeImage = images[activeImageIndex] || selectedProduct.imageUrl;
    const hasDiscount = Boolean(selectedProduct.isDiscounted);
    const hasOriginalPrice = hasDiscount && selectedProduct.originalPrice > selectedProduct.price;
    const hasAutoCheckout = Boolean(selectedProduct.stripePriceId);
    const canBuy = selectedProduct.status === 'in_stock' && hasAutoCheckout;
    const isCheckingOut = checkoutProductId === selectedProduct.id;

    return (
      <div className="w-full max-w-[1180px] mx-auto px-6 md:px-[80px] pt-8 md:pt-[56px] pb-14 animate-in fade-in duration-300">
        <button onClick={() => setSelectedProduct(null)} className="mb-7 inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors font-bold">
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับไปหน้าสินค้า
        </button>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)]">
          <section className="space-y-4">
            <div className="flex min-h-[440px] items-center justify-center">
              {activeImage ? (
                <img src={activeImage} alt={selectedProduct.name} className="max-h-[620px] w-full object-contain drop-shadow-[0_24px_42px_rgba(15,23,42,.12)]" />
              ) : (
                <Package className="h-20 w-20 text-amber-200" />
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.slice(0, 4).map((image, index) => (
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
                  <Sparkles className="h-3.5 w-3.5" /> NEW RELEASE
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

            <h1 className="text-2xl md:text-4xl font-black leading-[1.2] md:leading-[1.26] text-slate-950">{selectedProduct.name}</h1>
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

            <div className="mt-auto pt-8 text-center">
              <div className="mb-5">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">ราคา</div>
                <div className="mt-1 flex items-end justify-center gap-3">
                  <span className="text-5xl font-black text-[#FA6B19]">฿{selectedProduct.price.toLocaleString()}</span>
                  {hasOriginalPrice && <span className="pb-2 text-xl font-bold text-slate-400 line-through">฿{selectedProduct.originalPrice.toLocaleString()}</span>}
                </div>
              </div>

              {checkoutError && (
                <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {checkoutError}
                </div>
              )}

              <button
                type="button"
                disabled={!canBuy || isCheckingOut}
                onClick={() => void handleCheckout(selectedProduct)}
                className={`inline-flex w-full items-center justify-center gap-3 rounded-3xl px-6 py-[17px] text-lg font-black text-white transition-all ${
                  canBuy && !isCheckingOut
                    ? 'bg-[#FA6B19] shadow-[0_20px_45px_rgba(250,107,25,.30)] hover:-translate-y-1 hover:bg-[#E75F13] hover:shadow-[0_26px_54px_rgba(250,107,25,.38)]'
                    : 'cursor-not-allowed bg-[#FA6B19] opacity-70'
                }`}
              >
                {isCheckingOut ? <Loader2 className="h-6 w-6 animate-spin" /> : <ShoppingCart className="h-6 w-6" />}
                {selectedProduct.status === 'out_of_stock'
                  ? 'สินค้าหมด'
                  : !hasAutoCheckout
                    ? 'ยังไม่ได้ตั้งค่า Stripe Price ID'
                    : isCheckingOut
                      ? 'กำลังไปหน้าชำระเงิน...'
                      : 'สั่งซื้อเลย'}
                {canBuy && !isCheckingOut && <ExternalLink className="h-5 w-5" />}
              </button>
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
      <div className="mb-10 border-b border-slate-200 pb-5">
        <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(460px,520px)]">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900">E-book แนะนำสำหรับคุณ</h1>
          <div className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white/85 p-1.5 shadow-[0_14px_32px_rgba(15,23,42,.06)] backdrop-blur">
            <label className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#FA6B19]" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="ค้นหาชื่อสินค้า หรือคำสำคัญ..."
                className="h-11 w-full rounded-full border border-transparent bg-transparent pl-10 pr-3 text-sm font-bold text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-orange-50/70"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-black transition-all ${
                showFilters
                  ? 'bg-[#FA6B19] text-white shadow-[0_10px_24px_rgba(250,107,25,.24)]'
                  : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              กรองการค้นหา
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-3 rounded-[26px] border border-orange-100 bg-white/80 p-2.5 shadow-[0_18px_42px_rgba(15,23,42,.07)] md:grid-cols-3">
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 outline-none transition-all focus:border-orange-300 focus:ring-4 focus:ring-orange-100">
              <option value="all">ทุกภาค</option>
              <option value="part_a">ภาค ก</option>
              <option value="part_b">ภาค ข</option>
              <option value="part_c">ภาค ค</option>
            </select>
            <select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 outline-none transition-all focus:border-orange-300 focus:ring-4 focus:ring-orange-100">
              <option value="all">ทุกวิชา</option>
              {subjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
            </select>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-800 outline-none transition-all focus:border-orange-300 focus:ring-4 focus:ring-orange-100">
              <option value="newest">ใหม่ล่าสุด</option>
              <option value="oldest">เก่าสุด</option>
              <option value="price_low">ราคาต่ำสุด</option>
              <option value="price_high">ราคาสูงสุด</option>
            </select>
          </div>
        )}
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
        <section className="w-full">
          <div className="grid items-start grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-10">
            {filteredProducts.map((product) => {
              const isUpcoming = Boolean(product.isUpcoming);
              const hasDiscount = Boolean(product.isDiscounted);
              const hasOriginalPrice = !isUpcoming && hasDiscount && product.originalPrice > product.price;
              const discountPercent = hasOriginalPrice
                ? Math.max(1, Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100))
                : 0;
              return (
                <button
                  type="button"
                  key={product.id}
                  disabled={isUpcoming}
                  onClick={() => void openProduct(product)}
                  className={`group flex h-full flex-col text-left transition-transform duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-100 ${
                    isUpcoming ? 'cursor-default' : 'hover:-translate-y-1'
                  }`}
                >
                  <div className="relative mx-auto aspect-[3/4] w-full overflow-visible rounded-xl">
                    <div className="absolute inset-x-3 bottom-0 h-8 rounded-full bg-slate-900/12 blur-xl transition-opacity duration-300 group-hover:opacity-80"></div>
                    <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-[0_16px_34px_rgba(15,23,42,.13)] ring-1 ring-slate-200 transition-all duration-300 group-hover:shadow-[0_24px_46px_rgba(180,83,9,.18)] group-hover:ring-orange-200">
                      {isUpcoming ? (
                        <ProductRibbon label="UPCOMING" tone="upcoming" />
                      ) : (
                        product.isNew && <ProductRibbon label="NEW RELEASE" />
                      )}
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className={`h-full w-full object-contain transition-transform duration-500 ${isUpcoming ? 'grayscale opacity-45 saturate-50' : 'group-hover:scale-[1.03]'}`} />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-50">
                          <Package className="h-12 w-12 text-slate-300" />
                        </div>
                      )}
                      {discountPercent > 0 && <DiscountRibbon percent={discountPercent} />}
                      {!isUpcoming && product.status === 'out_of_stock' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/75 backdrop-blur-[2px]">
                          <span className="rotate-[-10deg] rounded-full bg-red-600 px-4 py-2 text-sm font-black text-white">สินค้าหมด</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex min-h-[112px] flex-1 flex-col">
                    <h3 className="line-clamp-2 min-h-[44px] text-base font-black leading-snug text-slate-950 transition-colors group-hover:text-orange-600">
                      {product.name}
                    </h3>
                    <div className="mt-1 flex min-h-[18px] flex-wrap gap-1.5">
                      {product.categoryPart && <span className="text-xs font-bold text-slate-500">{CATEGORY_LABELS[product.categoryPart] || product.categoryPart}</span>}
                      {product.subject && <span className="text-xs font-bold text-orange-600">{product.subject}</span>}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      {isUpcoming ? (
                        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-500">
                          กำลังมาเร็ว ๆ นี้
                        </span>
                      ) : (
                        <>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="text-2xl font-black text-[#FA6B19]">
                              ฿{product.price.toLocaleString()}
                              </span>
                              {hasOriginalPrice && (
                                <span className="text-sm font-bold text-slate-400 line-through">
                                  ฿{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="rounded-full bg-[#FA6B19] p-2.5 text-white shadow-lg shadow-orange-900/20 transition-colors group-hover:bg-[#E75F13]">
                            <ShoppingCart className="h-4 w-4" />
                          </span>
                        </>
                      )}
                        </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-9 rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 text-center text-sm font-bold text-slate-600">
            แสดงสินค้า {filteredProducts.length} รายการ จากสินค้าทั้งหมด {products.length} รายการ
          </div>
        </section>
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
