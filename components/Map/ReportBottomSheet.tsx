"use client";

import {
  CheckCircle2,
  MapPin,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import BottomSheet from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/button";
import Comments from "@/components/Map/Comments";
import ImageViewer from "@/components/Map/ImageViewer";
import MessageDialog from "@/components/ui/MessageDialog";
import { useConfirmation } from "@/hooks/useConfirmation";
import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import { buildShareData } from "@/lib/share";
import { Report } from "@/types/report";
import { useAuth } from "@/contexts/AuthContext";

interface ReportBottomSheetProps {
  report: Report | null;
  open: boolean;
  onClose: () => void;
}

export default function ReportBottomSheet({
  report,
  open,
  onClose,
}: ReportBottomSheetProps) {
  const { user } = useAuth();
  const { confirmed, loading, isOwner, toggle } = useConfirmation(report);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [shareMessageOpen, setShareMessageOpen] = useState(false);

  if (!report) {
    return null;
  }

  const currentReport = report;
  const category = REPORT_CATEGORY_CONFIG[currentReport.type];

  async function handleShare() {
    const shareData = buildShareData({
      reportId: currentReport.id,
      title: currentReport.title,
      address: currentReport.address,
      city: currentReport.city,
    });

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      setShareMessageOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose} animation="report">
      <div className="px-5 pb-8 text-white sm:px-6">
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#061d43]/45 p-5 shadow-[0_16px_34px_rgba(1,15,42,0.28)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_28%,rgba(255,255,255,0.12)_50%,transparent_66%)]">
          <div className="absolute -right-10 -top-12 size-36 rounded-full opacity-40 blur-2xl" style={{ backgroundColor: category.color }} />
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-white shadow-sm" style={{ backgroundColor: category.color }}>
                {category.icon}
                {category.label}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200"><CheckCircle2 className="size-4" /> Pubblicata</span>
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">{report.title}</h2>
            <p className="mt-2 leading-7 text-white/80">{report.description}</p>
            {report.userId && report.displayName ? (
              <Link
                href={report.userId === user?.uid ? "/profile" : `/profile/${encodeURIComponent(report.userId)}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/20"
              >
                <span className="grid size-7 place-items-center rounded-full bg-white/20 text-xs font-black">
                  {report.displayName.slice(0, 1).toUpperCase()}
                </span>
                Segnalato da {report.displayName}
              </Link>
            ) : null}
          </div>
        </section>

        {report.video ? <ReportVideo key={report.id} src={report.video.url} /> : report.images.length > 0 && (
          <section className="mt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Foto della segnalazione</h3>
            {report.images.length === 1 ? (
              <img src={report.images[0].url} alt="Foto segnalazione" loading="lazy" onClick={() => { setCurrentImage(0); setViewerOpen(true); }} className="mx-auto max-h-[70vh] w-auto max-w-full cursor-pointer rounded-2xl border border-white/20 bg-white/10 shadow-[0_12px_25px_rgba(1,15,42,0.35)] transition hover:brightness-110" />
            ) : (
              <>
                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3">
                  {report.images.map((image, index) => <img key={image.storagePath} src={image.url} alt={`Foto ${index + 1}`} loading="lazy" onClick={() => { setCurrentImage(index); setViewerOpen(true); }} className="h-auto max-h-[70vh] w-full min-w-full cursor-pointer snap-center rounded-2xl border border-white/20 bg-white/10 object-contain shadow-[0_12px_25px_rgba(1,15,42,0.35)]" />)}
                </div>
                <p className="text-center text-xs text-white/55">Scorri per vedere le foto</p>
              </>
            )}
          </section>
        )}

        <section className="mt-6 grid grid-cols-3 gap-2 rounded-3xl border border-white/15 bg-[#061d43]/55 p-3 shadow-[0_12px_26px_rgba(1,15,42,0.22)]">
          <Stat icon={<ThumbsUp className="size-5 text-emerald-300" />} value={report.confirmations} label="Conferme" />
          <Stat icon={<MessageCircle className="size-5 text-[#a9d5ff]" />} value={report.commentsCount} label="Commenti" />
          <div className="rounded-2xl bg-white/8 p-3 text-center"><MapPin className="mx-auto size-5 text-[#f9d47c]" />{report.address ? <><p className="mt-1 break-words text-xs font-medium text-white/90">{report.address}</p>{report.city && <p className="text-xs text-white/60">{report.city}</p>}</> : <p className="mt-1 text-xs text-white/80">{report.lat.toFixed(4)}<br />{report.lng.toFixed(4)}</p>}</div>
        </section>

        <div className={`mt-6 grid gap-3 ${isOwner === false ? "grid-cols-2" : "grid-cols-1"}`}>
          {isOwner === false ? <Button onClick={toggle} disabled={loading} variant="secondary" className={confirmed ? "border border-emerald-300/35 bg-emerald-500 text-white hover:bg-emerald-400" : "border border-white/20 bg-white/12 text-white hover:bg-white/20"}>{loading ? "Conferma..." : confirmed ? "Confermato" : "Conferma"}</Button> : null}
          <Button onClick={handleShare} className="border border-white/20 bg-white text-[#0F2D5F] hover:bg-[#dbeafe]"><Share2 className="size-4" /> Condividi</Button>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 text-slate-900 shadow-[0_12px_28px_rgba(1,15,42,0.24)]">
          <Comments reportId={report.id} />
        </div>
      </div>

      <ImageViewer images={report.images.map((image) => image.url)} currentIndex={currentImage} open={viewerOpen} onClose={() => setViewerOpen(false)} onPrevious={() => setCurrentImage((previous) => previous === 0 ? report.images.length - 1 : previous - 1)} onNext={() => setCurrentImage((previous) => previous === report.images.length - 1 ? 0 : previous + 1)} />
      <MessageDialog open={shareMessageOpen} title="Link copiato" message="Il link della segnalazione è stato copiato negli appunti." variant="info" onClose={() => setShareMessageOpen(false)} />
    </BottomSheet>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return <div className="rounded-2xl bg-white/8 p-3 text-center">{icon}<p className="mt-1 font-bold">{value}</p><p className="text-xs text-white/60">{label}</p></div>;
}

function ReportVideo({ src }: { src: string }) {
  const [ready, setReady] = useState(false);

  return <section className="relative mt-6 overflow-hidden rounded-2xl border border-white/20 bg-[#061735] shadow-[0_12px_25px_rgba(1,15,42,0.35)]">
    {!ready ? <div className="absolute inset-0 z-10 flex min-h-56 flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_20%,#315d97_0%,#0F2D5F_45%,#061735_100%)] text-white"><span className="relative grid size-16 place-items-center"><MapPin className="size-16 fill-white text-white" /><span className="absolute -mt-1 text-3xl font-black text-[#0F2D5F]">C</span></span><p className="mt-3 text-lg font-black tracking-tight">Commety</p><p className="mt-1 text-xs text-white/70">Preparazione video</p></div> : null}
    <video controls playsInline preload="metadata" src={src} onLoadedData={() => setReady(true)} className="max-h-[70vh] w-full" />
    <span className="pointer-events-none absolute bottom-3 right-3 z-20 inline-flex items-center gap-1 rounded-lg border border-white/30 bg-[#061735]/80 px-2 py-1 text-xs font-black text-white"><span className="relative inline-flex size-4 items-center justify-center"><MapPin className="size-4 fill-white text-white" /><span className="absolute -mt-px text-[8px] font-black text-[#0F2D5F]">C</span></span>Commety</span>
  </section>;
}
