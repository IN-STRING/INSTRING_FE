import { create } from "zustand";

export type InstrumentType = "acoustic" | "classic" | "electric" | "bass";
export type LevelType = "Beginner" | "LowerIntermed" | "Intermediate" | "Advance" | "Professional";
export type stringsType = "normal" | "coating";

interface SurveyData {
  instrument?: InstrumentType;
  level?: LevelType;
  strings?: stringsType;
}

interface SurveyState {
  survey: SurveyData;

  setSurvey: (data: Partial<SurveyData>) => void;
  reset: () => void;

  isComplete: () => boolean;
}

export const useSurveyStore = create<SurveyState>((set, get) => ({
  survey: {},

  setSurvey: (data) =>
    set((state) => ({
      survey: { ...state.survey, ...data },
    })),

  reset: () => set({ survey: {} }),

  isComplete: () => {
    const { instrument, level, strings } = get().survey;
    return !!instrument && !!level && !!strings;
  },
}));
