export function SectionHeading({
  title,
  marker,
  description,
}: {
  title: string;
  marker?: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[20px] font-medium tracking-tight">{title}</h2>
        {marker && (
          <span className="font-mono text-[11px] text-subtle">// {marker}</span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-[13px] text-muted">{description}</p>
      )}
    </div>
  );
}
