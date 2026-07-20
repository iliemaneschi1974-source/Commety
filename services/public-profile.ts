import { httpsCallable } from "firebase/functions";

import { functions } from "@/lib/firebase";
import { PublicProfile } from "@/types/public-profile";

export async function getPublicProfile(uid: string): Promise<PublicProfile> {
  const getProfile = httpsCallable<{ uid: string }, { profile?: PublicProfile }>(
    functions,
    "getPublicProfile"
  );
  const result = await getProfile({ uid });

  if (!result.data.profile) {
    throw new Error("Profilo non disponibile.");
  }

  return result.data.profile;
}
