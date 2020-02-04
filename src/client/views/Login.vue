<template lang="pug">
	section.section
		.container
			hello-component(name="Login")

</template>

<script>
import HelloComponent from '../components/HelloComponent.vue'

export default {
	components: {
		HelloComponent
	}
}
</script>
