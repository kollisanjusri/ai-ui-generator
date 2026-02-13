type SidebarProps = {
  title?: string;
};

export function Sidebar({ title = "Menu" }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-gray-100 border-r border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">{title}</h2>
      <ul className="space-y-3 text-sm">
        <li className="cursor-pointer hover:underline">Dashboard</li>
        <li className="cursor-pointer hover:underline">Analytics</li>
        <li className="cursor-pointer hover:underline">Settings</li>
        <li className="cursor-pointer hover:underline">Logout</li>
      </ul>
    </aside>
  );
}
