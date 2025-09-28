import { ToastContainer, type ToastContainerProps } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function ToastNotify({
	directionRTL = false,
	...restProps
}: ToastContainerProps & { directionRTL?: boolean }) {
	const props: ToastContainerProps = {
		position: "bottom-right",
		theme: "colored",
		autoClose: 8000,
		rtl: directionRTL,
		closeButton: true,
		limit: 4,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		closeOnClick: true,
		draggable: true,
		newestOnTop: false,
		style: {},
		...restProps,
	};
	return (
		<ToastContainer
			{...props}
			rtl={false}
			style={{ direction: directionRTL ? "rtl" : "ltr", ...props.style }}
		/>
	);
}
