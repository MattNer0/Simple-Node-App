<template lang="pug">
	section.section
		.container
			hello-component(name="About")

</template>

<script>
import HelloComponent from '../components/HelloComponent.vue'

export default {
	components: {
		HelloComponent
	}
}
</script>
