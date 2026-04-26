import React, { useEffect, useState, useMemo } from 'react';
import { ChevronLeft, Crown, Medal, Trophy, Loader2 } from 'lucide-react';
import { userActivityService } from '../services/userActivityService';

interface LeaderboardProps {
  onBack: () => void;
}

interface ExamAttemptRow {
  user_id: string;
  user_name: string;
  exam_key: string;
  score: number;
  total: number;
  duration_seconds: number;
  is_completed: boolean;
  created_at: string;
}

interface LeaderboardEntry {
  rank: number;
  userName: string;
  userId: string;
  scores: Record<string, { score: number; total: number }>;
  totalScore: number;
  totalQuestions: number;
  totalDuration: number;
}

const EXAM_COLUMNS = [
  { key: 'part_a1', label: 'ก1 การคิดวิเคราะห์', short: 'ก1' },
  { key: 'part_a2', label: 'ก2 ภาษาอังกฤษ', short: 'ก2' },
  { key: 'part_a3', label: 'ก3 ข้าราชการที่ดี', short: 'ก3' },
  { key: 'part_b1', label: 'ข1 วิชาการศึกษา', short: 'ข1' },
  { key: 'part_b3', label: 'ข3 กฎหมายการศึกษา', short: 'ข3' },
];

const getMedalEmoji = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '';
};

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [attempts, setAttempts] = useState<ExamAttemptRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await userActivityService.getLeaderboard();
        setAttempts(data);
      } catch (error) {
        console.error('Failed to load leaderboard', error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const leaderboard = useMemo<LeaderboardEntry[]>(() => {
    // Group by user, take the best score per exam_key
    const userMap: Record<string, {
      userName: string;
      bestScores: Record<string, { score: number; total: number; duration: number }>;
    }> = {};

    attempts.forEach(a => {
      if (!userMap[a.user_id]) {
        userMap[a.user_id] = { userName: a.user_name, bestScores: {} };
      }
      const user = userMap[a.user_id];
      const existing = user.bestScores[a.exam_key];
      if (!existing || a.score > existing.score || (a.score === existing.score && a.duration_seconds < existing.duration)) {
        user.bestScores[a.exam_key] = {
          score: Number(a.score),
          total: Number(a.total),
          duration: Number(a.duration_seconds),
        };
      }
    });

    // Calculate totals
    const entries = Object.entries(userMap).map(([userId, data]) => {
      const scores: Record<string, { score: number; total: number }> = {};
      let totalScore = 0;
      let totalQuestions = 0;
      let totalDuration = 0;

      Object.entries(data.bestScores).forEach(([examKey, val]) => {
        scores[examKey] = { score: val.score, total: val.total };
        totalScore += val.score;
        totalQuestions += val.total;
        totalDuration += val.duration;
      });

      return {
        rank: 0,
        userName: data.userName,
        userId,
        scores,
        totalScore,
        totalQuestions,
        totalDuration,
      };
    });

    // Sort by totalScore DESC, then totalDuration ASC (faster = better)
    entries.sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return a.totalDuration - b.totalDuration;
    });

    entries.forEach((e, idx) => { e.rank = idx + 1; });

    return entries;
  }, [attempts]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h1 className="text-xl font-bold text-slate-800">ทำเนียบผู้พิชิต</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-amber-700 text-sm font-bold mb-4">
            <Crown className="w-4 h-4" />
            Hall of Fame
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-3">ตารางคะแนนผู้พิชิตการทดสอบ</h2>
          <p className="text-slate-500 mx-auto">
            เรียงลำดับจากคะแนนรวมสูงสุด หากคะแนนเท่ากันจะเปรียบเทียบเวลาที่ใช้ (เร็วกว่า = อันดับดีกว่า)
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <p>กำลังโหลดตารางคะแนน...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">ยังไม่มีผู้พิชิตในระบบ</h3>
            <p className="text-slate-500">ลองทำข้อสอบเสมือนจริงและส่งคำตอบ เพื่อขึ้นบนตารางคะแนน!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {leaderboard.length >= 1 && (
              <div className="flex items-end justify-center gap-4 md:gap-8 mb-10 px-4">
                {/* 2nd Place */}
                {leaderboard.length >= 2 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
                    <div className="text-4xl mb-2">🥈</div>
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-4 w-28 md:w-36 text-center border border-slate-300">
                      <div className="text-sm font-bold text-slate-800 truncate mb-1">{leaderboard[1].userName}</div>
                      <div className="text-2xl font-black text-slate-700">{leaderboard[1].totalScore}</div>
                      <div className="text-[10px] text-slate-500 font-medium">คะแนน</div>
                    </div>
                    <div className="bg-slate-300 rounded-b-xl w-28 md:w-36 h-16 flex items-center justify-center">
                      <span className="text-xl font-black text-white">2</span>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative">
                    <div className="text-5xl mb-2">👑</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-2xl p-5 w-32 md:w-40 text-center border-2 border-amber-400 shadow-lg shadow-amber-200/50">
                    <div className="text-sm font-bold text-amber-900 truncate mb-1">{leaderboard[0].userName}</div>
                    <div className="text-3xl font-black text-amber-700">{leaderboard[0].totalScore}</div>
                    <div className="text-[10px] text-amber-600 font-medium">คะแนน</div>
                  </div>
                  <div className="bg-amber-500 rounded-b-xl w-32 md:w-40 h-24 flex items-center justify-center">
                    <span className="text-2xl font-black text-white">1</span>
                  </div>
                </div>

                {/* 3rd Place */}
                {leaderboard.length >= 3 && (
                  <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
                    <div className="text-4xl mb-2">🥉</div>
                    <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-4 w-28 md:w-36 text-center border border-orange-300">
                      <div className="text-sm font-bold text-orange-900 truncate mb-1">{leaderboard[2].userName}</div>
                      <div className="text-2xl font-black text-orange-700">{leaderboard[2].totalScore}</div>
                      <div className="text-[10px] text-orange-600 font-medium">คะแนน</div>
                    </div>
                    <div className="bg-orange-400 rounded-b-xl w-28 md:w-36 h-12 flex items-center justify-center">
                      <span className="text-xl font-black text-white">3</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Full Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase text-center w-16">อันดับ</th>
                      <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase">ชื่อผู้ใช้งาน</th>
                      {EXAM_COLUMNS.map(col => (
                        <th key={col.key} className="px-3 py-4 text-xs font-bold text-slate-600 uppercase text-center hidden md:table-cell">
                          <span className="block">{col.short}</span>
                        </th>
                      ))}
                      <th className="px-4 py-4 text-xs font-bold text-amber-700 uppercase text-center bg-amber-50/50">ผลรวม</th>
                      <th className="px-4 py-4 text-xs font-bold text-slate-600 uppercase text-center hidden md:table-cell">เวลา</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaderboard.map((entry) => {
                      const medal = getMedalEmoji(entry.rank);
                      const isTop3 = entry.rank <= 3;
                      return (
                        <tr 
                          key={entry.userId} 
                          className={`transition-colors ${isTop3 ? 'bg-amber-50/30 hover:bg-amber-50/50' : 'hover:bg-slate-50'}`}
                        >
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {medal && <span className="text-lg">{medal}</span>}
                              {entry.rank === 1 && <span className="text-sm">👑</span>}
                              {!medal && <span className="text-sm font-bold text-slate-500">{entry.rank}</span>}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`text-sm font-bold ${isTop3 ? 'text-amber-900' : 'text-slate-800'}`}>
                              {entry.userName || 'ผู้ใช้งาน'}
                            </span>
                          </td>
                          {EXAM_COLUMNS.map(col => {
                            const data = entry.scores[col.key];
                            return (
                              <td key={col.key} className="px-3 py-4 text-center hidden md:table-cell">
                                {data ? (
                                  <span className="text-sm font-bold text-slate-700">
                                    {data.score}<span className="text-slate-400 font-normal">/{data.total}</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-300">—</span>
                                )}
                              </td>
                            );
                          })}
                          <td className="px-4 py-4 text-center bg-amber-50/30">
                            <span className={`text-lg font-black ${isTop3 ? 'text-amber-600' : 'text-slate-800'}`}>
                              {entry.totalScore}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center hidden md:table-cell">
                            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-full">
                              {Math.floor(entry.totalDuration / 60)} นาที
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-slate-400">
              <p>คะแนนคำนวณจากผลสอบที่ดีที่สุดในแต่ละวิชา · หากคะแนนเท่ากันจะดูเวลาที่ใช้ (เร็วกว่า = สูงกว่า)</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
