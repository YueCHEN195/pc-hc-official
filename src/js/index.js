//引入css
import "@less/global";
import "@less/index";

$(window).resize(() => {
  const width = $(document.body).width();
  if (width > 1440) {
    $('.banner').height(width / 2.2);
    $('.banner-inside-title').width(width / 2);
    $('.banner-inside-title').height(width / 13);
  }
});