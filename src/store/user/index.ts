import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import type { StateStorage } from "zustand/middleware";
import { createJSONStorage, persist } from "zustand/middleware";
const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

type Profile = {
  unique_id: string;
  full_name: string;
  profile_pic: string;
  cover_pic: string;
  job_title: string | null;
  is_registration_done: number;
  registration_type: string;
};

type User = {
  id: number;
  auth_id: string;
  full_name: string | null;
  person_bio: string | null;
  is_block: string | null;
  email: string;
  phone: string | "";
  is_current: string;
  company_name: string | null;
  company_short_description: string | null;
  company_start_date: string | null;
  role: string | null;
  role_id: string | null;
  user_type: string | null;
};

type Company = {
  id: null;
  name: string;
  short_description: string;
  member_since: string;
  created_by: string | null;
  deleted_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  is_approved: string;
  slug: string;
  salary_range: string | null;
  contact_number: string;
  website: string | null;
  email: string;
  no_of_employees: string | null;
  working_time: string | null;
  average_wage: string | null;
  is_top: string;
  rating: string;
  deleted_at: string | null;
  user_name: string;
  user_id: string;
};

type Role = {
  id: 1;
  role_id: string;
  module_id: string;
  is_create: string;
  is_read: string;
  is_update: string;
  is_delete: string;
  created_by: string | null;
  deleted_by: string | null;
  updated_by: string | null;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
};

interface UserState {
  profile: Profile;
  user: User;
  company: Company;
  roles: Role[];
  setUserData: (data: any) => void;
  removeUserData: () => void;
  setUserWithProfile: (data: any) => void;
  setUserCompanyWithRoles: (data: any) => void;
}

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      user: null,
      company: null,
      roles: [],
      setUserData: (data: any) => {
        set({
          profile: data?.profile,
          user: data?.user,
          company: data?.company,
          roles: data?.company?.roles,
        });
      },
      removeUserData: () => {
        set({
          profile: null,
          user: null,
          company: null,
          roles: null,
        });
      },
      setUserWithProfile: (data: any) => {
        set({
          profile: data?.profile,
          user: data?.user,
        });
      },
      setUserCompanyWithRoles: (data: any) => {
        set({
          company: data?.company,
        });
      },
    }),
    {
      name: "user-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage), // (optional) by default the 'localStorage' is used
    }
  )
);

// set user data
export const setUserData = (data: any) => {
  return useUser.getState().setUserData(data);
};

// set user data
export const setUserWithProfile = (data: any) => {
  return useUser.getState().setUserWithProfile(data);
};

// set user data
export const setUserCompanyWithRoles = (data: any) => {
  return useUser.getState().setUserCompanyWithRoles(data);
};

// set user data
export const removeUserData = () => {
  return useUser.getState().removeUserData();
};
