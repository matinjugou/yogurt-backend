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
  },
  secreteKey: '1!@#$Fff56GSG1oaiohf13r;./,adaf,asdf,f1[4'
};
