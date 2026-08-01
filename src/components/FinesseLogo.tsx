import logoUrl from "@/assets/finesse-club-logo.webp";

type FinesseLogoProps = {
  className?: string;
  title?: string;
};

export function FinesseLogo({ className, title = "Finesse Club" }: FinesseLogoProps) {
  return (
    <img className={className} src={logoUrl} alt={title} draggable={false} />

  );
}