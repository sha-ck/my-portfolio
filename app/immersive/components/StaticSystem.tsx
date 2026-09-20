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
        <g stroke="url(#system-signal)" data-static-scene="home">
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
        <g stroke="url(#system-signal)" strokeWidth="1.2" opacity=".6">
          <g data-static-scene="about">
            <path d="M490 780V510M490 510 290 370 260 210M490 510 690 370 730 210M290 370 180 420M690 370 800 420" />
            {[
              [490, 510],
              [290, 370],
              [260, 210],
              [690, 370],
              [730, 210],
              [490, 780],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" />
            ))}
          </g>
          <g data-static-scene="experience">
            <path d="M500 140V850M500 250H650M500 450H350M500 650H650" />
            {[250, 450, 650, 850].map((cy) => (
              <circle key={cy} cx="500" cy={cy} r="12" />
            ))}
          </g>
          <g data-static-scene="projects">
            <path d="M330 330 660 330 660 660 330 660Z" />
            {[
              [330, 330],
              [660, 330],
              [330, 660],
              [660, 660],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
                <path d="M-85-60 0-105 85-60V60L0 105-85 60ZM-85-60 0 0 85-60M0 0V105" />
              </g>
            ))}
          </g>
          {["skills", "contact"].map((scene) => (
            <g
              key={scene}
              data-static-scene={scene}
              transform={
                scene === "contact" ? "translate(90 100) scale(.8)" : undefined
              }
            >
              <circle cx="500" cy="490" r="215" />
              {Array.from({ length: 8 }, (_, i) => {
                const x = 500 + Math.cos((i * Math.PI) / 4) * 280;
                const y = 490 + Math.sin((i * Math.PI) / 4) * 280;
                return (
                  <g key={i}>
                    <path d={`M500 490 ${x} ${y}`} />
                    <circle cx={x} cy={y} r="12" />
                  </g>
                );
              })}
              <circle cx="500" cy="490" r="35" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
