export interface ChatParticipant {
  uid: string;
  displayName: string;
  avatarUrl?: string;
}

export interface ChatThread {
  id: string;
  participant: ChatParticipant;
  status: "REQUESTED" | "ACCEPTED" | "REJECTED";
  requestedBy: string;
  lastMessage?: string;
  lastMessageAt?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  createdAt?: string;
}
