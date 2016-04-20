var client = require('cheerio-httpcli');
var config = require('./config');

// GoogleChromeのUser-Agentに変更

console.info('広場TOPにアクセス');
client.fetch(config.URLS.TOP)
.then(function (result) {
  console.info('ログインリンクをクリックして遷移');
  return result.$('#btn_login').click();
})
.then(function (result) {
  console.info('ログインフォームを送信');
  return result.$('#loginForm').submit(config.LOGIN_INFO);
})
.then(function (result) {
  console.info('メインフォームを送信して遷移');
  return result.$('form[name=mainForm]').submit();
})
.then(function (result) {
  console.info('キャラクター選択をクリックして遷移');
  return result.$('#welcome_box').find('a').click();
})
.then(function (result) {
  console.info('りんのcidを指定して遷移');
  return result.$('form[name=loginActionForm]').submit({
  	cid: config.CID
  });
})
.then(function (result) {
  console.info('検索ページに遷移');
  return client.fetch(config.URLS.BAZZAR_KESSHO)
})
.then(function (result) {
  var price = result.$('.bazaarTable tr .unit_price').get(1).children[0].data;
  price = price.match(/[a-zA-Z0-9,]/g).join(''); //hello
  console.log(price);
})
.catch(function (err) {
	console.log(err);
})
.finally(function () {
  // 処理完了でもエラーでも最終的に必ず実行される
});
