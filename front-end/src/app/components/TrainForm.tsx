'use client';
import { useForm } from "react-hook-form";

type Train = {
    id?: number;
    trainNumber: string;
    fromStation: string;
    toStation: string;
    departureTime: string;
    arrivalTime: string;
}

type Props = {
    onSubmit: (data: Train) => void;
    onCancel: () => void;
    initialData?: Train;
}

const STATIONS = ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Zaporizhzhia"];

export default function TrainForm({ onSubmit, onCancel, initialData }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<Train>({
        defaultValues: initialData,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Train Number" {...register("trainNumber", { required: "Required" })} />
            {errors.trainNumber && <span>{errors.trainNumber.message}</span>}

            <select {...register("fromStation", { required: "Required" })}>
                <option value="">From Station</option>
                {STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.fromStation && <span>{errors.fromStation.message}</span>}

            <select {...register("toStation", { required: "Required" })}>
                <option value="">To Station</option>
                {STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.toStation && <span>{errors.toStation.message}</span>}

            <input type="datetime-local" {...register("departureTime", { required: "Required" })} />
            {errors.departureTime && <span>{errors.departureTime.message}</span>}

            <input type="datetime-local" {...register("arrivalTime", { required: "Required" })} />
            {errors.arrivalTime && <span>{errors.arrivalTime.message}</span>}

            <button type="submit">{initialData ? "Update" : "Create"}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}