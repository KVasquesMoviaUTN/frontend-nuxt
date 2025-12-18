export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login');
  }

  const role = authStore.user?.role;

  // Admin has full access
  if (role === 'admin') {
    return;
  }

  // Employee access
  if (role === 'employee') {
    // Allowed routes for employee
    if (to.path === '/admin/sales') {
      return;
    }
    // Block other admin/catalog routes
    if (to.path.startsWith('/admin') || to.path === '/catalog') {
      return navigateTo('/');
    }
  }

  // Default: Block restricted routes for non-privileged users
  if (to.path.startsWith('/admin') || to.path === '/catalog') {
    return navigateTo('/');
  }
});
