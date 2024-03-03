"use client";

import { PropsWithChildren, useId } from "react";

type AlertProps = PropsWithChildren<{
	class?: string;
	type?: "success" | "danger";
}>;

const ALERT_TYPE_STYLE = {
	success: "text-green-900 bg-green-100",
	danger: "text-red-900 bg-red-100",
};

export function Alert({
	type = "success",
	class: className,
	children,
}: AlertProps) {
	const styles = ALERT_TYPE_STYLE[type];

	return (
		<div
			className={`${styles} flex items-center p-4 text-sm rounded-lg ${className}`}
			role="alert"
		>
			{children}
		</div>
	);
}
