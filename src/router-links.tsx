export const routerLinks = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    Home: '/',
    Techvn: '/cong-nghe',
    Techen: '/tech',
    Teamen: '/team',
    Teamvn: '/doi-nhom',
    Newsen: '/news',
    Newsvn: '/tin-tuc',
    Projectsen: '/projects',
    Projectsvn: '/du-an',
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    Auth: '/auth',
    Data: '/data',
    Post: '/post',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
