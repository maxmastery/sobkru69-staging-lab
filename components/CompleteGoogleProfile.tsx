import React, { useMemo, useState } from 'react';
import { authService, User } from '../services/authService';
import { ArrowRight, CalendarDays, GraduationCap, Hash, Loader2, Mail, MapPin, User as UserIcon } from 'lucide-react';
import { EXAM_COUNT_OPTIONS, GENDER_OPTIONS, MAJORS, PROVINCES } from '../constants/profileOptions';

const LOGIN_HERO_IMAGE_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/bannner.png';
const COOLCOM_LOGO_URL = 'https://cribfrwvdpshvdpxgnuc.supabase.co/storage/v1/object/public/sobkru-images/cc2.png';

interface CompleteGoogleProfileProps {
  user: User;
  onComplete: (user: User) => void | Promise<void>;
  onLogout: () => void | Promise<void>;
}

const CompleteGoogleProfile: React.FC<CompleteGoogleProfileProps> = ({ user, onComplete, onLogout }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    age: user.age || '',
    gender: user.gender || '',
    major: user.major || '',
    province: user.province || '',
    examCount: user.examCount || '',
  });
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const missingFields = useMemo(() => {
    const labels: string[] = [];
    if (!formData.name.trim()) labels.push('ชื่อผู้ใช้งาน');
    if (!formData.age.trim()) labels.push('อายุ');
    if (!formData.gender.trim()) labels.push('เพศ');
    if (!formData.major.trim()) labels.push('เอกที่ใช้สอบ');
    if (!formData.province.trim()) labels.push('จังหวัด');
    if (!formData.examCount.trim()) labels.push('จำนวนครั้งที่สอบ');
    return labels;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(current => ({ ...current, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (missingFields.length > 0) {
      setError(`กรุณากรอกข้อมูลให้ครบ: ${missingFields.join(' / ')}`);
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const result = await authService.updateUser(user.id, formData.name.trim(), user.email, '', {
        age: formData.age.trim(),
        gender: formData.gender.trim(),
        major: formData.major.trim(),
        province: formData.province.trim(),
        examCount: formData.examCount.trim(),
      });

      if (!result.success) {
        setError(result.message || 'ไม่สามารถบันทึกข้อมูลเพิ่มเติมได้');
        return;
      }

      const nextUser: User = result.user || {
        ...user,
        name: formData.name.trim(),
        age: formData.age.trim(),
        gender: formData.gender.trim(),
        major: formData.major.trim(),
        province: formData.province.trim(),
        examCount: formData.examCount.trim(),
      };

      await onComplete(nextUser);
    } catch (submitError) {
      console.error('Failed to complete Google profile', submitError);
      setError('เกิดข้อผิดพลาดระหว่างบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 sm:p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(226,232,240,.85),_rgba(248,250,252,.92)_42%,_#eef2f7)] pointer-events-none" />

      <div className="relative w-full max-w-5xl min-h-[750px] bg-white backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden z-10 grid lg:grid-cols-2">
        <div
          className="relative min-h-[300px] lg:min-h-full bg-slate-900 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(15,23,42,0.62), rgba(15,23,42,0.78)), url('${LOGIN_HERO_IMAGE_URL}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_38%)]" />
          <div className="relative h-full flex flex-col justify-end lg:justify-center items-center text-center px-8 sm:px-12 py-12 text-white">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">มีบัญชีผู้ใช้งานอยู่แล้ว?</h2>
            <p className="max-w-md text-xl sm:text-2xl italic text-white/88 leading-relaxed">
              “ความสำเร็จ ไม่ได้ตกมาจากฟ้า แต่เกิดจากการแสวงหาและลงมือทำ”
            </p>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <img
              src={COOLCOM_LOGO_URL}
              alt="Cool Com"
              className="h-6 object-contain"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex items-center justify-center px-6 sm:px-10 py-10">
          <div className="w-full max-w-xl">
            <div className="flex flex-col items-center text-center mb-6 mt-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">SOBKRU <span className="text-amber-500">69</span></h1>
              <h2 className="text-xl font-bold text-slate-800 mb-1">กรอกข้อมูลเพิ่มเติม</h2>
              <p className="text-slate-500 text-sm">ลงทะเบียนข้อมูลที่จำเป็นเพิ่มเติมก่อนเริ่มใช้งานระบบ</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">ชื่อผู้ใช้งาน</label>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.15fr] gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
                      placeholder="ชื่อผู้ใช้งาน"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={user.email}
                      readOnly
                      className="block w-full pl-9 pr-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 outline-none text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500 pt-1">
                  เข้าด้วย Google สำเร็จแล้ว เหลือเพียงกรอกข้อมูลการสมัครสอบที่จำเป็นก่อนเข้าใช้งาน
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">อายุ</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="number"
                      min="15"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm"
                      placeholder="อายุ (ปี)"
                    />
                  </div>
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
                    <GraduationCap className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm appearance-none"
                  >
                    <option value="">เลือกวิชาเอก</option>
                    {MAJORS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">อาศัยอยู่ที่จังหวัด</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-sm appearance-none"
                    >
                      <option value="">เลือกจังหวัด</option>
                      {PROVINCES.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">การสอบครั้งนี้เป็นครั้งที่</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-4 w-4 text-slate-400" />
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

            <div className="space-y-1.5">
                <div className="text-center text-xs text-slate-500">
                  เข้าด้วย Google สำเร็จแล้ว เหลือเพียงกรอกข้อมูลสมัครสอบที่จำเป็นก่อนเข้าใช้งาน
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <div className="pt-1 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      บันทึกและเข้าใช้งานต่อ
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => void onLogout()}
                  disabled={isSaving}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 px-6 py-3.5 text-slate-700 font-semibold hover:bg-slate-50 transition-all disabled:opacity-60"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteGoogleProfile;
