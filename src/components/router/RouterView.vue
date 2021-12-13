<template>
	<component :is="comp"></component>
</template>

<script>
import { computed, defineComponent, inject, provide } from "vue";
import { routerViewLocationKey } from "./index";
export default defineComponent({
	setup(props, { emit }) {
		const curRoute = inject(routerViewLocationKey);
		const comp = computed(() => curRoute.component);

		return {
			comp,
		};
	},
});
</script>
