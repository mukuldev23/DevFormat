export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-40 animate-pulse rounded-2xl border border-border bg-card/70" />
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="h-[360px] animate-pulse rounded-2xl border border-border bg-card/70" />
        <div className="h-[360px] animate-pulse rounded-2xl border border-border bg-card/70" />
      </div>
    </div>
  );
}
