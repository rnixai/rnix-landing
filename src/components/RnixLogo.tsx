interface RnixLogoProps {
  className?: string;
  size?: number;
}

export default function RnixLogo({ className = '', size = 32 }: RnixLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="rnix-logo-title"
    >
      <title id="rnix-logo-title">Rnix Logo</title>
      <rect width="32" height="32" rx="8" fill="url(#rnix-bg)" />

      <circle cx="16" cy="9" r="2.5" fill="url(#rnix-node)" />

      <line x1="16" y1="11.5" x2="10" y2="18" stroke="#87eaf2" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="11.5" x2="22" y2="18" stroke="#87eaf2" strokeWidth="1.5" strokeLinecap="round" />

      <circle cx="10" cy="19.5" r="2" fill="url(#rnix-node)" />
      <circle cx="22" cy="19.5" r="2" fill="url(#rnix-node)" />

      <line x1="10" y1="21.5" x2="8" y2="25.5" stroke="#54d1db" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="10" y1="21.5" x2="13" y2="25.5" stroke="#54d1db" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="22" y1="21.5" x2="19.5" y2="25.5" stroke="#54d1db" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="22" y1="21.5" x2="24.5" y2="25.5" stroke="#54d1db" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

      <circle cx="8" cy="26" r="1.3" fill="#38bec9" opacity="0.6" />
      <circle cx="13" cy="26" r="1.3" fill="#38bec9" opacity="0.6" />
      <circle cx="19.5" cy="26" r="1.3" fill="#38bec9" opacity="0.6" />
      <circle cx="24.5" cy="26" r="1.3" fill="#38bec9" opacity="0.6" />

      <defs>
        <linearGradient id="rnix-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0e7c86" />
          <stop offset="1" stopColor="#044e54" />
        </linearGradient>
        <radialGradient id="rnix-node" cx="0.5" cy="0.3" r="0.7">
          <stop stopColor="#e0fcff" />
          <stop offset="1" stopColor="#87eaf2" />
        </radialGradient>
      </defs>
    </svg>
  );
}
