
const routes = [
  {
    path: '/',
    redirect: '/docs'
  },
  {
    path: '/docs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/icons',
    component: () => import('layouts/IconsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Icons.vue') }
    ]
  },
  {
    path: '/examples',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Examples.vue') }
    ]
  },
  {
    path: '/demo',
    component: () => import('layouts/IconPickerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IconPicker.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes