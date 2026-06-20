'use client';
import { Train } from "@/types/train";

type Props = {
    trains: Train[];
    isAuth: boolean;
    isAdmin: boolean;
    onEdit: (train: Train) => void;
    onDelete: (id: number) => void;
}

export default function TrainTable({ trains, isAuth, isAdmin, onEdit, onDelete }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Train Number</th>
                    <th>Direction</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Station</th>
                    {isAuth && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {trains.map((train) => (
                    <tr key={train.id}>
                        <td>{train.trainNumber}</td>
                        <td>{train.fromStation} → {train.toStation}</td>
                        <td>{new Date(train.departureTime).toLocaleString()}</td>
                        <td>{new Date(train.arrivalTime).toLocaleString()}</td>
                        <td>{train.fromStation}</td>
                        {isAuth && (
                            <td>
                                <button onClick={() => onEdit(train)}>Edit</button>
                                {isAdmin && (
                                    <button onClick={() => onDelete(train.id!)}>Delete</button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}