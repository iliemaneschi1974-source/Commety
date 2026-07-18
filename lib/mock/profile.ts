import {
  ProfileGalleryItem,
  ProfileHeaderData,
  ProfileStatsData,
} from "@/types/profile";
import { Report } from "@/types/report";

export const profileHeaderMock: ProfileHeaderData = {
  avatarUrl: "",
  nickname: "IlieManeschi",
  city: "Roma",
  joinedAt: "Giugno 2026",
  subtitle: "Reporter attivo della community",
  level: 4,
  currentXp: 540,
  currentLevelXp: 40,
  xpForNextLevel: 300,
  remainingXp: 260,
  reliabilityTier: "AFFIDABILE",
  reliabilityLabel: "Affidabile",
};

export const profileStatsMock: ProfileStatsData = {
  reports: 154,
  confirmations: 1284,
  comments: 312,
  photos: 486,
};

export const profileReportsMock: Report[] = [
  {
    id: "1",
    type: "meteo",
    title: "Pioggia intensa",
    description: "Pioggia intensa con scarsa visibilità.",
    lat: 41.9028,
    lng: 12.4964,
    city: "Roma",
    address: "Roma",
    status: "ACTIVE",
    isVisible: true,
    userId: "demo-user",
    username: "IlieManeschi",
    images: [],
    confirmations: 24,
    commentsCount: 8,
  },
  {
    id: "2",
    type: "pericolo",
    title: "Albero caduto",
    description: "Albero caduto sulla carreggiata.",
    lat: 41.354,
    lng: 13.431,
    city: "Fondi",
    address: "Fondi",
    status: "ACTIVE",
    isVisible: true,
    userId: "demo-user",
    username: "IlieManeschi",
    images: [],
    confirmations: 15,
    commentsCount: 3,
  },
  {
    id: "3",
    type: "traffico",
    title: "Traffico rallentato",
    description: "Code in entrambe le direzioni.",
    lat: 41.467,
    lng: 12.903,
    city: "Latina",
    address: "Latina",
    status: "ACTIVE",
    isVisible: true,
    userId: "demo-user",
    username: "IlieManeschi",
    images: [],
    confirmations: 42,
    commentsCount: 11,
  },
];

export const profileGalleryMock: ProfileGalleryItem[] = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/400?1",
  },
  {
    id: "2",
    imageUrl: "https://picsum.photos/400?2",
  },
  {
    id: "3",
    imageUrl: "https://picsum.photos/400?3",
  },
  {
    id: "4",
    imageUrl: "https://picsum.photos/400?4",
  },
  {
    id: "5",
    imageUrl: "https://picsum.photos/400?5",
  },
  {
    id: "6",
    imageUrl: "https://picsum.photos/400?6",
  },
];
