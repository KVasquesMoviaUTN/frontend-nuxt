<template>
	<footer
		class="bg-gradient-to-b from-primary to-primary/95 text-white mt-auto py-10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-secondary/30">
		<div class="max-w-7xl mx-auto px-4">
			<div class="flex justify-center items-center space-y-4 lg:space-y-0 lg:space-x-12 flex-col lg:flex-row font-medium tracking-wide">
				<NuxtLink to="/" class="text-sm uppercase tracking-widest text-white/80 hover:text-secondary transition-colors duration-300 relative group">
					Inicio
					<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
				</NuxtLink>
				<NuxtLink to="/about"
					class="text-sm uppercase tracking-widest text-white/80 hover:text-secondary transition-colors duration-300 relative group">
					Sobre nosotros
					<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
				</NuxtLink>
				<NuxtLink to="/contact"
					class="text-sm uppercase tracking-widest text-white/80 hover:text-secondary transition-colors duration-300 relative group">
					Contacto
					<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
				</NuxtLink>
			</div>
			<div class="text-center text-xs mt-8 text-white/40 font-light tracking-wider">
				<p>&copy; 2025 Modo Fit. Todos los derechos reservados.</p>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'FooterComponent',
}
</script>
