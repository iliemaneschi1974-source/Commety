import { Timestamp } from "firebase/firestore";

export interface Comment {
  id: string;

  reportId: string;

  text: string;

  deviceId: string;

  username?: string;

  createdAt?: Timestamp;

  updatedAt?: Timestamp;
}

export interface CreateCommentInput {
  reportId: string;

  text: string;
}