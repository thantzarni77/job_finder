import { create } from "zustand";

type BasicDetailState = {
  name: string;
  email: string;
  phoneNum?: string;
};

type BasicDetailFunction = {
  setName: (formInput: string) => void;
  setEmail: (formInput: string) => void;
  setPhoneNum: (formInput: string) => void;
};

export const useBasicDetailStore = create<
  BasicDetailState & BasicDetailFunction
>((set) => ({
  name: "",
  email: "",
  phoneNum: "",
  setName: (formInput) => {
    set({ name: formInput });
  },
  setEmail: (formInput) => {
    set({ email: formInput });
  },
  setPhoneNum: (formInput) => {
    set({ phoneNum: formInput });
  },
}));
