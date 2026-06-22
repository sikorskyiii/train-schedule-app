'use client';
import { useForm, Controller } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X, TrainFront } from "lucide-react";
import { Train } from "@/types/train";

type Props = {
    onSubmit: (data: Train) => void;
    onCancel: () => void;
    initialData?: Train;
}

const STATIONS = ["Kyiv", "Lviv", "Odesa", "Kharkiv", "Dnipro", "Zaporizhzhia", "Ivano-Frankivsk", "Chernivtsi", "Chernihiv", "Poltava", "Sumy", "Lutsk", "Rivne", "Ternopil", "Vinnytsia", "Uzhhorod", "Zhytomyr", "Kropyvnytskyi"];

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted-foreground)' }}>
        {children}
    </label>
);

const inputCls =
    "w-full text-[13px] rounded-xl border border-border bg-background " +
    "text-foreground placeholder:text-muted-foreground outline-none " +
    "focus:border-primary focus:ring-2 focus:ring-primary/12 transition-all";

export default function TrainForm({ onSubmit, onCancel, initialData }: Props) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<Train>({
        defaultValues: initialData,
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)' }}
        >
            <div
                className="flex items-center justify-between border-b border-border"
                style={{ background: 'linear-gradient(to right, #060d18, #0c1f3c)', padding: '1rem 1.5rem' }}
            >
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/20
                                    flex items-center justify-center shrink-0">
                        <TrainFront size={13} className="text-blue-300" strokeWidth={2} />
                    </div>
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                            {initialData ? "Edit Train" : "New Train"}
                        </p>
                        <p className="text-[13px] font-bold text-white leading-tight mt-0.5">
                            {initialData ? `Editing · ${initialData.trainNumber}` : "Add a new route"}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-7 h-7 flex items-center justify-center rounded-lg
                               text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
                >
                    <X size={14} />
                </button>
            </div>
            <div className="bg-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                style={{ padding: '1.25rem', gap: '1.25rem' }}>
                <div>
                    <FieldLabel>Train Number</FieldLabel>
                    <input
                        placeholder="e.g. IC-123"
                        {...register("trainNumber", { required: "Required" })}
                        className={inputCls}
                        style={{ padding: '0.75rem 1rem' }}
                    />
                    {errors.trainNumber && (
                        <p className="text-destructive text-[11px] mt-1.5">{errors.trainNumber.message}</p>
                    )}
                </div>
                <div>
                    <FieldLabel>From Station</FieldLabel>
                    <Controller
                        control={control}
                        name="fromStation"
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                <SelectTrigger style={{ padding: '0.75rem 1rem', height: 'auto', width: '100%' }} className="text-[13px] rounded-xl border-border bg-background focus:ring-primary/12 focus:border-primary">
                                    <SelectValue placeholder="Select station" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border bg-card" style={{ padding: '0.375rem' }}>
                                    {STATIONS.map(s => (
                                        <SelectItem key={s} value={s} className="text-[13px] rounded-lg" style={{ padding: '0.5rem 0.75rem' }}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.fromStation && (
                        <p className="text-destructive text-[11px] mt-1.5">{errors.fromStation.message}</p>
                    )}
                </div>

                <div>
                    <FieldLabel>To Station</FieldLabel>
                    <Controller
                        control={control}
                        name="toStation"
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || ""}>
                                <SelectTrigger style={{ padding: '0.75rem 1rem', height: 'auto', width: '100%' }} className="text-[13px] rounded-xl border-border bg-background focus:ring-primary/12 focus:border-primary">
                                    <SelectValue placeholder="Select station" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border bg-card" style={{ padding: '0.375rem' }}>
                                    {STATIONS.map(s => (
                                        <SelectItem key={s} value={s} className="text-[13px] rounded-lg" style={{ padding: '0.5rem 0.75rem' }}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.toStation && (
                        <p className="text-destructive text-[11px] mt-1.5">{errors.toStation.message}</p>
                    )}
                </div>
                <div>
                    <FieldLabel>Departure Time</FieldLabel>
                    <input
                        type="datetime-local"
                        {...register("departureTime", { required: "Required" })}
                        className={inputCls}
                        style={{ padding: '0.75rem 1rem', width: '100%', maxWidth: '100%', boxSizing: 'border-box', WebkitAppearance: 'none', appearance: 'none' }}
                    />
                    {errors.departureTime && (
                        <p className="text-destructive text-[11px] mt-1.5">{errors.departureTime.message}</p>
                    )}
                </div>
                <div>
                    <FieldLabel>Arrival Time</FieldLabel>
                    <input
                        type="datetime-local"
                        {...register("arrivalTime", { required: "Required" })}
                        className={inputCls}
                        style={{ padding: '0.75rem 1rem' }}
                    />
                    {errors.arrivalTime && (
                        <p className="text-destructive text-[11px] mt-1.5">{errors.arrivalTime.message}</p>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <button
                        type="submit"
                        className="flex-1 bg-primary text-white text-[12px] font-bold
                                   rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
                        style={{ padding: '0.75rem 1rem', boxShadow: '0 2px 12px rgba(59,130,246,0.30)' }}
                    >
                        {initialData ? "Save" : "Create Route"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{ padding: '0.75rem 1rem' }}
                        className="flex-1 border border-border text-[12px] font-semibold
                                   rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}
