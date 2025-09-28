import React from "react";

export type ShowComponentSVGProps = {
	SVGProps: React.SVGProps<SVGSVGElement>;
	SVGComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export default function ShowComponentSVG({ SVGComponent, SVGProps = {} }: ShowComponentSVGProps) {
	if (!SVGComponent) return;

	return <SVGComponent {...SVGProps} />;
}
