const ControlItLogo = ({ width = 800, height = 250, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="80 30 480 169"
            width={width}
            height={height}
            {...props}
        >
            <defs>

                {/*
                <linearGradient
                    id="controlit-gradient"
                    x1="0" y1="0"
                    x2="800" y2="0"
                    gradientUnits="userSpaceOnUse">

                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="40%" stopColor="#3B82F6" />
                    <stop offset="70%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#14B8A6" />
                </linearGradient>
                */}

                <linearGradient
                    id="controlit-gradient"
                    x1="0"
                    y1="0"
                    x2="800"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="30%" stopColor="#38BDF8" />
                    <stop offset="60%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>

                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
                        .logo-text {
                            font-family: 'Segoe UI', sans-serif;
                            font-weight: 700;
                            font-size: 115px;
                            letter-spacing: -2px;
                        }
                    `}
                </style>
            </defs>

            <g>
                <text
                    x="80"
                    y="195"
                    className="logo-text"
                    fill="url(#controlit-gradient)"
                >
                    Contr
                </text>

                <g>
                    <path
                        d="M 402 138 A 28 28 0 1 0 430 138"
                        fill="none"
                        stroke="url(#controlit-gradient)"
                        strokeWidth="13"
                        strokeLinecap="round"
                    />
                    <line
                        x1="416"
                        y1="125"
                        x2="416"
                        y2="155"
                        stroke="url(#controlit-gradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                </g>

                <g>
                    <path
                        d="M 383 105 A 38 30 0 0 1 449 105"
                        fill="none"
                        stroke="url(#controlit-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 397 115 A 22 17 0 0 1 435 115"
                        fill="none"
                        stroke="url(#controlit-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />
                </g>

                <g>
                    <polygon
                        points="336,102 353,92 353,130 336,130"
                        fill="url(#controlit-gradient)"
                    />

                    <path
                        d="M 325 113 
                           L 416 38 
                           L 451 73 
                           L 451 48 
                           L 466 48 
                           L 466 88 
                           L 490 112"
                        fill="none"
                        stroke="url(#controlit-gradient)"
                        strokeWidth="10"
                        strokeLinejoin="miter"
                        strokeLinecap="butt"
                    />
                </g>

                <polygon
                    points="460,103 477,121 477,195 460,195"
                    fill="url(#controlit-gradient)"
                />

                <text
                    x="484"
                    y="195"
                    className="logo-text"
                    fill="url(#controlit-gradient)"
                >
                    it
                </text>
            </g>
        </svg>
    );
};

export default ControlItLogo;