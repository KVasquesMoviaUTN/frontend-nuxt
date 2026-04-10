<template>
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-primary">Agregar Nuevo Producto</h1>
			<p class="text-gray-500 mt-2">Ingrese los detalles básicos del producto para añadirlo al catálogo.</p>
		</div>

		<form @submit.prevent="submitProduct" class="bg-white p-6 rounded-xl shadow-md border border-gray-100 space-y-6">

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Nombre del Producto *</label>
					<input v-model="form.name" required type="text"
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
						placeholder="Ej. Whey Protein">
				</div>

				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Categoría</label>
					<input v-model="form.category" type="text"
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
						placeholder="Ej. Suplementos">
				</div>

				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Precio de Venta ($) *</label>
					<input v-model.number="form.price" required min="1" type="number"
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
						placeholder="0">
				</div>

				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Costo de Compra ($)</label>
					<input v-model.number="form.purchase_price" min="0" type="number"
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
						placeholder="0">
				</div>

				<div class="space-y-2">
					<label class="block text-sm font-medium text-gray-700">Stock Inicial</label>
					<input v-model.number="form.stock" min="0" type="number"
						class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
						placeholder="0">
				</div>

				<div class="space-y-2 flex items-center pt-8">
					<label class="flex items-center space-x-3 cursor-pointer">
						<input type="checkbox" v-model="form.display" class="form-checkbox h-5 w-5 text-secondary rounded border-gray-300">
						<span class="text-sm font-medium text-gray-700">Mostrar en Catálogo</span>
					</label>
				</div>
			</div>

			<div class="space-y-2">
				<label class="block text-sm font-medium text-gray-700">Descripción</label>
				<textarea v-model="form.description" rows="3"
					class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none"
					placeholder="Descripción del producto..."></textarea>
			</div>

			<div class="border-t border-gray-100 pt-6">
				<button type="submit" :disabled="processing"
					class="w-full md:w-auto px-8 py-3 bg-secondary text-white font-bold rounded-xl shadow-md hover:bg-secondary/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all outline-none disabled:opacity-50 flex items-center justify-center gap-2">
					<svg v-if="processing" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
						</path>
					</svg>
					<span v-else>Guardar Producto</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

definePageMeta({
	middleware: ['auth']
});

const configRuntime = useRuntimeConfig();
const apiBase = configRuntime.public.apiBase;
const authStore = useAuthStore();

const processing = ref(false);

const initialForm = {
	name: '',
	category: '',
	price: null,
	purchase_price: null,
	stock: 0,
	display: true,
	description: ''
};

const form = ref({ ...initialForm });

const submitProduct = async () => {
	if (!form.value.name || !form.value.price) {
		alert("Por favor ingrese el nombre y el precio de venta del producto.");
		return;
	}

	processing.value = true;
	try {
		await $fetch(`${apiBase}/products`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${authStore.token}`
			},
			body: {
				name: form.value.name,
				price: form.value.price,
				category: form.value.category || undefined,
				purchase_price: form.value.purchase_price || undefined,
				stock: form.value.stock || 0,
				display: form.value.display,
				description: form.value.description || undefined,
			}
		});

		alert(`Producto "${form.value.name}" creado exitosamente.`);
		form.value = { ...initialForm };
	} catch (error) {
		console.error("Error creating product:", error);
		alert('Error al crear el producto. Verifique los datos o sus permisos de administrador e intente nuevamente.');
	} finally {
		processing.value = false;
	}
}
</script>
