const users = [
  {
    id: 'id',
    name: 'Артем',
    surName: 'Морозов',
    avatarUrl: `https://www.shareicon.net/data/128x128/2016/05/24/770039_man_512x512.png`,
    description: 'Mam ama criminal',
    age: 24,
    daysWithout: {
      alcohol: 15,
      cigarettes: 'never',
      parasiteWords: 0
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'dima',
    name: 'Дима',
    surName: 'Соколовский',
    avatarUrl: `https://www.google.by/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjuyqzxjJXeAhUNvxoKHSGKBLoQjRx6BAgBEAU&url=https%3A%2F%2Fwww.winhelponline.com%2Fblog%2Freplace-default-user-account-picture-avatar-windows-10%2F&psig=AOvVaw2CKwQNQjyuMbTcUYRga936&ust=1540127690599360`,
    description: 'Mam ama criminal',
    age: 29,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'timur',
    name: 'Тимур',
    surName: 'Соколовский',
    avatarUrl: `https://banner2.kisspng.com/20180402/bje/kisspng-computer-icons-avatar-login-user-avatar-5ac207e69ecd41.2588125315226654466505.jpg`,
    description: 'Mam ama criminal',
    age: 60,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'aliaksandrA',
    name: 'Саша',
    surName: 'Акулич',
    avatarUrl: `https://www.google.by/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjuyqzxjJXeAhUNvxoKHSGKBLoQjRx6BAgBEAU&url=https%3A%2F%2Fwww.winhelponline.com%2Fblog%2Freplace-default-user-account-picture-avatar-windows-10%2F&psig=AOvVaw2CKwQNQjyuMbTcUYRga936&ust=1540127690599360`,
    description: 'Mam ama criminal',
    age: 28,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'aliaksandrL',
    name: 'Саша',
    surName: 'Лобанов',
    avatarUrl: `https://www.shareicon.net/data/128x128/2016/05/24/770039_man_512x512.png`,
    description: 'Mam ama criminal',
    age: 23,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'aliaksandrD',
    name: 'Саша',
    surName: 'Добронравов',
    avatarUrl: `https://banner2.kisspng.com/20180402/bje/kisspng-computer-icons-avatar-login-user-avatar-5ac207e69ecd41.2588125315226654466505.jpg`,
    description: 'Mam ama criminal',
    age: 19,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'kirilrD',
    name: 'Кирил',
    surName: 'Лукъянов',
    avatarUrl: `https://www.shareicon.net/data/128x128/2016/05/24/770039_man_512x512.png`,
    description: 'Mam ama criminal',
    age: 19,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'maksP',
    name: 'Максим',
    surName: 'Подольский',
    avatarUrl: `https://banner2.kisspng.com/20180402/bje/kisspng-computer-icons-avatar-login-user-avatar-5ac207e69ecd41.2588125315226654466505.jpg`,
    description: 'Mam ama criminal (но это не точно)',
    age: 26,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'krisP',
    name: 'Кристина',
    surName: 'Пенякова',
    avatarUrl: `https://banner2.kisspng.com/20180403/pde/kisspng-child-computer-icons-avatar-user-avatar-5ac3a1f1da5b25.5067805715227704178944.jpg`,
    description: 'какое-то описание',
    age: 29,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  },
  {
    id: 'dashaP',
    name: 'Дарья',
    surName: 'Климова',
    avatarUrl: `https://banner2.kisspng.com/20180403/pde/kisspng-child-computer-icons-avatar-user-avatar-5ac3a1f1da5b25.5067805715227704178944.jpg`,
    description: 'какое-то описание',
    age: 26,
    daysWithout: {
      alcohol: 15,
      cigarettes: 0,
      parasiteWords: 0,
    },
    lastParasiteWordUsed: 'Sat Oct 20 2018 17:10:31 GMT+0300 (Moscow Standard Time)'
  }
];

module.exports = { users }
