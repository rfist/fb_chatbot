const menu = {
  type: 'template',
  payload: {
    template_type: 'generic',
    elements: [
      {
        title: 'Main Menu',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Facebook_Messenger_logo.svg/1200px-Facebook_Messenger_logo.svg.png',
        subtitle: 'Chatbot menu',
        buttons: [
          {
            type: 'postback',
            title: 'My purchases',
            payload: 'purchases',
          },
          {
            type: 'postback',
            title: 'Shop',
            payload: 'shop',
          },
          {
            type: 'postback',
            title: 'Favorites',
            payload: 'favorites',
          },
        ],
      },
      {
        title: 'User Menu',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Facebook_Messenger_logo.svg/1200px-Facebook_Messenger_logo.svg.png',
        buttons: [
          {
            type: 'postback',
            title: 'To invite a friend',
            payload: 'invite',
          },
        ],
      },
    ],
  },
};
module.exports = menu;
