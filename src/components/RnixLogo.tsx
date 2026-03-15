interface RnixLogoProps {
  className?: string;
  size?: number;
}

export default function RnixLogo({ className = '', size = 32 }: RnixLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="rnix-logo-title"
    >
      <title id="rnix-logo-title">Rnix Logo</title>

      {/* Second ring context */}
      <g fill="none" stroke="var(--logo-stroke)" strokeWidth="1" opacity="0.12">
        <polygon points="178,27 202,41 202,69 178,83 154,69 154,41"/>
        <polygon points="22,27 46,41 46,69 22,83 -2,69 -2,41"/>
        <polygon points="22,117 46,131 46,159 22,173 -2,159 -2,131"/>
      </g>

      {/* Growth hint beyond UL */}
      <polyline points="24,24 48,38 72,24"
        fill="none" stroke="var(--logo-stroke)" strokeWidth="1" opacity="0.1"
        strokeLinecap="round"/>

      {/* UL: ghost outline + reinforced inner edges */}
      <polygon points="74,27 98,41 98,69 74,83 50,69 50,41"
        fill="none" stroke="var(--logo-stroke)" strokeWidth="1" opacity="0.08"/>
      <polyline points="98,41 98,69 74,83 50,69"
        fill="none" stroke="var(--logo-stroke)" strokeWidth="1.5" opacity="0.25"
        strokeLinecap="round"/>

      {/* L: ghost */}
      <polygon points="48,72 72,86 72,114 48,128 24,114 24,86"
        fill="var(--logo-stroke)" opacity="0.10"/>

      {/* 4 semi-activated cells */}
      <polygon points="74,117 98,131 98,159 74,173 50,159 50,131"
        fill="var(--logo-stroke)" opacity="0.22"/>
      <polygon points="126,117 150,131 150,159 126,173 102,159 102,131"
        fill="var(--logo-stroke)" opacity="0.38"/>
      <polygon points="126,27 150,41 150,69 126,83 102,69 102,41"
        fill="var(--logo-stroke)" opacity="0.50"/>
      <polygon points="152,72 176,86 176,114 152,128 128,114 128,86"
        fill="var(--logo-stroke)" opacity="0.75"/>

      {/* Center emergence glow */}
      <circle cx="100" cy="100" r="34" fill="var(--logo-accent)" opacity="0.06"/>
      <circle cx="100" cy="100" r="22" fill="var(--logo-accent)" opacity="0.1"/>

      {/* Center hex: emergence core */}
      <polygon points="100,72 124,86 124,114 100,128 76,114 76,86"
        fill="var(--logo-accent)"/>
    </svg>
  );
}
