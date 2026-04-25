import React, { useState } from 'react';
import { X, Save, User as UserIcon, Mail, Lock, Loader2, Edit2 } from 'lucide-react';
import { authService, User } from '../services/authService';
import { EXAM_COUNT_OPTIONS, GENDER_OPTIONS, MAJORS, PROVINCES } from '../constants/profileOptions';

interface EditProfileProps {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    age: user.age || '',
    gender: user.gender || '',
    major: user.major || '',
    province: user.province || '',
    examCount: user.examCount || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const extraData = {
        age: formData.age,
        gender: formData.gender,
        major: formData.major,
        province: formData.province,
        examCount: formData.examCount
      };
      
      const res = await authService.updateUser(user.id, formData.name, formData.email, formData.password, extraData);
      if (res.success) {
        setSuccess('อัปเดตข้อมูลโปรไฟล์สำเร็จ');
        onUpdate(res.user || { ...user, ...formData, password: undefined });
        setTimeout(() => {
          setIsEditing(false);
          setSuccess('');
        }, 1500);
      } else {
        setError(res.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
      }
    } catch (err) {
      setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 my-8 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900">โปรไฟล์ของฉัน</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isEditing ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">ชื่อผู้ใช้งาน</p>
                  <p className="font-medium text-slate-900">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">อีเมล</p>
                  <p className="font-medium text-slate-900">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">ข้อมูลเพิ่มเติมที่ลงทะเบียนไว้</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-xs mb-0.5">อายุ</span>
                  <span className="font-medium text-slate-900">{user.age ? `${user.age} ปี` : '-'}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-xs mb-0.5">เพศ</span>
                  <span className="font-medium text-slate-900">{user.gender || '-'}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 col-span-2">
                  <span className="text-slate-500 block text-xs mb-0.5">เอกที่เลือกสอบ</span>
                  <span className="font-medium text-slate-900">{user.major || '-'}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-xs mb-0.5">จังหวัด</span>
                  <span className="font-medium text-slate-900">{user.province || '-'}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-xs mb-0.5">สอบครั้งที่</span>
                  <span className="font-medium text-slate-900">{user.examCount || '-'}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 col-span-2">
                  <span className="text-slate-500 block text-xs mb-0.5">วันที่สมัคร</span>
                  <span className="font-medium text-slate-900">{user.createdAt ? new Date(user.createdAt).toLocaleString('th-TH') : '-'}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={handleEditClick}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                แก้ไขโปรไฟล์ของฉัน
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">ชื่อผู้ใช้งาน</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">อีเมล</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">รหัสผ่าน (เว้นว่างไว้หากไม่ต้องการเปลี่ยน)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              {user.authProvider === 'google' && (
                <p className="text-xs text-amber-600 mt-1">
                  บัญชีนี้เข้าสู่ระบบด้วย Google ได้ตามปกติ หากต้องการตั้งรหัสผ่านสำหรับล็อกอินด้วยอีเมล สามารถกรอกใหม่ได้ที่นี่
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">อายุ</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                  placeholder="เช่น 25"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">เพศ</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                >
                  <option value="">เลือกเพศ</option>
                  {GENDER_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">วิชาเอกที่ใช้สอบ</label>
              <select
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
              >
                <option value="">เลือกวิชาเอก</option>
                {MAJORS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">จังหวัดที่สอบ</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                >
                  <option value="">เลือกจังหวัด</option>
                  {PROVINCES.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">สอบครั้งที่</label>
                <select
                  name="examCount"
                  value={formData.examCount}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none"
                >
                  <option value="">เลือกจำนวนครั้ง</option>
                  {EXAM_COUNT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}
            
            {success && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-100 text-green-600 text-sm text-center font-medium">
                {success}
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> บันทึก</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
