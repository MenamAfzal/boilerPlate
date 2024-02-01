import { create } from 'zustand';

type RegisterType = 'recruiter' | 'company' | null;
interface AppState {
  drawerStatus: boolean;
  companyType: RegisterType;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setCompanyType: (data: RegisterType) => void;
}

export const useApp = create<AppState>((set, get) => ({
  drawerStatus: false,
  companyType: null,
  openDrawer: () => {
    set({ drawerStatus: true });
  },
  closeDrawer: () => {
    set({ drawerStatus: false });
  },
  toggleDrawer: () => {
    set({ drawerStatus: !get().drawerStatus });
  },
  setCompanyType: (data: RegisterType) => {
    set({ companyType: data });
  },
}));

export const openDrawer = () => useApp.getState().openDrawer();
export const closeDrawer = () => useApp.getState().closeDrawer();
export const toggleDrawer = () => useApp.getState().toggleDrawer();
export const setCompanyType = (data: RegisterType) =>
  useApp.getState().setCompanyType(data);
