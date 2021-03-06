import React from "react";


export const HomeIcon = (): JSX.Element => {
	return (
		<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision" style={{color:"var(--geist-foreground)"}}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>
	);
}

export const PortfolioIcon = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
    </svg>
  );
}

export const LogOutIcon = (): JSX.Element => {
  return (
    <svg
			style={{
				transform: "rotate(0.5turn)"
			}}
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path>
    </svg>
  );
}

export const MarketIcon = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  );
}

export const BodhiIcon = (): JSX.Element => {
  return (
    <img src="logo.png" width="24"></img>
  );

}

export const RightArrow = (): JSX.Element => {
    return (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="var(--geist-foreground)"
        shapeRendering="geometricPrecision"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    );
}

export const LeftArrow = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M19 12H5M12 19l-7-7 7-7"></path>
    </svg>
  );
}

export const NewsIcon = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"></path>
    </svg>
  );
}

export const RulesIcon = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>
    </svg>
  );
}

export const LoaderIcon = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>
  );
}
export const Avatar = (): JSX.Element => {
  return(
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
}

export const ChartIcon = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <path d="M12 20V10M18 20V4M6 20v-4"></path>
    </svg>
  );
}
export const InfoIcon = ():JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" fill="var(--geist-fill)"></circle>
      <path stroke="var(--geist-stroke)" d="M12 16v-4M12 8h.01"></path>
    </svg>
  )
}
  
export const LeaderboardIcon = ():JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="8" r="7"></circle>
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
    </svg>
  );
}

export const AllNewsIcon = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M2 3v15c0 1.645 1.355 3 3 3h14c1.645 0 3-1.355 3-3V7h-2v11c0 .565-.435 1-1 1s-1-.435-1-1V3H2zm2 2h12v13c0 .388.279.658.416 1H5c-.565 0-1-.435-1-1V5zm2 2v3h8V7H6zm0 5v2h8v-2H6zm0 4v2h8v-2H6z"></path>
    </svg>
  );
}
export const SponsorsIcon = (): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="var(--geist-foreground)"
      shapeRendering="geometricPrecision"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M14.83 9.17l3.53-3.53M4.93 19.07l4.24-4.24"></path>
    </svg>
  );
}
