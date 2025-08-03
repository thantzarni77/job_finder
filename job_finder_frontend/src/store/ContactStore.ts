import { create } from "zustand";

export type SingleContact = {
  id: number;
  user_id: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    user_type: string;
    profile_picture: string;
    refresh_token: string;
    provider: null;
    provider_id: null;
    provider_token: null;
    email_verified_at: null;
    created_at: string;
    updated_at: string;
  };
};

type Contacts = {
  allContacts: SingleContact[];
};

type ContactsActions = {
  setAllContacts: (value: SingleContact[]) => void;
};

export const useContactStore = create<Contacts & ContactsActions>((set) => ({
  allContacts: [],
  setAllContacts: (value: SingleContact[]) => {
    set({ allContacts: value });
  },
}));
