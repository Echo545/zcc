import App from './App.svelte';
import auth from "../Auth.js";

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		key: auth.token
	}
});

export default app;