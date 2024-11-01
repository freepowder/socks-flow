const APP_CONFIG = {
  app: {
    title: 'Express REST server Socks Flow',
  },
  NodeEnv: (process.env.NODE_ENV ?? ''),
  port: (process.env.PORT ?? 4000),
};

export default APP_CONFIG;
