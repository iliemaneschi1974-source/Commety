export interface ProfileHeaderData {
  avatarUrl?: string
  nickname: string
  city?: string
  joinedAt: string

  subtitle?: string

  level: number
  currentXp: number
  nextLevelXp: number
}

export interface ProfileStatsData {
  reports: number
  confirmations: number
  comments: number
  photos: number
}

export interface ProfileGalleryItem {
  id: string

  imageUrl: string

  reportId?: string
}