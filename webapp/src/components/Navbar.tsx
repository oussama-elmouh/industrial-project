import { Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="mx-auto bg-white shadow">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-end bg-white">
          <Bell />
        </div>
      </div>
    </div>
  );
}
