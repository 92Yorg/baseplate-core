import times from 'lodash/times';

module.exports = (count, block) => times(count, i => block.fn(i)).join(' ');
