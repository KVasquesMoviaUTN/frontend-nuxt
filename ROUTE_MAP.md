# Route Mapping: Vue to Nuxt 3

This document validates that the URL structure of the new Nuxt 3 application matches the original Vue application 100%, ensuring SEO preservation.

| Old Route Pattern (Vue) | New Nuxt File Path | Resulting URL | Status |
| :--- | :--- | :--- | :--- |
| `/` | `pages/index.vue` | `/` | ✅ Parity |
| `/catalog` | `pages/catalog.vue` | `/catalog` | ✅ Parity |
| `/cart` | `pages/cart.vue` | `/cart` | ✅ Parity |
| `/mercado-pago` | `pages/mercado-pago.vue` | `/mercado-pago` | ✅ Parity |
| `/admin/sales` | `pages/admin/sales.vue` | `/admin/sales` | ✅ Parity |
| `/admin/statistics` | `pages/admin/statistics.vue` | `/admin/statistics` | ✅ Parity |
| `/admin/employees` | `pages/admin/employees.vue` | `/admin/employees` | ✅ Parity |
| `/login` | `pages/login.vue` | `/login` | ✅ Parity |
| `/sso-callback` | `pages/sso-callback.vue` | `/sso-callback` | ✅ Parity |
| `/about` | `pages/about.vue` | `/about` | ✅ Parity |
| `/contact` | `pages/contact.vue` | `/contact` | ✅ Parity |
| `/register` | `pages/register.vue` | `/register` | ✅ Parity |
| `/product/:id` | `pages/product/[id].vue` | `/product/:id` | ✅ Parity |
| `/:pathMatch(.*)*` | `pages/[...slug].vue` | (Catch-all 404) | ✅ Parity |

## Notes
- **Dynamic Routes**: The `[id]` syntax in Nuxt 3 corresponds exactly to `:id` in Vue Router.
- **Layouts**: The original `AppLayout` is replaced by `layouts/default.vue`, which wraps all pages, maintaining the same visual structure.
- **Query Parameters**: Handled natively by `useRoute().query` in both frameworks, requiring no path changes.
