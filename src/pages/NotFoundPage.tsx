import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
	const { t } = useTranslation();

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center">
			<img src="/images/psyduck.png" alt="Lost Psyduck" className="mb-8 h-48 w-48" />
			<h1 className="text-primary mb-4 text-6xl font-bold">404</h1>
			<h2 className="mb-4 text-2xl font-semibold">{t("notfound.title")}</h2>
			<p className="text-muted-foreground mb-8 max-w-md text-center">{t("notfound.description")}</p>
			<Link
				to="/"
				className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 transition-colors"
			>
				{t("Go Back Home")}
			</Link>
		</div>
	);
}
