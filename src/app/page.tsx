"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * ================================
 * TYPES
 * ================================
 */

type Level =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Mastery"
  | "Scholar";

type Madhhab = "Hanafi" | "Shafii" | "Maliki" | "Hanbali";

type Book = {
  title: string;
  author?: string;
  level: Level;
  category: string;
};

/**
 * ================================
 * CORE CURRICULUM ENGINE
 * (Ma'qulat + Manqulat)
 * ================================
 */

const baseCurriculum: Record<
  Madhhab,
  {
    maqulat: Book[];
    manqulat: Book[];
  }
> = {
  Hanafi: {
    maqulat: [
      { title: "Nahw Mir", level: "Beginner", category: "Nahw" },
      { title: "Mizan al-Sarf", level: "Beginner", category: "Sarf" },
      { title: "Hidayat al-Nahw", level: "Beginner", category: "Nahw" },

      { title: "Kafiyah Ibn al-Hajib", level: "Intermediate", category: "Nahw" },
      { title: "Sharh Miat Amil", level: "Intermediate", category: "Nahw" },

      { title: "Sharh Jami", level: "Advanced", category: "Nahw" },
      { title: "Mutawwal (Balaghah)", level: "Mastery", category: "Balaghah" },

      { title: "Tahqiq al-Mantiq", level: "Scholar", category: "Mantiq" },
    ],

    manqulat: [
      { title: "Nur al-Idah", level: "Beginner", category: "Fiqh" },
      { title: "Ta'lim al-Haq", level: "Beginner", category: "Aqidah" },

      { title: "Kanz al-Daqa'iq", level: "Intermediate", category: "Fiqh" },
      { title: "Mishkat al-Masabih", level: "Intermediate", category: "Hadith" },

      { title: "Hidayah", level: "Advanced", category: "Fiqh" },
      { title: "Sharh Aqidah Tahawiyyah", level: "Advanced", category: "Aqidah" },

      { title: "Radd al-Muhtar", level: "Mastery", category: "Fiqh" },

      { title: "Sahih Bukhari", level: "Scholar", category: "Hadith" },
      { title: "Sahih Muslim", level: "Scholar", category: "Hadith" },
    ],
  },

  Shafii: {
    maqulat: [
      { title: "Ajurrumiyyah", level: "Beginner", category: "Nahw" },
      { title: "Qatr al-Nada", level: "Intermediate", category: "Nahw" },
      { title: "Alfiyyah Ibn Malik", level: "Advanced", category: "Nahw" },
    ],
    manqulat: [
      { title: "Safinat al-Najah", level: "Beginner", category: "Fiqh" },
      { title: "Fath al-Qarib", level: "Intermediate", category: "Fiqh" },
      { title: "Minhaj al-Talibin", level: "Advanced", category: "Fiqh" },
    ],
  },

  Maliki: {
    maqulat: [
      { title: "Aajurrumiyyah", level: "Beginner", category: "Nahw" },
      { title: "Alfiya Basics", level: "Intermediate", category: "Nahw" },
    ],
    manqulat: [
      { title: "Al-Akhdari", level: "Beginner", category: "Fiqh" },
      { title: "Risalah Ibn Abi Zayd", level: "Intermediate", category: "Fiqh" },
      { title: "Mukhtasar Khalil", level: "Advanced", category: "Fiqh" },
    ],
  },

  Hanbali: {
    maqulat: [
      { title: "Basic Nahw Texts", level: "Beginner", category: "Nahw" },
      { title: "Qawaid Arabic", level: "Intermediate", category: "Nahw" },
    ],
    manqulat: [
      { title: "Akhsar al-Mukhtasarat", level: "Beginner", category: "Fiqh" },
      { title: "Zad al-Mustaqni", level: "Intermediate", category: "Fiqh" },
      { title: "Al-Muqni", level: "Advanced", category: "Fiqh" },
    ],
  },
};

/**
 * ================================
 * LEVEL SYSTEM
 * ================================
 */

const levels: Level[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Mastery",
  "Scholar",
];

/**
 * ================================
 * MAIN PAGE
 * ================================
 */

