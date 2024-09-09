import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Dashboard',
    path: '/',
    icon: 'mingcute:home-1-fill',
    active: true,
  },
  {
    id: 'detail',
    subheader: 'IP Detail',
    path: '/detail',
    icon: 'mingcute:world-2-fill',
    active: true,
  },
  {
    id: 'cve',
    subheader: 'Discovered CVEs',
    path: '/detail',
    icon: 'mingcute:warning-fill',
    active: true,
  },
  {
    id: 'users',
    subheader: 'Users',
    path: '#!',
    icon: 'mingcute:user-2-fill',
  },
  {
    id: 'authentication',
    subheader: 'Authentication',
    icon: 'mingcute:safe-lock-fill',
    items: [
      {
        name: 'Login',
        pathName: 'login',
        path: paths.login,
      },
    ],
  },
  {
    id: 'account-settings',
    subheader: 'Devin Overington',
    path: '#!',
  },
];

export default sitemap;
