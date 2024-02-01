import { create } from 'zustand';

type Card = {
  card: string;
  expiry: string;
  cvc: string;
};

interface PaymentState {
  payments: [];
  cards: Card[] | [];
  addCard: (data: Card) => void;
  deleteCard: (data: Card) => void;
}

export const usePayments = create<PaymentState>((set, get) => ({
  payments: [],
  cards: [],
  addCard: (data: Card) => {
    let cards = [...get().cards];
    cards.push(data);
    set({ cards: cards });
  },
  deleteCard: (data: Card) => {
    let cards = [...get().cards];
    cards.push(data);
    set({ cards: cards });
    set({ cards: cards });
  },
}));

// add card
export const addCard = (data: Card) => {
  return usePayments.getState().addCard(data);
};

// delete card
export const deleteCard = (data: Card) => {
  return usePayments.getState().deleteCard(data);
};
