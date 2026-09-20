import s from "../portfolio.module.css";

export function StaticSystem() {
  return (
    <div className={s.system} aria-hidden="true">
      <svg viewBox="0 0 900 1000" fill="none" focusable="false">
        <defs>
          <linearGradient
            id="system-signal"
            x1="180"
            y1="180"
            x2="740"
            y2="860"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5EF2A6" />
            <stop offset=".55" stopColor="#58C7FF" />
            <stop offset="1" stopColor="#8875FF" />
          </linearGradient>
          <radialGradient id="system-light">
            <stop stopColor="#5EF2A6" stopOpacity=".18" />
            <stop offset="1" stopColor="#5EF2A6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="500"
          cy="490"
          rx="350"
          ry="400"
          fill="url(#system-light)"
        />
        <g stroke="url(#system-signal)">
          {Array.from({ length: 19 }, (_, i) => (
            <ellipse
              key={i}
              cx="500"
              cy="490"
              rx={85 + i * 9}
              ry={240 - i * 3}
              transform={`rotate(${i * 9} 500 490)`}
              opacity={0.15 + (i % 4) * 0.09}
              strokeWidth=".8"
            />
          ))}
          <path
            d="M500 178 310 322 243 510 370 692 593 766 749 607 767 371 602 215Z"
            opacity=".65"
          />
          <path
            d="m500 178 93 588M310 322l439 285M243 510l524-139M370 692l232-477M310 322l283 444M243 510l359-295M370 692l397-321"
            opacity=".24"
          />
          <circle cx="500" cy="490" r="44" opacity=".7" />
          <circle cx="500" cy="490" r="9" fill="#5EF2A6" />
          {[
            [500, 178],
            [310, 322],
            [243, 510],
            [370, 692],
            [593, 766],
            [749, 607],
            [767, 371],
            [602, 215],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r="4" fill="#EEF4F2" />
              <circle cx={cx} cy={cy} r="13" opacity=".3" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
