import React, { useEffect, useRef, useState } from 'react';
import { X, Heart, Coffee, Gift, Upload, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { motion, AnimatePresence } from 'motion/react';
import { contentService } from '../services/contentService';
import { getStoredUser } from '../services/userActivityService';

interface DonationModalProps {
  onClose: () => void;
  initialView?: ViewState;
}

type ViewState = 'intro' | 'tiers' | 'qr' | 'verifying' | 'success' | 'error' | 'history';

interface DonationRecord {
  date: string;
  type: string;
  amount: number;
  slip: string;
  giftLink?: string;
  slipHash?: string;
  slipTextHash?: string;
  transactionRef?: string;
}

interface Tier {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  bonus: string;
  image: string;
  qrCode: string;
  color: {
    bg: string;
    border: string;
    text: string;
    button: string;
    hover: string;
    badge: string;
  };
}

const TIERS: Tier[] = [
  {
    id: 't1',
    name: 'กาแฟซาเล้ง',
    price: 25,
    subtitle: 'กาแฟรถพ่วงข้าง ราคาถูกใจ',
    bonus: '(ได้รับคำขอบคุณจากเรา)',
    image: 'https://drive.google.com/thumbnail?id=1cnKEhQBC8i8gkq871HE-5STSeKB0kbIz&sz=w800',
    qrCode: 'https://drive.google.com/thumbnail?id=1oB_Co9S_hrQxgA1dKK7Pj8g6_6N11_Hk&sz=w800',
    color: {
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      text: 'text-orange-900',
      button: 'bg-white border-2 border-orange-400 text-orange-600 hover:bg-orange-50 shadow-sm transition-all',
      hover: 'hover:border-orange-300',
      badge: 'bg-orange-600'
    }
  },
  {
    id: 't2',
    name: 'เลี้ยงกาแฟ',
    price: 65,
    subtitle: 'รับไฟล์แบบฝึกหัดภาษาอังกฤษ 2 ชุด',
    bonus: '(ไฟล์แบบฝึกหัดภาษาอังกฤษ 2 ชุด)',
    image: 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/sleep%20(1).png',
    qrCode: 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/Cooffee%20(1).jpg',
    color: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-900',
      button: 'bg-green-700 text-white hover:bg-green-800 shadow-md',
      hover: 'hover:border-green-400',
      badge: 'bg-green-700'
    }
  },
  {
    id: 't3',
    name: 'Starbucks Coffee',
    price: 160,
    subtitle: 'กาแฟพรีเมี่ยม จัดเต็ม',
    bonus: '(รับของขวัญพิเศษ)',
    image: 'https://drive.google.com/thumbnail?id=15fsUvXWueCtuBRiRDNdP1JwkTNecwiyi&sz=w800',
    qrCode: 'https://drive.google.com/thumbnail?id=16uXMxOEtGGP8NN0U5au12_M1jGAnTg1E&sz=w800',
    color: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'text-emerald-900',
      button: 'bg-emerald-900 text-white hover:bg-emerald-950 shadow-md',
      hover: 'hover:border-emerald-400',
      badge: 'bg-emerald-800'
    }
  }
];

const SUMMARY_FILE_LINK = 'https://drive.google.com/drive/folders/1NJ49PjvUz0dGS10rsifFi5yNsj39TiuV?usp=sharing';
const SUCCESS_IMAGE_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/logo%20thanit%20(10)%20(1).png';

const getSha256 = async (input: ArrayBuffer | string) => {
  const data = typeof input === 'string' ? new TextEncoder().encode(input) : input;
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const getImageDimensions = (file: File) => new Promise<{ width: number; height: number }>((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    URL.revokeObjectURL(url);
    resolve({ width: image.naturalWidth, height: image.naturalHeight });
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    reject(new Error('Cannot read image dimensions'));
  };
  image.src = url;
});

