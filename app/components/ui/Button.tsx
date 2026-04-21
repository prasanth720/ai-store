import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition",
        className
      )}
    >
      {children}
    </button>
  );
}