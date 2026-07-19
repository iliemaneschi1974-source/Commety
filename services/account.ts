import { httpsCallable } from "firebase/functions";

import { functions } from "@/lib/firebase";

export async function deleteCurrentAccount(): Promise<void> {
  const deleteAccount = httpsCallable<
    undefined,
    { deleted: boolean }
  >(functions, "deleteAccount");

  await deleteAccount();
}
