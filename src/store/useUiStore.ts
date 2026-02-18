'use client';

import { create } from 'zustand';

type UiState = {
  sidebarCollapsed: boolean;
  searchQuery: string;
  setSidebarCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
  setSearchQuery: (value: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  searchQuery: '',
  setSidebarCollapsed: (value) => set({ sidebarCollapsed: value }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSearchQuery: (value) => set({ searchQuery: value })
}));
