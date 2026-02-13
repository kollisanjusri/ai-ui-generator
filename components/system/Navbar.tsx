type NavbarProps = {
  title?: string;
};

export function Navbar({ title = "Dashboard" }: NavbarProps) {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="space-x-4 text-sm">
        <span className="cursor-pointer hover:underline">Home</span>
        <span className="cursor-pointer hover:underline">About</span>
        <span className="cursor-pointer hover:underline">Profile</span>
      </div>
    </nav>
  );
}
