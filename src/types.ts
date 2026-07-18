export type AddictionType = 'alcohol' | 'drugs' | 'tobacco' | 'others';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  addictionType: AddictionType;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  questionHi: string;
  questionEn: string;
  options: {
    textHi: string;
    textEn: string;
    score: number;
  }[];
}

export interface RoutineItem {
  time: string;
  activityHi: string;
  activityEn: string;
  category: 'morning' | 'afternoon' | 'evening' | 'night';
  icon: string;
}

export interface Testimonial {
  id: string;
  nameHi: string;
  nameEn: string;
  age: number;
  locationHi: string;
  locationEn: string;
  storyHi: string;
  storyEn: string;
  recoveryHi: string;
  recoveryEn: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  category: 'sleeping' | 'yoga' | 'lounge' | 'counseling';
  tagHi: string;
  tagEn: string;
}
