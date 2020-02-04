<template lang="pug">
  h1.title Hello {{ name }}!
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		}
  }
}
</script>

<style lang="stylus" scoped>
	h1
		color red
</style>
