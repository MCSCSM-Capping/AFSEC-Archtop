export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pagesRoot}/dashboard`,
  detail: `/${rootPaths.pagesRoot}/detail`,
  cve: `/${rootPaths.pagesRoot}/cve`,
  users: `/${rootPaths.pagesRoot}/users`,
  settings: `/${rootPaths.pagesRoot}/settings`,
  templatePages: `/${rootPaths.pagesRoot}/template-pages`,
  accountSettings: `/${rootPaths.pagesRoot}/account-settings`,

  login: `/${rootPaths.authRoot}/login`,
  comingSoon: `/coming-soon`,
  404: `/${rootPaths.errorRoot}/404`,
};
