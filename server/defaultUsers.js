const mockAvatar = require('./mock-avatar.js')

const users = [
  {
    id: 'id',
    name: 'Artsiom',
    surName: 'Marozau',
    avatarUrl: mockAvatar,
    description: 'Mam ama criminal',
    age: 24,
    daysWithout: {
      alcohol: 15,
      cigarettes: 'never',
      parasiteWords: 0
    },
    lastParasiteWordUsed: null
  },
  {
    id: 'dima',
    name: 'Dima',
    surName: 'Sokolovski',
    avatarUrl: mockAvatar,
    description: 'Mam ama criminal',
    age: 29,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: null
  }
];

module.exports = { users }
