"use client";

import Script from "next/script";

import { useAuth } from "@/contexts/AuthContext";

const MEASUREMENT_ID = "G-DD7CJT3NQ9";

/**
 * Google Analytics is intentionally loaded only after the optional analytics
 * consent stored on the signed-in user's profile. This matches Commety's
 * Privacy Policy and avoids tracking visitors who have not opted in.
 */
export default function GoogleAnalytics() {
  const { user } = useAuth();

  if (!user?.consents?.analyticsEnabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
