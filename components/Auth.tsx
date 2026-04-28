import React, { useEffect, useRef, useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, GraduationCap, Eye, EyeOff, MapPin, Hash, CalendarDays, AlertTriangle, X } from 'lucide-react';
import { authService, User as AuthUser } from '../services/authService';
import { contentService } from '../services/contentService';
import { EXAM_COUNT_OPTIONS, GENDER_OPTIONS, MAJORS, PROVINCES } from '../constants/profileOptions';

interface AuthProps {
  onLogin: (user: AuthUser) => void | Promise<void>;
  initialError?: string;
}

const InAppBrowserWarning: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInApp = /Line|FBAN|FBAV|Instagram|Messenger|WhatsApp/i.test(ua);
    setShow(isInApp);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] animate-in fade-in slide-in-from-top duration-500">
      <div className="bg-amber-600 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-amber-500/50 backdrop-blur-md bg-opacity-95">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm mb-0.5">ตรวจพบการใช้งานผ่านเบราว์เซอร์ในแอป (เช่น LINE, FB)</p>
          <p className="text-xs opacity-90 leading-relaxed">
            Google อาจไม่อนุญาตให้ล็อกอินผ่านเบราว์เซอร์นี้ 
            <span className="block mt-1 font-bold">กรุณากดปุ่ม 3 จุด (หรือแชร์) แล้วเลือก "เปิดด้วยเบราว์เซอร์เริ่มต้น" (Safari/Chrome)</span>
          </p>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const Auth: React.FC<AuthProps> = ({ onLogin, initialError = '' }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [notice, setNotice] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const googleAutoLaunchTriggered = useRef(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    major: '',
    province: '',
    examCount: ''
  });

  useEffect(() => {
    setError(initialError);
    if (initialError) {
      setNotice('');
    }
  }, [initialError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setNotice('');
  };

  const handleAuthSuccess = async (user: AuthUser) => {
    try {
      const bannedUsers = await contentService.getBannedUsers();
      const banRecord = bannedUsers.find((item) => item.userId === user.id || item.userName === user.name);
      if (banRecord) {
        if (banRecord.banType === 'permanent') {
          setError(`บัญชีของคุณถูกระงับการใช้งานถาวร เนื่องจาก: ${banRecord.reason}`);
          return;
        }

        if (banRecord.banUntil && new Date(banRecord.banUntil) > new Date()) {
          setError(`บัญชีของคุณถูกระงับการใช้งานชั่วคราวถึง ${new Date(banRecord.banUntil).toLocaleDateString('th-TH')} เนื่องจาก: ${banRecord.reason}`);
          return;
        }
      }
    } catch (error) {
      console.error('Failed to validate banned user state', error);
    }

    await onLogin(user);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setNotice('');

    try {
      const res = await authService.login(formData.email, formData.password);
      if (res.success && res.user) {
        await handleAuthSuccess(res.user);
      } else {
        setError(res.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      setError('กรุณากรอกชื่อผู้ใช้งาน');
      return;
    }
    setIsLoading(true);
    setError('');
    setNotice('');

    try {
      const res = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        gender: formData.gender,
        major: formData.major,
        province: formData.province,
        examCount: formData.examCount
      });

      if (res.success && res.user) {
        await handleAuthSuccess(res.user);
      } else if (res.success && res.requiresEmailConfirmation) {
        setNotice(res.message || 'สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีก่อนเข้าสู่ระบบ');
        setIsLogin(true);
        setFormData(current => ({
          ...current,
          password: '',
        }));
      } else {
        setError(res.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setNotice('');
    setFormData({ name: '', email: '', password: '', age: '', gender: '', major: '', province: '', examCount: '' });
    setShowPassword(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    setNotice('');

    try {
      const res = await authService.signInWithGoogle('current-window');
      if (!res.success) {
        setError(res.message || 'ไม่สามารถเข้าสู่ระบบด้วย Google ได้');
      } else {
        setNotice(res.message || 'กำลังพาไปเข้าสู่ระบบด้วย Google...');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับ Google Login ได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (googleAutoLaunchTriggered.current || typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    if (url.searchParams.get('google_login') !== '1') {
      return;
    }

    googleAutoLaunchTriggered.current = true;
    url.searchParams.delete('google_login');
    window.history.replaceState({}, document.title, url.toString());

    setNotice('กำลังพาไปเข้าสู่ระบบด้วย Google...');
    setError('');
    setIsLoading(true);

    void authService.signInWithGoogle('current-window').then((res) => {
      if (!res.success) {
        setError(res.message || 'ไม่สามารถเข้าสู่ระบบด้วย Google ได้');
        setNotice('');
        setIsLoading(false);
      }
    }).catch(() => {
      setError('ไม่สามารถเข้าสู่ระบบด้วย Google ได้');
      setNotice('');
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 sm:p-8 font-sans relative overflow-hidden">
      <InAppBrowserWarning />
      {/* Doodle Pattern Background */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url('https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/doodle%20(1).png')`,
          backgroundSize: '300px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* โครงสร้างหลัก: บังคับความกว้างและส่วนสูง */}
      <div className="relative w-full max-w-5xl h-[750px] bg-white backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden z-10 flex">
        
        {/* ================= ซีกซ้าย: ฟอร์มเข้าสู่ระบบ (ตรึงอยู่กับที่) ================= */}
        <div className={`absolute top-0 left-0 w-full sm:w-1/2 h-full bg-white z-0 flex flex-col justify-center px-8 sm:px-16 overflow-y-auto custom-scrollbar transition-transform duration-500 ${isLogin ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
          <div className="flex flex-col items-center text-center mb-8 mt-4">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">SOBKRU <span className="text-amber-500">69</span></h1>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">ระบบติวสอบครูออนไลน์ฟรี</h2>
            <p className="text-slate-500">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบเตรียมสอบ</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5 pb-8">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">อีเมล</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="text"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                  placeholder="E-mail"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">รหัสผ่าน</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && isLogin && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  เข้าสู่ระบบ
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">หรือ</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 2.8 14.6 2 12 2 6.9 2 2.8 6.4 2.8 11.7S6.9 21.5 12 21.5c6.9 0 8.6-4.9 8.6-7.4 0-.5 0-.8-.1-1.2H12z" />
                <path fill="#4285F4" d="M3.8 7.1l3.2 2.4C7.8 7.7 9.7 6.3 12 6.3c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 3.8 14.6 3 12 3 8.4 3 5.2 5.1 3.8 8.1z" />
                <path fill="#FBBC05" d="M3 12c0 1.7.4 3.2 1.2 4.6l3.5-2.7c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L4.2 7.4C3.4 8.8 3 10.3 3 12z" />
                <path fill="#34A853" d="M12 21c2.5 0 4.7-.8 6.3-2.3l-3-2.5c-.8.6-1.9 1.1-3.3 1.1-2.3 0-4.2-1.5-4.9-3.6l-3.4 2.6C5.1 18.9 8.2 21 12 21z" />
              </svg>
              เข้าสู่ระบบด้วย Google
            </button>

            {notice && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm text-center font-medium">
                {notice}
              </div>
            )}
            
            {/* Mobile Switcher */}
            <div className="sm:hidden text-center pt-4 border-t border-slate-100">
              <p className="text-slate-500 text-sm mb-2">ยังไม่มีบัญชีผู้ใช้งาน?</p>
              <button 
                type="button"
                onClick={toggleMode}
                className="text-slate-900 font-bold hover:underline"
              >
                สมัครสมาชิกใหม่
              </button>
            </div>
          </form>
        </div>

        {/* ================= ซีกขวา: ฟอร์มสมัครสมาชิก (ตรึงอยู่กับที่) ================= */}
        <div className={`absolute top-0 right-0 w-full sm:w-1/2 h-full bg-white z-0 flex flex-col justify-center px-8 sm:px-12 py-8 overflow-y-auto custom-scrollbar transition-transform duration-500 ${!isLogin ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}`}>
          <div className="flex flex-col items-center text-center mb-6 mt-4">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">SOBKRU <span className="text-amber-500">69</span></h1>
            <h2 className="text-xl font-bold text-slate-800 mb-1">สร้างบัญชีใหม่</h2>
            <p className="text-slate-500 text-sm">ลงทะเบียนเพื่อเริ่มต้นเตรียมสอบกับเรา</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-4 pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">ชื่อผู้ใช้งาน</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
                    placeholder="ชื่อผู้ใช้งาน"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">อีเมล</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required={!isLogin}
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">รหัสผ่าน</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required={!isLogin}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">อายุ</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarDays className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                  </div>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
                    placeholder="อายุ (ปี)"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">เพศ</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
                >
                  <option value="">เลือกเพศ</option>
                  {GENDER_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">เอกที่เลือกสอบ</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <select
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm appearance-none"
                >
                  <option value="">เลือกวิชาเอก</option>
                  {MAJORS.map((major, idx) => (
                    <option key={idx} value={major}>{major}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">อาศัยอยู่ที่จังหวัด</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                  </div>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm appearance-none"
                  >
                    <option value="">เลือกจังหวัด</option>
                    {PROVINCES.map((province, idx) => (
                      <option key={idx} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">การสอบครั้งนี้เป็นครั้งที่</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-4 w-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                  </div>
                  <select
                    name="examCount"
                    value={formData.examCount}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm appearance-none"
                  >
                    <option value="">เลือกจำนวนครั้ง</option>
                    {EXAM_COUNT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && !isLogin && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  สมัครสมาชิก
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 2.8 14.6 2 12 2 6.9 2 2.8 6.4 2.8 11.7S6.9 21.5 12 21.5c6.9 0 8.6-4.9 8.6-7.4 0-.5 0-.8-.1-1.2H12z" />
                <path fill="#4285F4" d="M3.8 7.1l3.2 2.4C7.8 7.7 9.7 6.3 12 6.3c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 3.8 14.6 3 12 3 8.4 3 5.2 5.1 3.8 8.1z" />
                <path fill="#FBBC05" d="M3 12c0 1.7.4 3.2 1.2 4.6l3.5-2.7c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L4.2 7.4C3.4 8.8 3 10.3 3 12z" />
                <path fill="#34A853" d="M12 21c2.5 0 4.7-.8 6.3-2.3l-3-2.5c-.8.6-1.9 1.1-3.3 1.1-2.3 0-4.2-1.5-4.9-3.6l-3.4 2.6C5.1 18.9 8.2 21 12 21z" />
              </svg>
              สมัคร/เข้าสู่ระบบด้วย Google
            </button>
            <p className="text-center text-xs text-slate-500 -mt-2">
              ไม่ต้องตั้งรหัสผ่าน ระบบจะใช้อีเมลจาก Google แล้วให้กรอกข้อมูลที่เหลือต่อ
            </p>

            {notice && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm text-center font-medium">
                {notice}
              </div>
            )}

            {/* Mobile Switcher */}
            <div className="sm:hidden text-center pt-4 border-t border-slate-100">
              <p className="text-slate-500 text-sm mb-2">มีบัญชีผู้ใช้งานอยู่แล้ว?</p>
              <button 
                type="button"
                onClick={toggleMode}
                className="text-slate-900 font-bold hover:underline"
              >
                เข้าสู่ระบบที่นี่
              </button>
            </div>
          </form>
        </div>

        {/* ================= แผ่นรูปภาพแบบสไลด์ (ซ้อนทับอยู่ด้านบนสุด) - แสดงเฉพาะจอใหญ่ ================= */}
        <div 
          className="absolute top-0 left-0 w-1/2 h-full z-20 shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden hidden sm:block"
          style={{ 
            transform: isLogin ? 'translateX(100%)' : 'translateX(0%)',
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Background Image */}
          <img 
            src="https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/Gemini_Generated_Image_ysf3jkysf3jkysf3%20(1).png" 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Overlay สีดำ */}
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px]"></div>

          {/* เนื้อหาที่จะแสดงตอนอยู่ "หน้าล็อกอิน" (แผ่นสไลด์บังฝั่งขวา) */}
          <div 
            className={`absolute inset-0 flex flex-col justify-between p-12 text-center transition-opacity duration-500
            ${isLogin ? 'opacity-100 delay-300 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight mt-12">
                ยังไม่มีบัญชีผู้ใช้งาน?
              </h2>
              <p className="text-slate-300 text-lg mb-10 max-w-sm italic">
                "ความสำเร็จ ไม่ได้ตกมาจากฟ้า แต่เกิดจากการแสวงหาและลงมือทำ"
              </p>
              <button 
                onClick={toggleMode} 
                className="px-10 py-3.5 border-2 border-white/80 text-white rounded-full hover:bg-white hover:text-slate-900 transition-all font-semibold tracking-wide"
              >
                สมัครสมาชิกใหม่
              </button>
            </div>

            <div className="text-slate-400 text-sm mt-auto flex flex-col items-center gap-3">
              <img 
                src="https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/CC%20logo%20(1).png" 
                alt="CoolCom Logo" 
                className="h-6 object-contain opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col items-center gap-1">
                <span>© {new Date().getFullYear()} SobKru69 All Rights Reserved.</span>
                <span>Developed by Cool Com</span>
              </div>
            </div>
          </div>

          {/* เนื้อหาที่จะแสดงตอนอยู่ "หน้าสมัครสมาชิก" (แผ่นสไลด์บังฝั่งซ้าย) */}
          <div 
            className={`absolute inset-0 flex flex-col justify-between p-12 text-center transition-opacity duration-500
            ${!isLogin ? 'opacity-100 delay-300 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight mt-12">
                มีบัญชีผู้ใช้งานอยู่แล้ว?
              </h2>
              <p className="text-slate-300 text-lg mb-10 max-w-sm italic">
                "ความสำเร็จ ไม่ได้ตกมาจากฟ้า แต่เกิดจากการแสวงหาและลงมือทำ"
              </p>
              <button 
                onClick={toggleMode} 
                className="px-10 py-3.5 border-2 border-white/80 text-white rounded-full hover:bg-white hover:text-slate-900 transition-all font-semibold tracking-wide"
              >
                เข้าสู่ระบบ
              </button>
            </div>

            <div className="text-slate-400 text-sm mt-auto flex flex-col items-center gap-3">
              <img 
                src="https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/CC%20logo%20(1).png" 
                alt="CoolCom Logo" 
                className="h-6 object-contain opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col items-center gap-1">
                <span>© {new Date().getFullYear()} SobKru69 All Rights Reserved.</span>
                <span>Developed by Cool Com</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Auth;
