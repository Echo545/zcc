import App from './App.svelte';
import auth from "../Auth.js";

const app = new App({
	target: document.body,
	props: {
		key: auth.token
	}
});

export default app;