module.exports = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.json'),
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  title: 'Backend Development',
  tagline: 'Backend Development',
  url: 'https://backend-dev.netlify.app',
  baseUrl: '/',
  organizationName: 'amckinney',
  projectName: 'backend-dev',
  favicon: 'img/favicon.ico',
  themeConfig: {
    navbar: {
      title: 'Backend Development',
      logo: {
        alt: 'Backend Development Logo',
        src: 'img/logo.png',
        href: 'https://backend-dev.netlify.app',
        target: '_self',
      },
    },
    image: 'img/logo.png',
    sidebarCollapsible: false,
    colorMode: {
      disableSwitch: true,
    },
    prism: {
      theme: require('prism-react-renderer/themes/duotoneLight'),
    },
  },
};
