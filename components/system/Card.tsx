type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {title && (
        <h2 className="text-lg font-semibold mb-4">
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}
