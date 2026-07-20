export interface CallCandidate {
  senderId: string;
  candidate: string;
}

export interface CallSession {
  callerId: string;
  offer?: string;
  answer?: string;
  candidates: CallCandidate[];
  createdAt?: string;
}
