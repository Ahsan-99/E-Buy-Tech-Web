// imageData.js
const images = {
    1: 'https://m.media-amazon.com/images/I/71yzJoE7WlL._SL1500_.jpg',
    2: 'https://m.media-amazon.com/images/I/718LuUVEOZL._AC_SL1500_.jpg',
    3: 'https://m.media-amazon.com/images/I/61IbLL4YJPL._AC_SL1500_.jpg',
    4: 'https://m.media-amazon.com/images/I/711F6T6aySL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    5: 'https://hamariweb.com/images/MobilePhones/vivo-x90-pro.jpg',
    6: 'https://m.media-amazon.com/images/I/611PsBljQ8L._AC_SL1500_.jpg',
    7: 'https://m.media-amazon.com/images/I/71lH0NfBImL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    8: 'https://m.media-amazon.com/images/I/61y8ZqM0vvL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    9: 'https://m.media-amazon.com/images/I/61f3V3m9xnL._AC_SL1500_.jpg',
    10: 'https://m.media-amazon.com/images/I/61xunOpkIrL._AC_SX679_.jpg',
    11: 'https://m.media-amazon.com/images/I/71hsuRTQ29L.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    12: 'https://m.media-amazon.com/images/I/41LMF7AU30L._SX300_SY300_QL70_FMwebp_.jpg',
    13: 'https://m.media-amazon.com/images/I/61VSeC3U7AL._AC_SY300_SX300_.jpg',
    14: 'https://pk.pro.infinixmobility.com/media/catalog/product/cache/10f519365b01716ddb90abc57de5a837/x/6/x6820_zeroultra_base1_1_1.png',
    15: 'https://m.media-amazon.com/images/I/41dkuyO9q9L.__AC_SX300_SY300_QL70_FMwebp_.jpg',

    //Laptops

    16: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg',
    17: 'https://m.media-amazon.com/images/I/710EGJBdIML._AC_SL1500_.jpg',
    18: 'https://m.media-amazon.com/images/I/81uVijGMylL._AC_SX679_.jpg',
    19: 'https://m.media-amazon.com/images/I/71zNU5UBINL._AC_SX679_.jpg',
    20: 'https://m.media-amazon.com/images/I/41Q6CG25RzL._AC_.jpg',
    21: 'https://m.media-amazon.com/images/I/61lYDihIxqL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    22: 'https://m.media-amazon.com/images/I/61EeooTh3IL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    23: 'https://m.media-amazon.com/images/I/71kBeFDgCkL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    24: 'https://m.media-amazon.com/images/I/61uiNMRsiOL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    25: 'https://m.media-amazon.com/images/I/81inFqt1MiL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    26: 'https://m.media-amazon.com/images/I/71xZUkl5dyL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    27: 'https://m.media-amazon.com/images/I/51AfwdQaZVL.__AC_SY300_SX300_QL70_FMwebp_.jpg',
    28: 'https://m.media-amazon.com/images/I/71BdtphJWPL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    29: 'https://m.media-amazon.com/images/I/61t1X5eEaRL._AC_SL1000_.jpg',
    30: 'https://m.media-amazon.com/images/I/619dIEKft6L.__AC_SX300_SY300_QL70_FMwebp_.jpg',

    // tablet
    
    31: 'https://m.media-amazon.com/images/I/81gC7frRJyL._SL1500_.jpg',
    32: 'https://m.media-amazon.com/images/I/51jtT3IOwrL.__AC_SY300_SX300_QL70_FMwebp_.jpg',
    33: 'https://m.media-amazon.com/images/I/510WsB778+L._AC_SY300_SX300_.jpg',
    34: 'https://m.media-amazon.com/images/I/51HntqUXMqL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    35: 'https://m.media-amazon.com/images/I/61uZ3HMyy0L.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    36: 'https://m.media-amazon.com/images/I/41lBPh4GYFL._AC_SX679_.jpg',
    37: 'https://m.media-amazon.com/images/I/61EfgCU1k7L._AC_SY300_SX300_.jpg',
    38: 'https://m.media-amazon.com/images/I/51ut+xwGtnL._AC_SY300_SX300_.jpg',
    39: 'https://m.media-amazon.com/images/I/614ofbAkWxL._SX679_.jpg',
    40: 'https://m.media-amazon.com/images/I/71nJxwi2gYL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    41: 'https://m.media-amazon.com/images/I/71ey-9D8yDL.__AC_SY445_SX342_QL70_FMwebp_.jpg',
    42: 'https://m.media-amazon.com/images/I/91pjZAMbEUS.__AC_SY300_SX300_QL70_FMwebp_.jpg',
    43: 'https://m.media-amazon.com/images/I/71n4-oC4j0L.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    44: 'https://m.media-amazon.com/images/I/51GwFZTvLtL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    45: 'https://m.media-amazon.com/images/I/716DaRh4tfL.__AC_SY300_SX300_QL70_FMwebp_.jpg',

    // Add other image links here
  };
  
  export default images;
  