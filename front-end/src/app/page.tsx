'use client';
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";
import { isAuthenticated, getToken } from "@/lib/auth";
import TrainTable from "@/app/components/TrainTable";
import TrainForm from "@/app/components/TrainForm";
import { jwtDecode } from "jwt-decode";
import { Train as TrainType } from "@/types/train";
import { Plus, Radio } from "lucide-react";

export default function Home() {
  const [trains, setTrains] = useState<TrainType[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTrain, setEditTrain] = useState<TrainType | null>(null);

  useEffect(() => {
    fetchTrains();
    const auth = isAuthenticated();
    setIsAuth(auth);
    if (auth) {
      const token = getToken();
      const decoded: any = jwtDecode(token!);
      setIsAdmin(decoded.role === "ADMIN");
    }
  }, []);

  const fetchTrains = async () => {
    const res = await axiosInstance.get("/trains");
    setTrains(res.data);
  };

  const handleCreate = async (data: TrainType) => {
    await axiosInstance.post("/trains", data);
    fetchTrains();
    setShowForm(false);
  };

  const handleEdit = (train: TrainType) => {
    setEditTrain(train);
    setShowForm(true);
  };

  const handleUpdate = async (data: TrainType) => {
    await axiosInstance.patch(`/trains/${editTrain?.id}`, data);
    fetchTrains();
    setShowForm(false);
    setEditTrain(null);
  };

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`/trains/${id}`);
    fetchTrains();
  };

  return (
    <>
      <div className="hero-bg page-wrapper">
        <div className="container-inner px-5 sm:px-10 text-center py-14 sm:py-16 lg:py-20">

          <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.07] px-8 py-3 sm:py-4 sm:px-10" style={{ marginBottom: '1rem', marginTop: '2rem' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" style={{ marginLeft: '1rem' }} />
            <span className="text-white/70 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ marginRight: '1rem' }}>
              Live Schedule
            </span>
          </div>

          <h1 className="font-black text-white leading-[0.9] tracking-[-0.02em] text-[42px] sm:text-[58px] lg:text-[70px]" style={{ marginBottom: '2.5rem' }}>
            Train<br />
            <span className="text-blue-400">Schedule</span>
          </h1>

          <div className="inline-flex items-stretch rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm divide-x divide-white/10" style={{ marginBottom: '3rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
            {[
              { value: trains.length, label: 'Routes' },
              { value: 6, label: 'Stations' },
            ].map(({ value, label }) => (
              <div key={label} className="px-5 sm:px-7 py-3 sm:py-4 text-center min-w-[72px] sm:min-w-[88px]">
                <p className="text-[22px] sm:text-[26px] font-black text-white tabular-nums leading-none">
                  {value}
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/35 uppercase tracking-[0.1em] mt-1.5">
                  {label}
                </p>
              </div>
            ))}
            <div className="px-5 sm:px-7 py-3 sm:py-4 text-center min-w-[72px] sm:min-w-[88px]">
              <div className="flex items-center justify-center gap-1 mb-0">
                <Radio size={11} className="text-emerald-400 shrink-0" style={{ marginLeft: '1rem' }} />
                <p className="text-[22px] sm:text-[26px] font-black text-white leading-none" style={{ marginRight: '1.5rem' }}>Live</p>
              </div>
              <p className="text-[9px] sm:text-[10px] text-white/35 uppercase tracking-[0.1em] mt-1.5">
                Status
              </p>
            </div>
          </div>

          {isAuth && !showForm && (
            <div>
              <button
                onClick={() => { setShowForm(true); setEditTrain(null); }}
                className="inline-flex items-center gap-2 h-10 sm:h-11 px-6 sm:px-8 bg-blue-600
                           text-white text-[12px] sm:text-[13px] font-bold rounded-xl
                           hover:bg-blue-500 active:scale-[0.98] transition-all"
                style={{ boxShadow: '0 4px 20px rgba(59,130,246,0.4)', paddingRight: '1rem', paddingLeft: '1rem', marginBottom: '2.5rem' }}
              >
                <Plus size={14} strokeWidth={2.5} />
                Add Train
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="hero-fade page-wrapper" />
      <div className="page-wrapper">
        <div className="container-inner px-5 sm:px-10 pb-16 sm:pb-20">

          {showForm && (
            <div style={{ marginBottom: '2rem' }}>
              <TrainForm
                onSubmit={editTrain ? handleUpdate : handleCreate}
                onCancel={() => { setShowForm(false); setEditTrain(null); }}
                initialData={editTrain ?? undefined}
              />
            </div>
          )}

          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
              All routes
            </p>
            {trains.length > 0 && (
              <p className="text-[11px] text-muted-foreground tabular-nums">
                {trains.length} {trains.length === 1 ? 'result' : 'results'}
              </p>
            )}
          </div>

          <TrainTable
            trains={trains}
            isAuth={isAuth}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
