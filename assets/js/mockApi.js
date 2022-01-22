function simulateAsyncCall(request) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (request.method) {
        case 'get':
          const user = 'test'
          if (user) {
            resolve({ status: 200, posts: user.posts });
          } else {
            resolve({ status: 404, message: 'Not Found' });
          }
          break;
        case 'post':
          resolve({ status: 200, message: 'Added Post' });
          break;
        default:
          reject({ status: 400, message: 'Bad Request' });
      }
    }, 300);
  });
}
