const Dimensions = require('Dimensions');
const totalWidth = Dimensions.get('window').width;

export default {
  FEED_CARD: {
    width: 345,
    height: 194,
  },
  DETAIL_BANNER_BACKGROUND: {
    width: 374,
    height: 293,
  },
  DETAIL_BANNER_ICON: {
    width: 70,
    height: 70,
  },
  DETAIL_CONTENT_IMG: {
    width: 135,
    height: 240,
  },
  DETAIL_RECO_ICON: {
    width: 59,
    height: 59,
  },
  RANK_ICON: {
    width: 59,
    height: 59,
  },
  HALL_SWIPER: {
    width: totalWidth,
    height: 140,
  },
  HALL_ICON: {
    width: 66,
    height: 66,
  },
  HALL_BIG_BANNER: {
    width: totalWidth,
    height: 84,
  },
  HALL_SMALL_BANNER: {
    width: 168,
    height: 84,
  },
}