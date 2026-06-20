'use client';
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/api";
import { isAuthenticated, getToken } from "@/lib/auth";
import TrainTable from "@/app/components/TrainTable";
import TrainForm from "@/app/components/TrainForm";
import { jwtDecode } from "jwt-decode";

type Train = {
  id?: number;
  trainNumber: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
}

export default function Home() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTrain, setEditTrain] = useState<Train | null>(null);

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
  }

  const handleCreate = async (data: Train) => {
    await axiosInstance.post("/trains", data);
    fetchTrains();
    setShowForm(false);
  }

  const handleEdit = (train: Train) => {
    setEditTrain(train);
    setShowForm(true);
  }

  const handleUpdate = async (data: Train) => {
    await axiosInstance.patch(`/trains/${editTrain?.id}`, data);
    fetchTrains();
    setShowForm(false);
    setEditTrain(null);
  }

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`/trains/${id}`);
    fetchTrains();
  }

  return (
    <main>
      <h1>Train Schedule</h1>
      {isAuth && !showForm && (
        <button onClick={() => setShowForm(true)}>Add Train</button>
      )}
      {showForm && (
        <TrainForm
          onSubmit={editTrain ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditTrain(null); }}
          initialData={editTrain ?? undefined}
        />
      )}
      <TrainTable
        trains={trains}
        isAuth={isAuth}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}