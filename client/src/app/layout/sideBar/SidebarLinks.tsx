const links = [
  {
    href: "http://localhost:8000/docs",
    icon: "📚",
    label: "Swagger UI",
  },
  {
    href: "http://localhost:8000/redoc",
    icon: "📖",
    label: "ReDoc",
  },

  {
    href: "http://localhost:8000/admin/engine-calculation/list",
    icon: "📖",
    label: "Admin Panel",
  },
  {
    href: "http://localhost:8001",
    icon: "📖",
    label: "Documentation",
  },
];

export function SidebarLinks() {
  return (
    <div className="px-6 shrink-0">
      <h3 className="mb-2">Docs</h3>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="pr-2">{link.icon}</span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
