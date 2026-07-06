type FinesseLogoProps = {
  className?: string;
  title?: string;
};

export function FinesseLogo({ className, title = "Finesse Club" }: FinesseLogoProps) {
  const titleId = "finesse-logo-title";

  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      role="img"
      aria-labelledby={titleId}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{title}</title>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M82 74h82" strokeWidth="10" />
        <path d="M95 74v113" strokeWidth="12" />
        <path d="M78 187h82" strokeWidth="10" />
        <path d="M112 88h35c28 0 49 21 49 49s-21 50-49 50h-35" strokeWidth="11" />
        <path d="M143 73c10-18 26-29 47-33" strokeWidth="8" />
        <path d="M186 31l4 39" strokeWidth="8" />
        <path d="M166 51l40 4" strokeWidth="8" />
        <path d="M80 195c-8 11-18 17-31 18" strokeWidth="7" />
        <path d="M55 198l-7 28" strokeWidth="7" />
      </g>
      <circle cx="172" cy="143" r="6" fill="currentColor" />
    </svg>
  );
}