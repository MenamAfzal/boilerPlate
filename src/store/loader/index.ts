import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  showLoading: (data: boolean) => void;
}

export const useLoading = create<LoadingState>((set, get) => ({
  isLoading: false,
  showLoading: (data: boolean) => {
    set({ isLoading: data });
  },
}));

export const setShowLoading = (data: boolean) => {
  return useLoading.getState().showLoading(data);
};
