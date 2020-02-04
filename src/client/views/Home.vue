<template lang="pug">
	section.section
		.container
			hello-component(name="World")

</template>

<script>
import HelloComponent from '../components/HelloComponent.vue'

export default {
	components: {
		HelloComponent
	}
}
</script>
