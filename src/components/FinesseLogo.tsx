import logoUrl from "@/assets/finesse-club-logo.webp";

type FinesseLogoProps = {
  className?: string;
  title?: string;
};

export function FinesseLogo({ className, title = "Finesse Club" }: FinesseLogoProps) {
  return (
    <img
      className={className}
      src={logoUrl}
      alt={title}
      draggable={false}
      onError={(event) => {
        if (!event.currentTarget.src.endsWith("/logo-fc.webp")) {
          event.currentTarget.src = "/logo-fc.webp";
        }
      }}
    />
  );
}