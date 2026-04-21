interface Props {
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function Input({ placeholder, onChange }: Props) {
    return (
      <input
        placeholder={placeholder}
        onChange={onChange}
        className="border p-2 w-full rounded focus:outline-none focus:ring-2"
      />
    );
  }