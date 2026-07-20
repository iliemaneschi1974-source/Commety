"use client";

import { useEffect, useState } from "react";

import CallPanel from "@/components/Chat/CallPanel";

type CallTarget = {
  threadId: string;
  currentUserId: string;
  participantName: string;
  participantAvatarUrl?: string;
};

export default function GlobalCallHost() {
  const [target, setTarget] = useState<CallTarget | null>(null);
  const [startKey, setStartKey] = useState(0);

  useEffect(() => {
    const receive = (event: Event) => {
      const detail = (event as CustomEvent<CallTarget & { start?: boolean }>).detail;
      if (!detail?.threadId) return;
      setTarget(detail);
      if (detail.start) setStartKey((value) => value + 1);
    };

    window.addEventListener("commety:call", receive);
    return () => window.removeEventListener("commety:call", receive);
  }, []);

  if (!target) return null;

  return <CallPanel {...target} autoStartKey={startKey} showTrigger={false} />;
}
