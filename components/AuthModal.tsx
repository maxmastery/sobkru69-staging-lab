import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CalendarDays, Eye, EyeOff, GraduationCap, Hash, Loader2, Lock, Mail, MapPin, User, X } from 'lucide-react';
import { authService, MaintenanceModeState, User as AuthUser } from '../services/authService';
import { contentService } from '../services/contentService';
import { EXAM_COUNT_OPTIONS, GENDER_OPTIONS, MAJORS, PROVINCES } from '../constants/profileOptions';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: AuthUser) => void | Promise<void>;
  initialMode?: 'login' | 'register';
  initialError?: string;
  maintenanceMode?: MaintenanceModeState;
}

const EMPTY_FORM = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  major: '',
  province: '',
  examCount: '',
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, initialMode = 'login', initialError = '', maintenanceMode }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [notice, setNotice] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setMode(initialMode);
    setError(initialError);
    setNotice('');
    setShowPassword(false);
  }, [initialError, initialMode, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const canLoginDuringMaintenance = (identifier: string) => ['krumax', 'test01', 'test02'].includes(identifier.trim().toLowerCase());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError('');
    setNotice('');
  };

  const handleAuthSuccess = async (user: AuthUser) => {
    try {
      const bannedUsers = await contentService.getBannedUsers();
      const banRecord = bannedUsers.find(item => item.userId === user.id || item.userName === user.name);
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
    } catch (authError) {
      console.error('Failed to validate banned user state', authError);
    }

    await onLogin(user);
    onClose();
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const identifier = formData.email.trim();
    if (maintenanceMode?.isActive && !canLoginDuringMaintenance(identifier)) {
      setError('ระบบอยู่ในช่วงปิดปรับปรุงชั่วคราว ขณะนี้เปิดให้เฉพาะผู้ดูแลระบบและบัญชีทดสอบเข้าใช้งาน');
      return;
    }
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
    } catch {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (maintenanceMode?.isActive) {
      setError('ระบบอยู่ในช่วงปิดปรับปรุงชั่วคราว ยังไม่เปิดรับสมัครสมาชิกในขณะนี้');
      return;
    }
    if (!formData.name.trim()) {
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
        examCount: formData.examCount,
      });

      if (res.success && res.user) {
        await handleAuthSuccess(res.user);
      } else if (res.success && res.requiresEmailConfirmation) {
        setNotice(res.message || 'สมัครสมาชิกสำเร็จ กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชีก่อนเข้าสู่ระบบ');
        setMode('login');
        setFormData(current => ({ ...current, password: '' }));
      } else {
        setError(res.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (maintenanceMode?.isActive) {
      setError('ระบบอยู่ในช่วงปิดปรับปรุงชั่วคราว ปิดการเข้าสู่ระบบสำหรับผู้ใช้ทั่วไปชั่วคราว');
      return;
    }
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
    } catch {
      setError('ไม่สามารถเชื่อมต่อกับ Google Login ได้');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode);
    setError('');
    setNotice('');
    setShowPassword(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/72 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className={`relative max-h-[92svh] w-[min(92vw,430px)] overflow-hidden rounded-[34px] border border-white/15 bg-slate-950/95 text-white shadow-[0_34px_100px_rgba(0,0,0,.55)] ${mode === 'login' ? 'min-h-[620px]' : ''}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,rgba(251,191,36,.22),transparent_64%)]" />
        <button
          onClick={onClose}
          aria-label="ปิด"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/65 transition hover:bg-amber-400 hover:text-slate-950"
        >
          <X className="h-5 w-5" />
        </button>

        <div className={`relative max-h-[92svh] overflow-y-auto px-6 py-8 sm:px-8 ${mode === 'login' ? 'flex min-h-[620px] flex-col justify-center' : ''}`}>
          <div className="mb-6 text-center">
            <div className="sobkru-auth-wordmark text-[3.05rem] font-black leading-none text-white sm:text-[3.45rem]">
              SobKru<span className="sobkru-auth-wordmark-gold">69</span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-white">
              {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครใช้งานระบบ'}
            </h2>
            <p className="mx-auto mt-1 max-w-xs text-sm font-semibold leading-6 text-white/60">
              {mode === 'login' ? 'เข้าสู่บทเรียนและบันทึกความคืบหน้าของคุณ' : 'สร้างบัญชีเพื่อเริ่มเตรียมสอบกับ Sobkru'}
            </p>
          </div>

          <div className="relative">
            <div
              key={mode}
              className="animate-[sobkruCardStack_.32s_cubic-bezier(.22,.8,.32,1)_both]"
            >
              {mode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <TextInput icon={Mail} label="อีเมล" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" required />
                  <PasswordInput label="รหัสผ่าน" name="password" value={formData.password} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} required />

                  {error && <FormMessage tone="error" text={error} />}
                  {notice && <FormMessage tone="success" text={notice} />}

                  <SubmitButton isLoading={isLoading}>เข้าสู่ระบบ</SubmitButton>
                  <GoogleButton isLoading={isLoading} onClick={handleGoogleLogin}>เข้าสู่ระบบด้วย Google</GoogleButton>

                  <p className="pt-2 text-center text-sm font-semibold text-white/55">
                    ยังไม่มีบัญชี?{' '}
                    <button type="button" onClick={() => switchMode('register')} className="font-black text-amber-300 hover:text-amber-200 hover:underline">
                      สมัครใช้งานระบบ
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <TextInput icon={User} label="ชื่อผู้ใช้งาน / ชื่อ-นามสกุล" name="name" value={formData.name} onChange={handleChange} placeholder="ชื่อผู้ใช้งาน" required />
                  <TextInput icon={Mail} label="อีเมล" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                  <PasswordInput label="รหัสผ่าน" name="password" value={formData.password} onChange={handleChange} showPassword={showPassword} setShowPassword={setShowPassword} required />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextInput icon={CalendarDays} label="อายุ" type="number" name="age" value={formData.age} onChange={handleChange} placeholder="อายุ (ปี)" />
                    <SelectInput label="เพศ" name="gender" value={formData.gender} onChange={handleChange} options={GENDER_OPTIONS.map(option => ({ label: option, value: option }))} placeholder="เลือกเพศ" />
                  </div>

                  <SelectInput icon={GraduationCap} label="เอกที่เลือกสอบ" name="major" value={formData.major} onChange={handleChange} options={MAJORS.map(option => ({ label: option, value: option }))} placeholder="เลือกวิชาเอก" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SelectInput icon={MapPin} label="อาศัยอยู่ที่จังหวัด" name="province" value={formData.province} onChange={handleChange} options={PROVINCES.map(option => ({ label: option, value: option }))} placeholder="เลือกจังหวัด" />
                    <SelectInput icon={Hash} label="การสอบครั้งนี้เป็นครั้งที่" name="examCount" value={formData.examCount} onChange={handleChange} options={EXAM_COUNT_OPTIONS.map(option => ({ label: option.label, value: option.value }))} placeholder="เลือกจำนวนครั้ง" />
                  </div>

                  {error && <FormMessage tone="error" text={error} />}
                  {notice && <FormMessage tone="success" text={notice} />}

                  <SubmitButton isLoading={isLoading}>สมัครสมาชิก</SubmitButton>
                  <GoogleButton isLoading={isLoading} onClick={handleGoogleLogin}>สมัคร/เข้าสู่ระบบด้วย Google</GoogleButton>

                  <p className="pt-2 text-center text-sm font-semibold text-white/55">
                    มีบัญชีแล้ว?{' '}
                    <button type="button" onClick={() => switchMode('login')} className="font-black text-amber-300 hover:text-amber-200 hover:underline">
                      เข้าสู่ระบบ
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type IconType = React.ComponentType<{ className?: string }>;

const TextInput = ({ icon: Icon, label, type = 'text', name, value, onChange, placeholder, required = false }: {
  icon: IconType;
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-bold text-white/75">{label}</span>
    <span className="relative block">
      <Icon className="absolute left-4 top-[54%] h-5 w-5 -translate-y-1/2 text-amber-200/70" />
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="block w-full rounded-2xl border border-white/12 bg-white/8 py-3.5 pl-12 pr-4 font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-amber-300 focus:bg-white/12 focus:ring-2 focus:ring-amber-300/25"
        placeholder={placeholder}
      />
    </span>
  </label>
);

const PasswordInput = ({ label, name, value, onChange, showPassword, setShowPassword, required = false }: {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  required?: boolean;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-bold text-white/75">{label}</span>
    <span className="relative block">
      <Lock className="absolute left-4 top-[54%] h-5 w-5 -translate-y-1/2 text-amber-200/70" />
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="block w-full rounded-2xl border border-white/12 bg-white/8 py-3.5 pl-12 pr-12 font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-amber-300 focus:bg-white/12 focus:ring-2 focus:ring-amber-300/25"
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[54%] -translate-y-1/2 text-white/45 hover:text-amber-200"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </span>
  </label>
);

const SelectInput = ({ icon: Icon, label, name, value, onChange, options, placeholder }: {
  icon?: IconType;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: string }>;
  placeholder: string;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-bold text-white/75">{label}</span>
    <span className="relative block">
      {Icon && <Icon className="absolute left-4 top-[54%] h-5 w-5 -translate-y-1/2 text-amber-200/70" />}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`block w-full appearance-none rounded-2xl border border-white/12 bg-white/8 py-3.5 pr-4 font-semibold text-white outline-none transition focus:border-amber-300 focus:bg-white/12 focus:ring-2 focus:ring-amber-300/25 ${Icon ? 'pl-12' : 'pl-4'}`}
      >
        <option className="bg-slate-950 text-white" value="">{placeholder}</option>
        {options.map(option => (
          <option className="bg-slate-950 text-white" key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </span>
  </label>
);

const SubmitButton = ({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="flex w-full items-center justify-center rounded-2xl bg-amber-400 px-5 py-3.5 font-black text-slate-950 shadow-[0_18px_45px_rgba(251,191,36,.24)] transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
  >
    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>{children}<ArrowRight className="ml-2 h-5 w-5" /></>}
  </button>
);

const GoogleButton = ({ isLoading, onClick, children }: { isLoading: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/14 bg-white px-5 py-3.5 font-black text-slate-900 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-70"
  >
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.8-5.5 3.8-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 2.8 14.6 2 12 2 6.9 2 2.8 6.4 2.8 11.7S6.9 21.5 12 21.5c6.9 0 8.6-4.9 8.6-7.4 0-.5 0-.8-.1-1.2H12z" />
      <path fill="#4285F4" d="M3.8 7.1l3.2 2.4C7.8 7.7 9.7 6.3 12 6.3c1.9 0 3.2.8 3.9 1.5l2.6-2.5C16.8 3.8 14.6 3 12 3 8.4 3 5.2 5.1 3.8 8.1z" />
      <path fill="#FBBC05" d="M3 12c0 1.7.4 3.2 1.2 4.6l3.5-2.7c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9L4.2 7.4C3.4 8.8 3 10.3 3 12z" />
      <path fill="#34A853" d="M12 21c2.5 0 4.7-.8 6.3-2.3l-3-2.5c-.8.6-1.9 1.1-3.3 1.1-2.3 0-4.2-1.5-4.9-3.6l-3.4 2.6C5.1 18.9 8.2 21 12 21z" />
    </svg>
    {children}
  </button>
);

const FormMessage = ({ tone, text }: { tone: 'error' | 'success'; text: string }) => (
  <div className={`rounded-2xl px-4 py-3 text-center text-sm font-bold ${tone === 'error' ? 'border border-red-400/30 bg-red-500/12 text-red-200' : 'border border-emerald-400/30 bg-emerald-500/12 text-emerald-200'}`}>
    {text}
  </div>
);

export default AuthModal;
