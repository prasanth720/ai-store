

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";



export const metadata = {
  title: "Contact - AI Store",
  description: "Contact us page",
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <div className="space-y-3">
        <Input placeholder="Your Name" />
        <Input placeholder="Email" />
        <textarea
          placeholder="Message"
          className="border p-2 w-full rounded h-32"
        />

        <Button>Send Message</Button>
      </div>
    </div>
  );
}