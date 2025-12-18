<template>
	<header
		class="flex flex-col items-center bg-primary/90 backdrop-blur-md sticky top-0 z-50 w-full h-20 text-lg shadow-lg transition-all duration-300">
		<!-- class="flex flex-col items-center bg-primary/98 backdrop-blur-md sticky top-0 z-50 w-full h-20 text-lg shadow-lg transition-all duration-300"> -->
		<div class="absolute top-0 left-0 w-full h-4 z-[60] flex justify-between px-1 pointer-events-none overflow-hidden">
			<div v-for="n in 40" :key="n" class="w-2 h-2 rounded-full shadow-md animate-twinkle" :class="[
				n % 2 === 0 ? 'bg-accent' : 'bg-secondary',
				n % 3 === 0 ? 'delay-700' : ''
			]" :style="{ marginTop: (n % 2 === 0 ? '2px' : '6px') }">
			</div>
		</div>
		<div class="flex h-20 items-center w-full justify-between px-4 relative max-w-7xl mx-auto">
			<div class="flex items-center relative">
				<NuxtLink to="/" class="flex" @click="resetInput">
					<img :src="`https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_160/v1740248697/modofit.webp`"
						type="image/webp" loading="lazy" alt="Logo de Modo Fit"
						class="flex h-12 w-12 lg:h-14 lg:w-14 border-2 border-secondary rounded-full relative z-10">
					<img src="~/assets/santa_hat2.png" alt="Santa Hat"
						class="absolute -top-3 -left-2 w-7 h-7 z-20 transform -rotate-[25deg] pointer-events-none">
				</NuxtLink>
			</div>
			<div class="flex justify-center relative flex-1 mx-4 lg:mx-10">
				<div class="relative w-full max-w-2xl">
					<input v-model="inputString" placeholder="Buscar productos..." @keyup.enter="redirectToHome" @focus="showSuggestions = true"
						@blur="hideSuggestions"
						class="w-full pl-4 pr-10 h-10 lg:h-12 bg-white/10 border border-secondary/30 text-white placeholder:text-gray-300 text-base rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white/20 focus:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300">
					<img src="~/assets/lens.svg" class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 opacity-70 invert" alt="lens">
				</div>

				<div class="absolute top-full left-0 w-full mt-2">
					<ul v-if="suggestions.length"
						class="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-h-80 overflow-y-auto z-50 tracking-wide">
						<li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)"
							class="cursor-pointer px-4 py-2 hover:bg-gray-50 text-text text-sm transition-colors">
							{{ suggestion }}
						</li>
					</ul>
				</div>
			</div>
			<div class="flex items-center gap-4">
				<ClientOnly>
					<div class="flex flex-row items-center text-white font-medium">
						<NuxtLink v-if="user && user.role === 'admin'" to="/admin/sales"
							class="mr-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 text-sm font-medium hidden lg:block">
							Registrar Venta
						</NuxtLink>
						<NuxtLink v-if="user && user.role === 'admin'" to="/admin/statistics"
							class="mr-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 text-sm font-medium hidden lg:block">
							Mostrar Estadísticas
						</NuxtLink>
						<NuxtLink to="/login"
							class="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 group">
							<div class="flex flex-col items-end">
								<span v-if="!user" class="text-sm font-medium leading-none tracking-wide">Iniciar Sesión</span>
								<div v-else class="flex flex-col items-end">
									<span class="text-[10px] text-gray-300 font-medium leading-tight uppercase tracking-wider">Hola,</span>
									<span class="text-sm font-bold leading-none tracking-wide">{{ user.name }}</span>
								</div>
							</div>
							<div class="relative p-0.5 rounded-full border border-white/30 group-hover:border-white/60 transition-colors">
								<img :src="`https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,dpr_2.0,c_limit,h_96/v1740248697/user_njnkfl.png`"
									class="h-8 w-8 rounded-full invert opacity-90 group-hover:opacity-100 transition-opacity" type="image/webp" loading="lazy"
									alt="Usuario">
							</div>
						</NuxtLink>
					</div>
					<div class="relative group cursor-pointer">
						<span
							class="absolute -top-2 -right-2 bg-secondary text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
							{{ cartItemCount }}
						</span>
						<NuxtLink to="/cart" class="hover:scale-110 transition-transform block">
							<img class="h-8 w-8 lg:h-10 lg:w-10 invert opacity-90" src="~/assets/shopping-cart.png" alt="Carrito" loading="lazy">
						</NuxtLink>
					</div>
				</ClientOnly>
			</div>
		</div>
	</header>
</template>

<script>
import { useParamsStore } from '~/stores/params';
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { computed } from 'vue';

export default {
	name: 'NavBar',
	data() {
		return {
			cart: [],
			inputString: '',
			showSuggestions: false,
			allSuggestions: [
				'Suplementos',
				'Frutos Secos',
				'Yuyos',
				'Especias',
				'Frutas Desecadas',
				'Mermelada',
				'Repostería',
				'Aceites',
				'Legumbres',
				'Cereales',
				'Semillas',
				'Chocolate',
				'Harinas',
				'Verduras Deshidratadas'
			]
		};
	},

	setup() {
		const cartStore = useCartStore();
		const authStore = useAuthStore();
		const cartItemCount = computed(() => cartStore.cartCount);

		return {
			cartItemCount,
			authStore
		};
	},

	watch: {
		inputString(newValue) {
			this.updateString();
		},
	},

	computed: {
		user() {
			return this.authStore.user;
		},
		suggestions() {
			if (this.showSuggestions) {
				return this.inputString
					? this.allSuggestions.filter(s =>
						s.toLowerCase().includes(this.inputString.toLowerCase())
					)
					: this.allSuggestions; // muestra todo si no hay input
			}
			return [];
		},
	},

	methods: {
		resetInput() {
			this.inputString = ''
		},

		updateString() {
			const store = useParamsStore()
			store.updateString(this.inputString)
		},

		refreshCart() {
			const cartStore = useCartStore();
			cartStore.initializeCart();
		},

		redirectToHome() {
			this.$router.push('/');
		},

		selectSuggestion(suggestion) {
			this.inputString = suggestion;
			this.redirectToHome();
		},

		hideSuggestions() {
			setTimeout(() => {
				this.showSuggestions = false;
			}, 200);
		},
	},
	mounted() {
		this.refreshCart()
		const authStore = useAuthStore();
		authStore.initializeAuth();
	}
}
</script>
