import { useState, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingInput({ label, value, onChange, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const hasValue = typeof value === "string" && value.length > 0;
  const floated = focused || hasValue;

  return (
    <div className="relative">
      <input
        {...rest}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-lg bg-white/5 border border-white/10 px-4 pt-5 pb-2 text-white outline-none transition focus:border-[#16A34A]/60 focus:bg-white/[0.07]"
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${
          floated ? "top-1.5 text-[10px] uppercase tracking-wider text-[#16A34A]" : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
