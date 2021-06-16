import Toast from "../components/Toast/toast";
import { eraseCookie } from "../client/client";

export const useHandleError = (err: any) => {
	const url = (err.response && err.response.config.url) || "";
	if (
		err &&
		err.response &&
		err.response.status === 401 &&
		err.response.config &&
		!url.includes("/logout")
	) {
		eraseCookie("Token");
		eraseCookie("accessToken");

		Toast({
			position: "top-end",
			timer: 5000,
			icon: "warning",
			message: "Sua sessão expirou, favor autenticar a sua conta novamente.",
		});
	}

	if (err && err.response && err.response.status === 429) {
		Toast({
			position: "top-end",
			timer: 5000,
			icon: "warning",
			message:
				"Muitas requisições foram feitas em um curto período de tempo, favor aguardar.",
		});
	}

	if (err && err.response && err.response.status === 413) {
		Toast({
			position: "top-end",
			timer: 5000,
			icon: "error",
			message:
				"Arquivo enviado é grande, o limite máximo é 1MB, favor enviar novamente.",
		});
	}

	if (
		err &&
		err.response &&
		(err.response.status === 502 || err.response.status === 500) &&
		err.response.config &&
		!url.includes("/user")
	) {
		Toast({
			position: "top-end",
			timer: 5000,
			icon: "warning",
			message: "Nossos servidores estão instáveis, favor aguardar.",
		});
	}
};
