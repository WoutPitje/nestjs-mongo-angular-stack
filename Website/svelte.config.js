import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapterNode from "@sveltejs/adapter-node";
import adapterAuto from "@sveltejs/adapter-auto";

// Use NODE_ENV to determine the environment, defaulting to 'development'
const env =
	process.env.NODE_ENV ||
	"development";

const adapter =
	env === "production"
		? adapterNode
		: adapterAuto;

const config = {
	preprocess:
		vitePreprocess(),
	kit: {
		adapter: adapter()
	}
};

export default config;
