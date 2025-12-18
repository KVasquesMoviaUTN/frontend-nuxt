<template>
	<div
		class="relative m-1 flex flex-col rounded-2xl border border-secondary/20 bg-white p-1 shadow-sm lg:m-2 animate-pulse">
		<div class="flex flex-col flex-1">
			<!-- Product Image Skeleton -->
			<div class="my-1 flex items-center justify-center bg-gray-200 overflow-hidden rounded-lg h-24 lg:h-28 w-full">
			</div>

			<!-- Product Name Skeleton -->
			<div class="my-auto mx-auto mt-2 h-4 w-3/4 bg-gray-200 rounded"></div>

			<!-- Price Display Skeleton -->
			<div class="flex justify-center gap-2 mt-2">
				<div class="h-6 w-20 bg-gray-200 rounded"></div>
			</div>
		</div>

		<!-- Presentation Select Skeleton -->
		<div class="flex justify-center mt-2">
			<div class="mx-2 my-1 h-7 w-full rounded-full bg-gray-200 lg:mb-0 lg:h-8 lg:mx-5"></div>
		</div>

		<!-- Quantity and Button Skeleton -->
		<div class="mt-auto flex w-full flex-col items-center justify-center px-2 lg:flex-row lg:gap-1 lg:px-1 xl:gap-2">
			<div class="my-1 h-7 w-full rounded-full bg-gray-200 lg:h-9 lg:w-24"></div>
			<div class="my-2 h-8 w-full rounded-full bg-gray-200 lg:h-9 lg:w-32"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SkeletonProductCard'
}
</script>
