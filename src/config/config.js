// default config
module.exports = {
  workers: 1,
  maxClient: 10,
  strategies: {
    averageStrategy: {
      name: 'average',
      enable: true,
      level: 3
    },
    oldClientStrategy: {
      name: 'oldClient',
      enable: true,
      level: 4
    },
    tagAccuracyStrategy: {
      name: 'tagAccuracy',
      enable: true,
      level: 5
    }
  }
};
