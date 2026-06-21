'use client';
import { Pencil, Trash2, Clock } from "lucide-react";
import { Train } from "@/types/train";

type Props = {
    trains: Train[];
    isAuth: boolean;
    isAdmin: boolean;
    onEdit: (train: Train) => void;
    onDelete: (id: number) => void;
}

function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("uk-UA", { day: "numeric", month: "short" });
}

function getDuration(from: string, to: string) {
    const diff = new Date(to).getTime() - new Date(from).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function TrainTable({ trains, isAuth, isAdmin, onEdit, onDelete }: Props) {
    if (trains.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center mb-5 text-2xl select-none">
                    🚄
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">No routes yet</p>
                <p className="text-sm text-muted-foreground">Train routes will appear here once added.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {trains.map((train) => {
                const depTime = formatTime(train.departureTime);
                const arrTime = formatTime(train.arrivalTime);
                const depDate = formatDate(train.departureTime);
                const duration = getDuration(train.departureTime, train.arrivalTime);

                return (
                    <div
                        key={train.id}
                        className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-200
                                   hover:-translate-y-[2px]"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)', marginBottom: '1.5rem' }}
                        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)')}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)')}
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-primary opacity-60
                                        group-hover:opacity-100 transition-opacity rounded-l-2xl" />

                        <div className="pl-16 pr-6 py-5 sm:pl-20 sm:pr-8 sm:py-6">

                            <div className="flex items-start justify-between gap-3 sm:hidden mb-4">
                                <div>
                                    <span className="inline-block px-3.5 py-[5px] rounded-md bg-primary/10
                                                     text-primary text-xs font-bold uppercase tracking-wider">
                                        {train.trainNumber}
                                    </span>
                                    <p className="text-xs text-muted-foreground/60 mt-2 font-medium">
                                        {depDate}
                                    </p>
                                </div>

                                {isAuth && (
                                    <div className="flex items-center gap-2 shrink-0" style={{ paddingRight: '0.75rem' }}>
                                        <button
                                            onClick={() => onEdit(train)}
                                            style={{ padding: '0.5rem 1.25rem', gap: '0.5rem' }}
                                            className="flex items-center text-xs font-semibold
                                                       rounded-lg border border-border text-muted-foreground
                                                       hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                                        >
                                            <Pencil size={11} strokeWidth={2} />
                                            Edit
                                        </button>
                                        {isAdmin && (
                                            <button
                                                onClick={() => onDelete(train.id!)}
                                                style={{ padding: '0.5rem 1.25rem', gap: '0.5rem' }}
                                                className="flex items-center text-xs font-semibold
                                                           rounded-lg text-destructive bg-destructive/8
                                                           hover:bg-destructive hover:text-white transition-all"
                                            >
                                                <Trash2 size={11} strokeWidth={2} />
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-3 sm:gap-5">

                                <div className="hidden sm:flex flex-col items-center justify-center text-center shrink-0 min-w-[96px]">
                                    <span className="inline-block px-3 py-[5px] rounded-md bg-primary/10
                                                     text-primary text-xs font-bold uppercase tracking-wider">
                                        {train.trainNumber}
                                    </span>
                                    <p className="text-xs text-muted-foreground/60 mt-2 font-medium">
                                        {depDate}
                                    </p>
                                </div>
                                <div className="hidden sm:block w-px h-12 bg-border/60 shrink-0" />

                                <div className="shrink-0">
                                    <p className="text-[28px] sm:text-[36px] lg:text-[40px] font-black tabular-nums
                                                  text-foreground leading-none tracking-[-0.02em]">
                                        {depTime}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium truncate max-w-[90px] sm:max-w-[120px]">
                                        {train.fromStation}
                                    </p>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2 min-w-0">
                                    <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-semibold text-muted-foreground/60
                                                     uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                                        <Clock size={11} strokeWidth={2} />
                                        {duration}
                                    </span>
                                    <div className="flex items-center w-full gap-1.5">
                                        <div className="w-2 h-2 rounded-full border-2 border-border shrink-0" />
                                        <div className="flex-1 h-px bg-border min-w-0" />
                                        <div className="shrink-0" style={{
                                            width: 0, height: 0,
                                            borderTop: '4.5px solid transparent',
                                            borderBottom: '4.5px solid transparent',
                                            borderLeft: '8px solid var(--color-primary)',
                                            opacity: 0.55,
                                        }} />
                                    </div>
                                </div>

                                <div className="shrink-0 text-right">
                                    <p className="text-[28px] sm:text-[36px] lg:text-[40px] font-black tabular-nums
                                                  text-foreground leading-none tracking-[-0.02em]">
                                        {arrTime}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium truncate max-w-[90px] sm:max-w-[120px] ml-auto">
                                        {train.toStation}
                                    </p>
                                </div>

                                {isAuth && (
                                    <div className="hidden sm:flex items-center gap-2 shrink-0 pl-3" style={{ paddingRight: '1rem' }}>
                                        <button
                                            onClick={() => onEdit(train)}
                                            style={{ padding: '0.6rem 1.5rem', gap: '0.5rem' }}
                                            className="flex items-center text-xs font-semibold
                                                       rounded-lg border border-border text-muted-foreground
                                                       hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                                        >
                                            <Pencil size={12} strokeWidth={2} />
                                            Edit
                                        </button>
                                        {isAdmin && (
                                            <button
                                                onClick={() => onDelete(train.id!)}
                                                style={{ padding: '0.6rem 1.5rem', gap: '0.5rem' }}
                                                className="flex items-center text-xs font-semibold
                                                           rounded-lg text-destructive bg-destructive/8
                                                           hover:bg-destructive hover:text-white transition-all"
                                            >
                                                <Trash2 size={12} strokeWidth={2} />
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
