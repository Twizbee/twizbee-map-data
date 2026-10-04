// Auto-generated USA Map Data Index
module.exports = {
  states: require('./states.json'),
  getStateData: (abbr) => {
    try {
      return require('./states/' + abbr.toUpperCase() + '.json');
    } catch (e) {
      return null;
    }
  },
  getSearchIndex: () => require('./search-index.json')
};