export default function Page() {
  const [madhhab, setMadhhab] = useState<Madhhab>("Hanafi");
  const [level, setLevel] = useState<Level>("Beginner");
  const [progress, setProgress] = useState<number>(32);

  const curriculum = useMemo(() => {
    const data = baseCurriculum[madhhab];

    return {
      maqulat: data.maqulat.filter((b) => b.level === level),
      manqulat: data.manqulat.filter((b) => b.level === level),
    };
  }, [madhhab, level]);

  const nextRecommendation = useMemo(() => {
    const all = [
      ...baseCurriculum[madhhab].maqulat,
      ...baseCurriculum[madhhab].manqulat,
    ];

    const next = all.find((b) => b.level === level);
    return next?.title || "Continue current studies";
  }, [madhhab, level]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      
      {/* HERO */}
      <section className="p-10 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Alimiyyah Path
        </motion.h1>

        <p className="text-slate-400 mt-3">
          Ma'qulat + Manqulat structured Dars-e-Nizami system
        </p>
      </section>

      {/* CONTROLS */}
      <section className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-4">
          
          {/* MADHHAB */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <h2 className="text-xl font-semibold mb-3">Madhhab</h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(baseCurriculum).map((m) => (
                <button
                  key={m}
                  onClick={() => setMadhhab(m as Madhhab)}
                  className={`px-4 py-2 rounded-xl ${
                    madhhab === m
                      ? "bg-emerald-600"
                      : "bg-slate-800"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* LEVEL */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
            <h2 className="text-xl font-semibold mb-3">Level</h2>
            <div className="flex flex-wrap gap-2">
              {levels.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-4 py-2 rounded-xl ${
                    level === l ? "bg-blue-600" : "bg-slate-800"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESS */}
      <section className="max-w-6xl mx-auto p-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>

          <div className="w-full bg-slate-800 rounded-full h-4">
            <div
              className="bg-emerald-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-slate-400">{progress}% completed</p>

          <button
            onClick={() => setProgress((p) => Math.min(p + 10, 100))}
            className="mt-4 px-4 py-2 bg-emerald-600 rounded-xl"
          >
            Increase Progress
          </button>
        </div>
      </section>

      {/* CURRICULUM DISPLAY (SKELETON ONLY FOR PART 2) */}
      <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold mb-4">Ma'qulat</h2>

          <ul className="space-y-2">
            {curriculum.maqulat.map((b, i) => (
              <li key={i} className="p-3 bg-slate-800 rounded-xl">
                {b.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold mb-4">Manqulat</h2>

          <ul className="space-y-2">
            {curriculum.manqulat.map((b, i) => (
              <li key={i} className="p-3 bg-slate-800 rounded-xl">
                {b.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RECOMMENDATION */}
      <section className="max-w-6xl mx-auto p-6 pb-20">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold mb-2">
            Next Recommendation
          </h2>

          <p className="text-slate-300">
            {nextRecommendation}
          </p>
        </div>
      </section>
    </main>
  );  /**
   * ================================
   * XP + PROGRESSION SYSTEM
   * ================================
   */

  const [xp, setXp] = useState<number>(120);
  const [streak, setStreak] = useState<number>(5);

  const levelOrder: Record<Level, number> = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Mastery: 4,
    Scholar: 5,
  };

  const canAccess = (bookLevel: Level) => {
    return levelOrder[bookLevel] <= levelOrder[level];
  };

  const gainXP = (amount: number) => {
    setXp((prev) => prev + amount);
    setProgress((p) => Math.min(100, p + amount / 5));
  };

  /**
   * ================================
   * SMART RECOMMENDATION ENGINE
   * ================================
   */

  const recommendations = useMemo(() => {
    const recs: string[] = [];

    if (progress < 30) {
      recs.push("Strengthen foundational Arabic grammar (Nahw Mir / Mizan al-Sarf)");
      recs.push("Daily 15 min Qur'an recitation with Tajwid");
    }

    if (level === "Intermediate") {
      recs.push("Begin structured Fiqh reading (Kanz al-Daqa'iq / Fath al-Qarib)");
      recs.push("Start memorising Hadith selections from Mishkat");
    }

    if (level === "Advanced") {
      recs.push("Begin Usul al-Fiqh (Usul al-Shashi / Nur al-Anwar)");
      recs.push("Study Aqidah texts with commentary (Tahawiyyah Sharh)");
    }

    if (level === "Mastery") {
      recs.push("Start comparative Fiqh across Madhahib");
      recs.push("Begin academic research writing in Arabic");
    }

    if (level === "Scholar") {
      recs.push("Begin teaching junior students");
      recs.push("Start Tahqiq (manuscript verification) studies");
      recs.push("Engage in Fatwa methodology training");
    }

    return recs;
  }, [level, progress]);

  /**
   * ================================
   * CURRICULUM SEQUENCING RULES
   * (IMPORTANT: NOT RANDOM ORDER)
   * ================================
   */

  const orderedMaqulat = useMemo(() => {
    const order = [
      "Nahw",
      "Sarf",
      "Balaghah",
      "Mantiq",
    ];

    return curriculum.maqulat.sort(
      (a, b) =>
        order.indexOf(a.category) -
        order.indexOf(b.category)
    );
  }, [curriculum]);

  const orderedManqulat = useMemo(() => {
    const order = [
      "Aqidah",
      "Fiqh",
      "Hadith",
      "Tafsir",
    ];

    return curriculum.manqulat.sort(
      (a, b) =>
        order.indexOf(a.category) -
        order.indexOf(b.category)
    );
  }, [curriculum]);

  /**
   * ================================
   * SCHOLAR MODE UNLOCK
   * ================================
   */

  const scholarMode = level === "Scholar";

  /**
   * ================================
   * ENHANCED UI RETURN PATCH
   * (ONLY ADDITIONS BELOW EXISTING UI)
   * ================================
   */

  return (
    <>
      {/* EVERYTHING FROM PART 1 IS STILL HERE */}
      
      {/* XP + STREAK SYSTEM */}
      <section className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-bold mb-4">
            Scholar Progress System
          </h2>

          <div className="flex gap-4 flex-wrap">
            <div className="px-4 py-2 bg-slate-800 rounded-xl">
              XP: {xp}
            </div>

            <div className="px-4 py-2 bg-slate-800 rounded-xl">
              Streak: {streak} days
            </div>

            <div className="px-4 py-2 bg-slate-800 rounded-xl">
              Level: {level}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => gainXP(20)}
              className="px-4 py-2 bg-emerald-600 rounded-xl"
            >
              Gain XP
            </button>

            <button
              onClick={() => setStreak((s) => s + 1)}
              className="px-4 py-2 bg-blue-600 rounded-xl"
            >
              Increase Streak
            </button>
          </div>
        </motion.div>
      </section>

      {/* ENHANCED CURRICULUM DISPLAY */}
      <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">

        {/* MAQULAT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-bold mb-4">
            Ma'qulat (Structured Order)
          </h2>

          <ul className="space-y-2">
            {orderedMaqulat.map((b, i) => (
              <li
                key={i}
                className={`p-3 rounded-xl transition ${
                  canAccess(b.level)
                    ? "bg-slate-800"
                    : "bg-slate-900 opacity-40"
                }`}
              >
                <div className="flex justify-between">
                  <span>{b.title}</span>
                  <span className="text-xs text-slate-400">
                    {b.level}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* MANQULAT */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-bold mb-4">
            Manqulat (Structured Order)
          </h2>

          <ul className="space-y-2">
            {orderedManqulat.map((b, i) => (
              <li
                key={i}
                className={`p-3 rounded-xl transition ${
                  canAccess(b.level)
                    ? "bg-slate-800"
                    : "bg-slate-900 opacity-40"
                }`}
              >
                <div className="flex justify-between">
                  <span>{b.title}</span>
                  <span className="text-xs text-slate-400">
                    {b.level}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* RECOMMENDATIONS (ENHANCED) */}
      <section className="max-w-6xl mx-auto p-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
          <h2 className="text-xl font-bold mb-4">
            AI Study Recommendations
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            {recommendations.map((r, i) => (
              <div
                key={i}
                className="p-3 bg-slate-800 rounded-xl"
              >
                {r}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SCHOLAR MODE */}
      {scholarMode && (
        <section className="max-w-6xl mx-auto p-6 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-3">
              Scholar Mode Unlocked
            </h2>

            <p className="text-slate-300">
              You now have access to advanced research, teaching, and
              comparative fiqh studies.
            </p>

            <div className="mt-4 flex gap-3 flex-wrap">
              <div className="px-4 py-2 bg-slate-800 rounded-xl">
                Tahqiq Studies
              </div>
              <div className="px-4 py-2 bg-slate-800 rounded-xl">
                Fatwa Methodology
              </div>
              <div className="px-4 py-2 bg-slate-800 rounded-xl">
                Manuscript Analysis
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </>
  );
  
}
