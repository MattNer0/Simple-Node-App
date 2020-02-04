<template lang="pug">
	div
		nav.navbar.is-fixed-top(role="navigation" aria-label="main navigation")
			.navbar-menu
				.navbar-start
					router-link.navbar-item(to="/") Home
					router-link.navbar-item(to="/login") Login
					router-link.navbar-item(to="/about") About
		router-view
</template>
