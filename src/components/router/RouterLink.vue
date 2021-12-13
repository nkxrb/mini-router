<template>
	<a @click="toLink">
		<slot />
	</a>
</template>

<script>
import { defineComponent, inject } from "vue";
import { routerKey } from "./index";
export default defineComponent({
	props: {
		to: { type: String, require: true },
	},
	setup(props, { emit, slots }) {
		const router = inject(routerKey);
		const toLink = () => {
			router.push(props.to);
		};

		return {
			slots,
			toLink,
		};
	},
});
</script>
