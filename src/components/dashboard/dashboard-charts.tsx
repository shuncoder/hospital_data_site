"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLanguage } from "@/components/language-provider";

const statusData = [
  { name: "Recruiting", value: 42 },
  { name: "Completed", value: 27 },
  { name: "Active", value: 18 },
  { name: "NotYet", value: 13 }
];
const phaseData = [
  { name: "Phase 1", studies: 18 },
  { name: "Phase 2", studies: 34 },
  { name: "Phase 3", studies: 29 },
  { name: "Phase 4", studies: 11 }
];
const colors = ["#0f766e", "#22c55e", "#06b6d4", "#f59e0b"];

export function DashboardCharts() {
  const { t } = useLanguage();
  const translatedStatus = statusData.map((item) => ({
    ...item,
    name:
      item.name === "Recruiting" ? t.recruiting :
      item.name === "Completed" ? "Completed" :
      item.name === "Active" ? "Active" : t.allStatuses
  }));

  return (
    <div className="bento-grid">
      <section className="soft-card bento-col-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-ink">{t.byStatus}</h2>
            <p className="mt-1 text-xs text-slate-500">{t.trends}</p>
          </div>
          <span className="soft-chip bg-teal-50 text-brand">OVERVIEW</span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={translatedStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={58} outerRadius={88} paddingAngle={4}>
                {translatedStatus.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "%"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {translatedStatus.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[index] }} />
              <span className="truncate">{item.name}</span>
              <b className="ml-auto text-ink">{item.value}%</b>
            </div>
          ))}
        </div>
      </section>

      <section className="soft-card bento-col-6 p-6">
        <div className="mb-4">
          <h2 className="font-bold text-ink">{t.byPhase}</h2>
          <p className="mt-1 text-xs text-slate-500">{t.studies}</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={phaseData} margin={{ left: -20, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "#f0fdfa" }} contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
              <Bar dataKey="studies" name={t.studies} fill="#0f766e" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
