import { create } from "zustand";

type ApiErrorResponse = Record<string, string[]>;

type RegisterData = {
  firstUserID: null | number;
  errors: ApiErrorResponse;
};

type RegisterActions = {
  setFirstUserID: (userInput: null | number) => void;
  setRegisterErrors: (errors: ApiErrorResponse) => void;
  removeRegisterErrors: () => void;
};

export const useRegisterStore = create<RegisterData & RegisterActions>(
  (set) => ({
    firstUserID: null,
    errors: {},
    setFirstUserID: (userInput) => {
      set({ firstUserID: userInput });
    },
    setRegisterErrors: (errors) => {
      set({ errors: errors });
    },
    removeRegisterErrors: () => {
      set({ errors: {} });
    },
  }),
);