const normalizeSlipText = (text: string) => text
  .toLowerCase()
  .replace(/\s+/g, '')
  .replace(/[|_\-–—:;,.()[\]{}"'`~]/g, '');

const extractTransactionRef = (text: string) => {
  const normalized = text.replace(/\s+/g, ' ');
  const labeledMatch = normalized.match(/(?:ref|reference|transaction|เลขที่|อ้างอิง|รายการ)[^\dA-Zก-ฮ]{0,12}([A-Z0-9]{8,30})/i);
  if (labeledMatch?.[1]) return labeledMatch[1].toUpperCase();

  const numericCandidates = Array.from(normalized.matchAll(/\b\d{10,30}\b/g), match => match[0]);
  return numericCandidates.sort((a, b) => b.length - a.length)[0] || '';
};

const extractAmount = (text: string): number | null => {
  const normalized = text.replace(/\s+/g, ' ').toLowerCase();
  
  // Look for keywords like "จำนวนเงิน", "ยอดเงิน", "amount" and the number that follows
  // Thai pattern: จำนวนเงิน 10.00 บาท
  const thaiMatch = normalized.match(/(?:จำนวนเงิน|ยอดเงิน|เงิน|ยอด)[^\d]{0,10}(\d{1,7}(?:[.,]\d{2})?)/i);
  if (thaiMatch?.[1]) {
    return parseFloat(thaiMatch[1].replace(',', ''));
  }

  // English pattern: Amount 10.00
  const engMatch = normalized.match(/(?:amount|total)[^\d]{0,10}(\d{1,7}(?:[.,]\d{2})?)/i);
  if (engMatch?.[1]) {
    return parseFloat(engMatch[1].replace(',', ''));
  }

  // Fallback: If no label found, look for the largest number that looks like an amount (e.g. 10.00, 100.00)
  const allNumbers = normalized.match(/\d{1,7}[.,]\d{2}/g);
  if (allNumbers && allNumbers.length > 0) {
    const amounts = allNumbers.map(n => parseFloat(n.replace(',', ''))).filter(n => n > 0);
    if (amounts.length > 0) {
      // Often the first "amount-like" number is the actual transfer amount
      return amounts[0];
    }
  }

  return null;
};

const DonationModal: React.FC<DonationModalProps> = ({ onClose, initialView = 'intro' }) => {
  const [view, setView] = useState<ViewState>(initialView);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [verificationError, setVerificationError] = useState('');
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUser = getStoredUser();

  const totalDonation = donationHistory.reduce((sum, record) => sum + record.amount, 0);
  const milestoneReached = totalDonation >= 500;
  const discountCode = "COOLCOM1500_OFF";
  const summaryTier = TIERS[1];
  const hasUnlockedSummary = donationHistory.some(record => record.giftLink === SUMMARY_FILE_LINK || record.amount === summaryTier.price);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const rows = await contentService.getDonationHistory({
          userId: currentUser?.id,
          userEmail: currentUser?.email,
        });
        setDonationHistory(rows as DonationRecord[]);
      } catch (error) {
        console.error('Failed to load donation history', error);
        setDonationHistory([]);
      }
    };

    loadHistory();
  }, [currentUser?.email, currentUser?.id]);

  const saveDonation = async (
    tier: Tier,
    verification?: Pick<DonationRecord, 'slipHash' | 'slipTextHash' | 'transactionRef'> & { extractedAmount?: number },
    slipPath?: string,
  ) => {
    const newRecord = await contentService.saveDonationRecord({
      userId: currentUser?.id,
      userEmail: currentUser?.email,
      tierId: tier.id,
      tierName: tier.name,
      amount: verification?.extractedAmount || tier.price,
      slipPath,
      slipHash: verification?.slipHash,
      slipTextHash: verification?.slipTextHash,
      transactionRef: verification?.transactionRef,
      giftLink: tier.id === 't2' || tier.id === 't3' ? SUMMARY_FILE_LINK : undefined,
      status: 'verified',
    });
    setDonationHistory(current => [newRecord as DonationRecord, ...current]);
  };

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier);
    setView('qr');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setView('verifying');
      setVerificationError('');
      try {
        if (!selectedTier) {
          throw new Error('missing-selected-tier');
        }
        if (!file.type.startsWith('image/')) {
          setVerificationError('กรุณาอัปโหลดไฟล์รูปภาพสลิปเท่านั้น');
          setView('error');
          return;
        }

        const [slipHash, imageSize] = await Promise.all([
          getSha256(await file.arrayBuffer()),
          getImageDimensions(file)
        ]);

        const conflictsByHash = await contentService.findDonationConflicts({ slipHash });
        if (conflictsByHash.bySlipHash || donationHistory.some(record => record.slipHash === slipHash)) {
          setVerificationError('สลิปนี้เคยถูกใช้งานแล้ว กรุณาใช้สลิปใหม่ที่ยังไม่เคยแนบมาก่อน');
          setView('error');
          return;
        }

        if (file.size < 20000 || imageSize.width < 350 || imageSize.height < 350) {
          setVerificationError('รูปสลิปมีขนาดเล็กหรือความละเอียดต่ำเกินไป กรุณาอัปโหลดสลิปฉบับเต็มจากแอปธนาคาร');
          setView('error');
          return;
        }

        const { data: { text } } = await Tesseract.recognize(
          file,
          'tha+eng',
          { logger: () => {} } // silences logs
        );
        
        const cleanedText = normalizeSlipText(text);
        const slipTextHash = await getSha256(cleanedText);
        const transactionRef = extractTransactionRef(text);
        const extractedAmount = extractAmount(text);
        
        // Check for specific keywords (correct spelling: ธนิต)
        const nameKeywords = ['coolcom', 'คูลคอม', 'ธนิต', 'ธนิพัฒน์', 'นิรัชกุล', 'thanit'];
        const hasName = nameKeywords.some(kw => cleanedText.includes(kw));
        const slipKeywords = ['promptpay', 'thaiqr', 'payment', 'ธนาคาร', 'รายการ', 'อ้างอิง', 'บัญชี', 'baht', 'บาท'];
        const hasSlipSignal = slipKeywords.some(kw => cleanedText.includes(kw));
        
        const conflicts = await contentService.findDonationConflicts({ slipHash, slipTextHash, transactionRef });
        if (conflicts.bySlipTextHash || donationHistory.some(record => record.slipTextHash === slipTextHash)) {
          setVerificationError('ตรวจพบว่าสลิปมีข้อมูลซ้ำกับสลิปที่เคยใช้แล้ว กรุณาใช้สลิปใหม่');
          setView('error');
          return;
        }

        if (conflicts.byTransactionRef || (transactionRef && donationHistory.some(record => record.transactionRef === transactionRef))) {
          setVerificationError('เลขอ้างอิงธุรกรรมนี้เคยถูกใช้แล้ว ระบบไม่อนุญาตให้ใช้สลิปซ้ำ');
          setView('error');
          return;
        }

        // Logic: Must have Merchant Name/Store and must have some kind of transaction signal
        // We now use the extracted amount if found, otherwise fallback to tier price
        if (hasName && (hasSlipSignal || transactionRef)) {
             const uploadedSlip = await contentService.uploadDonationSlip(file);
             await saveDonation(selectedTier, { slipHash, slipTextHash, transactionRef, extractedAmount: extractedAmount || undefined }, uploadedSlip.path);
             setView('success');
        } else {
             setVerificationError('ข้อมูลในสลิปไม่ครบถ้วน กรุณาใช้สลิปฉบับเต็มที่เห็นชื่อบัญชี CoolCom หรือ นายธนิท และข้อมูลธุรกรรมชัดเจน');
             setView('error');
        }
      } catch (err) {
        console.error(err);
        setVerificationError('ระบบอ่านสลิปไม่สำเร็จ กรุณาอัปโหลดภาพสลิปที่คมชัดและเป็นสลิปฉบับเต็ม');
        setView('error');
      } finally {
        e.target.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl max-w-[440px] w-full overflow-hidden flex flex-col relative"
          >
            
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
            <X className="w-5 h-5" />
          </button>

          <div className="p-10 md:p-12 flex flex-col transition-colors duration-500 bg-gradient-to-br from-amber-50 to-orange-50 items-center text-center">
            
            <img 
              src={summaryTier.image}
              alt="Support Banner"
              className="w-full h-auto max-h-[200px] rounded-2xl mb-8 object-cover"
              referrerPolicy="no-referrer"
            />
            
            <h2 className="text-3xl font-bold mb-4 text-slate-900 leading-tight">
              เลี้ยงกาแฟนักพัฒนา
            </h2>
            <p className="font-semibold flex items-center justify-center gap-2 mb-6 text-amber-600 text-lg">
              สนับสนุนการพัฒนาเว็บไซต์ <Heart className="w-5 h-5 fill-current text-red-500" />
            </p>

            <div className="space-y-4 leading-relaxed mb-8 text-slate-600">
              <p>
                หากเว็บไซต์นี้มีประโยชน์และช่วยให้คุณเตรียมตัวสอบได้ดีขึ้น คุณสามารถสนับสนุนค่ากาแฟเล็กๆ น้อยๆ เพื่อเป็นกำลังใจในการพัฒนาต่อไปได้ครับ
              </p>
            </div>

            <div className="mt-auto w-full flex flex-col items-center gap-4">
              <button 
                onClick={() => handleSelectTier(summaryTier)}
                className="w-full py-4 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all bg-amber-600 text-white hover:bg-amber-700 shadow-lg text-lg ring-4 ring-amber-100 active:scale-95"
              >
                <Coffee className="w-6 h-6" /> เลี้ยงกาแฟ
              </button>
              
              <p className="text-amber-800 font-semibold text-sm leading-relaxed">
                {hasUnlockedSummary ? (
                  <a
                    href={SUMMARY_FILE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline decoration-green-300 underline-offset-4 hover:text-green-800"
                  >
                    คุณได้เลี้ยงกาแฟแล้ว คลิก เพื่อรับไฟล์สรุปเนื้อหา
                  </a>
                ) : (
                  'แลกรับไฟล์แบบฝึกหัดภาษาอังกฤษ 2 ชุด'
                )}
              </p>
            </div>
            </div>
          </motion.div>
        )}

        {view === 'tiers' && (
          <motion.div 
            key="tiers"
            initial={{ opacity: 0, scale: 0.1, y: 300, borderRadius: '150px' }}
            animate={{ opacity: 1, scale: 1, y: 0, borderRadius: '24px' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.8 }}
            className="bg-white rounded-3xl max-w-[850px] w-full min-h-[500px] overflow-y-auto flex flex-col relative p-8"
          >
            <button 
            onClick={() => setView('intro')} 
            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">เลือกกาแฟที่คุณอยากเลี้ยง ☕</h2>
            <p className="text-slate-500">ขอบคุณสำหรับการสนับสนุนเพื่อเป็นกำลังใจในการพัฒนา</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch justify-center mb-4">
            {TIERS.map((tier, index) => (
              <div key={tier.id} className={`${tier.color.bg} rounded-3xl p-6 flex flex-col items-center justify-between transition-all hover:-translate-y-2 hover:shadow-lg duration-300 group relative border shadow-sm ${tier.color.border}`}>
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-20 pointer-events-none rounded-tr-3xl">
                  <div 
                    className={`${tier.color.badge} text-white font-bold py-1.5 text-sm tracking-wide text-center shadow-md`}
                    style={{ position: 'absolute', top: '28px', right: '-36px', width: '150px', transform: 'rotate(45deg)' }}
                  >
                    {tier.price} Baht
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 mb-4">
                  <img 
                    src={tier.image} 
                    alt={tier.name} 
                    className="w-32 h-32 object-cover rounded-full mb-4"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className={`text-xl font-bold ${tier.color.text}`}>{tier.name}</h3>
                  <div className={`flex flex-col items-center text-sm mt-1 text-center ${tier.color.text} opacity-80 min-h-[60px] justify-center`}>
                    <span className="font-medium line-clamp-2">{tier.subtitle}</span>
                    <span className="text-[10px] font-semibold mt-1.5 bg-white/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      {index === 2 ? <Gift className="w-3 h-3" /> : null}
                      {tier.bonus}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelectTier(tier)} 
                  className={`mt-2 w-full py-3 rounded-xl font-bold transition-all relative z-10 text-base ${tier.color.button}`}
                 >
                  เลี้ยง {tier.name}
                </button>
              </div>
            ))}
          </div>
          </motion.div>
        )}

        {view === 'qr' && selectedTier && (
          <motion.div 
            key="qr"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            className={`bg-white rounded-3xl max-w-[360px] w-full overflow-hidden flex flex-col relative p-7 items-center text-center border-2 ${selectedTier.color.border}`}
          >
            <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setView('intro')} 
            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h2 className={`text-2xl font-bold mb-2 mt-4 ${selectedTier.color.text}`}>สแกนเพื่อเลี้ยงกาแฟ</h2>

          <div className="bg-white p-3 rounded-3xl border border-slate-200 my-6 w-full max-w-[272px] max-h-[392px] flex items-center justify-center relative overflow-hidden group">
            <img 
              src={selectedTier.qrCode}
              alt="QR Code"
              className="w-full h-auto max-h-[368px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          <input 
            type="file" 
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          <button 
            onClick={triggerFileUpload}
            className={`w-full py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all text-white text-lg ${selectedTier.color.badge} hover:opacity-90`}
          >
            <Upload className="w-6 h-6" /> แนบสลิปเพื่อรับของที่ระลึก
          </button>
          </motion.div>
        )}

        {view === 'verifying' && (
          <motion.div 
            key="verifying"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden flex flex-col relative p-12 items-center text-center"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping blur-sm"></div>
              <div className="bg-blue-100 p-4 rounded-full relative z-10">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">กำลังตรวจสอบสลิป...</h2>
            <p className="text-slate-500 text-sm">กำลังอ่านชื่อบัญชี ยอดเงิน ลายนิ้วมือไฟล์ และตรวจสลิปซ้ำ</p>
          </motion.div>
        )}

        {view === 'error' && (
          <motion.div 
            key="error"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            transition={{ type: "spring", damping: 10, stiffness: 200 }}
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden flex flex-col relative p-8 items-center text-center border-t-8 border-red-500"
          >
            <div className="bg-red-100 p-4 rounded-full mb-6">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">ไม่พบข้อมูลที่ตรงกัน</h2>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              {verificationError || 'ระบบตรวจสอบไม่พบข้อมูลเพื่อยืนยัน กรุณาตรวจสอบสลิปหรืออัปโหลดใหม่อีกครั้ง'}
            </p>

            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setView('qr')}
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
              >
                ลองใหม่
              </button>
            </div>
          </motion.div>
        )}

        {view === 'success' && selectedTier && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            transition={{ type: "spring", damping: 15, stiffness: 150 }}
            className={`bg-white rounded-3xl max-w-[440px] w-full overflow-hidden flex flex-col relative p-10 items-center text-center border-t-8 ${selectedTier.id === 't1' ? 'border-amber-500' : selectedTier.id === 't2' ? 'border-green-500' : 'border-emerald-700'}`}
          >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-bold text-slate-800 mb-6">ขอบคุณที่เลี้ยงกาแฟครับ</h2>
          
          <div className="mb-6 p-1 bg-slate-100 rounded-2xl inline-block">
             <img 
               src={SUCCESS_IMAGE_URL}
               alt={selectedTier.name} 
               className="w-48 h-48 object-cover rounded-xl border-4 border-white" 
               referrerPolicy="no-referrer" 
             />
          </div>

          <div className="space-y-3 mb-8">
            <p className={`text-2xl font-bold ${selectedTier.color.text}`}>ขอบคุณครับ!</p>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              ขอให้การเตรียมสอบครั้งนี้ประสบความสำเร็จ <br/>
              <span className="text-indigo-600 font-bold border-b-2 border-indigo-200">ขอให้สอบติดตัวจริงนะครับ!</span>
            </p>
          </div>

          {milestoneReached && (
            <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-100 w-full animate-bounce">
              <p className="text-indigo-800 font-bold text-sm mb-2 uppercase tracking-wider flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" /> ปลดล็อกโค้ดส่วนลด CoolCom
              </p>
              <p className="text-2xl font-black text-indigo-900 mb-1">ลดทันที 1,500 บาท</p>
              <p className="text-xs text-indigo-600 mb-4 opacity-75">(เมื่อมียอดสะสมตั้งแต่ 500 บาทขึ้นไป)</p>
              <div className="bg-white py-3 px-4 rounded-xl border-2 border-dashed border-indigo-300 select-all cursor-copy group relative">
                <span className="text-xl font-mono font-bold text-slate-800 tracking-widest">{discountCode}</span>
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] py-0.5 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2">* เมื่อซื้อสินค้าขั้นต่ำตามที่กำหนด บนเว็บไซต์ CoolCom</p>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
            {selectedTier.id === 't2' && (
               <button 
                  onClick={() => window.open(SUMMARY_FILE_LINK, '_blank')}
                  className="w-full py-4 px-6 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 transition-all flex justify-center items-center gap-3 text-lg"
               >
                  รับไฟล์แบบฝึกหัดภาษาอังกฤษ <Gift className="w-6 h-6" />
               </button>
            )}

            {selectedTier.id === 't3' && (
               <button 
                  onClick={() => window.open(SUMMARY_FILE_LINK, '_blank')}
                  className="w-full py-4 px-6 rounded-2xl font-bold bg-emerald-800 text-white hover:bg-emerald-900 transition-all flex justify-center items-center gap-3 text-lg"
               >
                  รับไฟล์แบบฝึกหัดภาษาอังกฤษ <Gift className="w-6 h-6" />
               </button>
            )}
            
            <button 
              onClick={onClose}
              className="w-full py-4 px-6 rounded-2xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all text-lg"
            >
              กลับสู่บทเรียน
            </button>
          </div>
          </motion.div>
        )}
        {view === 'history' && (
          <motion.div 
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(5px)' }}
            className="bg-white rounded-3xl max-w-[650px] w-full min-h-[500px] overflow-hidden flex flex-col relative p-8"
          >
            <button 
              onClick={() => setView('intro')} 
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">ประวัติการเลี้ยงกาแฟ ☕</h2>
              <p className="text-slate-500">ขอบคุณสำหรับน้ําใจที่มอบให้นักพัฒนาครับ</p>
            </div>

            <div className="flex-1 overflow-y-auto mb-6">
              {donationHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Coffee className="w-16 h-16 mb-4 opacity-20" />
                  <p>ยังไม่มีประวัติการเลี้ยงกาแฟ</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-bold">
                      <tr>
                        <th className="px-5 py-4">วันที่</th>
                        <th className="px-5 py-4">ประเภทกาแฟ</th>
                        <th className="px-5 py-4">ยอดเงิน</th>
                        <th className="px-5 py-4">สิทธิพิเศษ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {donationHistory.map((record, i) => (
                        <tr key={record.id || i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{new Date(record.date).toLocaleString('th-TH')}</td>
                          <td className="px-5 py-4 font-bold text-slate-800">{record.type}</td>
                          <td className="px-5 py-4 font-mono font-bold text-amber-600">{record.amount} ฿</td>
                          <td className="px-5 py-4">
                            {record.giftLink ? (
                              <button 
                                onClick={() => window.open(record.giftLink, '_blank')}
                                className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                              >
                                <Gift className="w-3 h-3" /> รับไฟล์
                              </button>
                            ) : (
                              <span className="text-slate-300 italic">ไม่มี</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 font-medium">ยอดสนับสนุนสะสม:</span>
                <span className="text-2xl font-black text-amber-600">{totalDonation} บาท</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full transition-all duration-1000" 
                  style={{ width: `${Math.min((totalDonation / 500) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                 <p className="text-xs text-slate-500">สะสมให้ถึง 500 บาท เพื่อรับโค้ดส่วนลด 1,500 บาท</p>
                 {milestoneReached && (
                   <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse">สำเร็จ!</span>
                 )}
              </div>
              
              {milestoneReached && (
                <div className="mt-4 p-4 bg-white rounded-xl border-2 border-dashed border-amber-300 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">ส่วนลด CoolCom</p>
                    <p className="text-lg font-mono font-bold text-slate-800 tracking-wider h-7 flex items-center">{discountCode}</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(discountCode);
                      alert('คัดลอกโค้ดส่วนลดแล้ว!');
                    }}
                    className="p-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all"
                  >
                    คัดลอก
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationModal;
