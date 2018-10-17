const { PAGE_NAME } = process.env;
const generateRef = () => Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15) + new Date().valueOf();

const generateGreetings = () => ({
  type: 'template',
  payload: {
    template_type: 'generic',
    elements: [
      {
        title: 'Greetings!',
        subtitle: 'Look to Up and enjoy',
        buttons: [
          {
            type: 'postback',
            title: 'More',
            payload: 'more',
          },
        ],
      },
    ],
  },
});

const generateMenu = ref => ({
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
        title: 'To invite a friend',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Facebook_Messenger_logo.svg/1200px-Facebook_Messenger_logo.svg.png',
        default_action: {
          type: 'web_url',
          url: `http://m.me/${PAGE_NAME}?ref=${ref}`,
        },
        buttons: [
          {
            type: 'element_share',
            share_contents: {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'generic',
                  elements: [
                    {
                      title: "I've found amazing bot!",
                      image_url: 'https://vignette.wikia.nocookie.net/en.futurama/images/f/f6/Professor-farnsworth.jpg/revision/latest?cb=20120226073833',
                      default_action: {
                        type: 'web_url',
                        url: `http://m.me/${PAGE_NAME}?ref=${ref}`,
                      },
                      buttons: [
                        {
                          type: 'web_url',
                          url: `http://m.me/${PAGE_NAME}?ref=${ref}`,
                          title: 'Check it out!',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    ],
  },
});

module.exports = {
  generate: () => {
    const ref = generateRef();
    return [generateMenu(ref), ref];
  },
  greetings: generateGreetings,
};
