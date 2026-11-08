export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface QuickQuestionItem {
  id: string;
  category: 'Asas' | 'Ancaman' | 'Perlindungan' | 'Media Sosial' | 'AI & Etika';
  question: string;
  iconName?: string;
}

export interface GlossaryTerm {
  term: string;
  istilahMelayu: string;
  definisi: string;
  contoh: string;
  tips: string;
  kategori: string;
}

export interface QuizQuestion {
  id: number;
  soalan: string;
  pilihan: string[];
  jawapanBetul: number;
  penerangan: string;
}
