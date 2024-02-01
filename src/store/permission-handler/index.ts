import { create } from 'zustand';

export type Permissions = {
  title: string;
  key: number;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type onChangeKey = 'create' | 'read' | 'update' | 'detele';

const data = [
  {
    title: 'User Management',
    key: 1,
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  {
    title: 'Role Management',
    key: 2,
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  {
    title: 'Bills & Payments',
    key: 3,
    create: false,
    read: false,
    update: false,
    delete: false,
  },
  {
    title: 'Vacancy Management',
    key: 4,
    create: false,
    read: false,
    update: false,
    delete: false,
  },
];

interface PermissionsState {
  data: Permissions[];
  onChange: (data: Permissions, key: onChangeKey) => void;
  resetData: () => void;
}

export const usePermissionHandler = create<PermissionsState>((set, get) => ({
  data: data,

  onChange: (data: Permissions, key: onChangeKey) => {
    let existingData = [...get().data];

    let updatePermissions = existingData?.map((element) => {
      if (element?.key === data?.key) {
        return {
          ...element,
          create: key === 'create' ? !element?.create : element?.create,
          read: key === 'read' ? !element?.read : element?.read,
          update: key === 'update' ? !element?.update : element?.update,
          delete: key === 'detele' ? !element?.delete : element?.delete,
        };
      }
      return element;
    });

    set({ data: updatePermissions });
  },
  resetData: () => {
    set({ data: data });
  },
}));

export const onChange = (data, key) => {
  return usePermissionHandler.getState().onChange(data, key);
};

export const resetData = () => {
  return usePermissionHandler.getState().resetData();
};
