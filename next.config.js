module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/formulas',
        permanent: true,
      },
    ];
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};
