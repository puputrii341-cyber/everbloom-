"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";

export interface FlowerItem {
  id: string;
  flowerId: string; // references mockData ID
  x?: number;
  y?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  zIndex?: number;
}

export interface BouquetState {
  step: number;
  selectedFlowers: FlowerItem[];
  wrapperId: string | null;
  ribbonId: string | null;
  senderName: string;
  receiverName: string;
  message: string;
  cardStyle: string | null;
}

type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "ADD_FLOWER"; payload: FlowerItem }
  | { type: "REMOVE_FLOWER"; payload: string }
  | { type: "SET_WRAPPER"; payload: string }
  | { type: "SET_RIBBON"; payload: string }
  | { type: "SET_DEDICATION"; payload: Partial<BouquetState> }
  | { type: "LOAD_STATE"; payload: BouquetState };

const initialState: BouquetState = {
  step: 1,
  selectedFlowers: [],
  wrapperId: null,
  ribbonId: null,
  senderName: "",
  receiverName: "",
  message: "",
  cardStyle: null,
};

const BouquetContext = createContext<{
  state: BouquetState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function bouquetReducer(state: BouquetState, action: Action): BouquetState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "ADD_FLOWER":
      if (state.selectedFlowers.length >= 10) return state; // Max 10
      return { ...state, selectedFlowers: [...state.selectedFlowers, action.payload] };
    case "REMOVE_FLOWER": {
      const indexToRemove = state.selectedFlowers.findLastIndex(
        (f) => f.flowerId === action.payload
      );
      if (indexToRemove === -1) return state;
      const newFlowers = [...state.selectedFlowers];
      newFlowers.splice(indexToRemove, 1);
      return {
        ...state,
        selectedFlowers: newFlowers,
      };
    }
    case "SET_WRAPPER":
      return { ...state, wrapperId: action.payload };
    case "SET_RIBBON":
      return { ...state, ribbonId: action.payload };
    case "SET_DEDICATION":
      return { ...state, ...action.payload };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

export function BouquetProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bouquetReducer, initialState);

  // Sync session storage on mount
  useEffect(() => {
    const draft = sessionStorage.getItem("everbloom_draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        dispatch({ type: "LOAD_STATE", payload: parsed });
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  // Save to session storage when state changes
  useEffect(() => {
    sessionStorage.setItem("everbloom_draft", JSON.stringify(state));
  }, [state]);

  return (
    <BouquetContext.Provider value={{ state, dispatch }}>
      {children}
    </BouquetContext.Provider>
  );
}

export function useBouquet() {
  const context = useContext(BouquetContext);
  if (!context) {
    throw new Error("useBouquet must be used within a BouquetProvider");
  }
  return context;
}
