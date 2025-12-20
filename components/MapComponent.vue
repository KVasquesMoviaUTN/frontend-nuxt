<template>
	<div ref="mapContainer" class="w-full h-full relative bg-gray-100">
		<transition name="fade">
			<iframe v-if="isVisible" class="absolute inset-0 w-full h-full border-0"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.703277247966!2d-58.42042018749903!3d-34.636937972829564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccba81bb182c1%3A0x5a1776727fcdb275!2sCastro%20Barros%202085%2C%20C1237ABS%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1sen!2sar!4v1737666492507!5m2!1sen!2sar"
				allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicación de Modo Fit en Castro Barros 2085, Boedo">
			</iframe>
			<div v-else class="absolute inset-0 flex items-center justify-center text-gray-400">
				<span class="animate-pulse">Cargando mapa...</span>
			</div>
		</transition>
	</div>
</template>

<script setup>
const isVisible = ref(false);
const mapContainer = ref(null);

onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				isVisible.value = true;
				observer.disconnect();
			}
		});
	}, {
		rootMargin: '200px' // Load when within 200px of viewport
	});

	if (mapContainer.value) {
		observer.observe(mapContainer.value);
	}
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
