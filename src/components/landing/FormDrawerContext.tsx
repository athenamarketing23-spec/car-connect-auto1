import { createContext, useContext, useState, ReactNode } from "react";

type Ctx = { open: boolean; openForm: () => void; closeForm: () => void };
const FormCtx = createContext<Ctx | null>(null);

export function FormDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <FormCtx.Provider value={{ open, openForm: () => setOpen(true), closeForm: () => setOpen(false) }}>
      {children}
    </FormCtx.Provider>
  );
}

export function useFormDrawer() {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error("useFormDrawer must be used inside FormDrawerProvider");
  return ctx;
}
