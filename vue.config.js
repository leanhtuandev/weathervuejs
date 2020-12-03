module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://github.com/leanhtuandev/weathervuejs.git' // Thay tên repository của các bạn vào đây nhé
      : '/'
  }