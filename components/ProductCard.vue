<template>
	<div
		class="relative m-1 flex flex-col rounded-2xl border border-secondary/20 bg-white p-1 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 lg:m-2">
		<NuxtLink :to="{ name: 'product-id', params: { id: product.id } }" class="flex flex-col flex-1 group">
			<!-- Discount Badge -->
			<div v-if="product.discount > 0"
				class="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-red-700 px-2 py-1 text-xs font-semibold tracking-wide text-white shadow lg:px-3 lg:text-sm lg:tracking-widest z-10">
				-{{ product.discount }}%
			</div>

			<!-- Product Image -->
			<div class="my-1 flex items-center justify-center bg-white overflow-hidden rounded-lg">
				<img :src="getImage(product)" class="h-24 lg:h-28 transform group-hover:scale-110 transition-transform duration-500" type="image/webp"
					loading="lazy" :alt="`Imagen de ${product.name}`">
			</div>

			<!-- Product Name -->
			<h3 class="my-auto flex justify-center text-center text-sm lg:text-base font-serif font-semibold text-text">
				{{ getProductDisplayName(product) }}
			</h3>

			<!-- Price Display -->
			<div class="flex justify-center gap-2 mt-2 font-sans">
				<template v-if="shouldShowDiscountedPrice(product)">
					<span class="text-red-600 line-through text-xs lg:text-sm">
						${{ formattedBasePrice(product) }}
					</span>
					<span class="font-bold text-primary text-lg lg:text-xl">
						${{ formattedFinalPrice(product) }}
					</span>
				</template>
				<span v-else class="flex justify-center font-bold text-primary text-lg lg:text-xl">
					${{ formattedBasePrice(product) }}
				</span>
			</div>
		</NuxtLink>

		<div v-if="product.presentation.length > 0" class="flex justify-center mt-2">
			<select v-model="localSelectedPresentation" @change="updateSelectedPresentation" :class="presentationSelectClasses">
				<option class="mx-auto flex lg:mx-0" v-for="presentation in product.presentation" :key="presentation.id" :value="presentation">
					{{ presentation.flavour }}
				</option>
			</select>
		</div>

		<template v-if="isProductInStock(product)">
			<div class="mt-auto flex w-full flex-col items-center justify-center px-2 lg:flex-row lg:gap-1 lg:px-1 xl:gap-2">
				<label for="cantidad" hidden>Seleccioná la cantidad</label>

				<select :id="selectIdPrefix" v-model="localSelectedQuantity" @change="updateSelectedQuantity"
					class="my-1 flex h-7 w-full rounded-full border border-secondary/30 bg-white text-center text-sm tracking-wide lg:h-9 lg:w-24 focus:ring-1 focus:ring-secondary focus:border-secondary outline-none">
					<option v-for="n in 100" :key="n" :value="n" class="mx-auto flex lg:mx-0">
						{{ formatQuantity(n * product.unidad_venta, product.unidad) }}
					</option>
				</select>

				<button @click="handleAddToCart"
					class="my-2 flex h-8 w-full items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md transition-all duration-300 lg:h-9 lg:w-32 group gap-2">
					<span>Agregar</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
				</button>

				<div v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</div>
			</div>
		</template>
		<template v-else>
			<span class="my-auto flex justify-center text-gray-500 font-medium">Sin Stock 🕒</span>
		</template>
	</div>
</template>

<script>
export default {
	name: 'ProductCard',
	props: {
		product: {
			type: Object,
			required: true
		},
		config: {
			type: Object,
			required: true
		},
		selectIdPrefix: {
			type: String,
			default: 'cantidad'
		},
		feedbackMessage: {
			type: String,
			default: ''
		}
	},

	emits: ['add-to-cart', 'update-product'],

	data() {
		return {
			localSelectedQuantity: this.product.selectedQuantity || 1,
			localSelectedPresentation: this.product.selectedPresentation || (this.product.presentation.length > 0 ? this.product.presentation[0] : null)
		};
	},

	computed: {
		presentationSelectClasses() {
			const baseClasses = "mx-2 my-1 flex h-7 w-full rounded-full border border-slate-500 bg-white text-center text-sm tracking-wide lg:mb-0 lg:h-8";
			return this.selectIdPrefix === 'cantidadNuevos'
				? `${baseClasses} lg:mx-1 lg:w-[232px]`
				: `${baseClasses} lg:mx-5`;
		}
	},

	methods: {
		getProductDisplayName(product) {
			return product.presentation.length > 0 ? this.localSelectedPresentation.name : product.name;
		},

		shouldShowDiscountedPrice(product) {
			return product.discount > 0 || this.localSelectedQuantity > 4;
		},

		isProductInStock(product) {
			return (product.presentation.length === 0 && product.display) || (product.presentation.length > 0 && this.localSelectedPresentation.display);
		},

		formattedBasePrice(product) {
			return Intl.NumberFormat("es-AR").format(Math.ceil(this.basePrice(product) * this.localSelectedQuantity));
		},

		formattedFinalPrice(product) {
			let price = Math.floor(this.basePrice(product) * (1 - product.discount / 100) * this.localSelectedQuantity);
			return Intl.NumberFormat("es-AR").format(
				Math.floor(this.localSelectedQuantity > 4 ? price * (1 - this.config.descuento) : price)
			);
		},

		formatQuantity(value, unit) {
			if (unit === 'u') return `${value}`;
			if (unit === 'kg') return `${value} kg`;
			return value > 999 ? `${value / 1000} kg` : `${value} gr`;
		},

		getImage(product) {
			return `https://res.cloudinary.com/daid9xytm/image/upload/q_auto:good,f_auto,c_limit,w_300,h_224/v1740248697/${product.presentation.length > 0 ? this.localSelectedPresentation.image : product.image
				}.webp`;
		},

		basePrice(product) {
			return product.presentation.length > 0 ? this.localSelectedPresentation.price : product.price;
		},

		updateSelectedQuantity() {
			this.$emit('update-product', {
				productId: this.product.id,
				selectedQuantity: this.localSelectedQuantity,
				selectedPresentation: this.localSelectedPresentation
			});
		},

		updateSelectedPresentation() {
			this.$emit('update-product', {
				productId: this.product.id,
				selectedQuantity: this.localSelectedQuantity,
				selectedPresentation: this.localSelectedPresentation
			});
		},

		handleAddToCart() {
			const productToAdd = {
				...this.product,
				selectedQuantity: this.localSelectedQuantity,
				selectedPresentation: this.localSelectedPresentation
			};
			this.$emit('add-to-cart', productToAdd);
		}
	}
};
</script>
