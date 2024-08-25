import { create } from "zustand";

interface ModalState {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
}));
