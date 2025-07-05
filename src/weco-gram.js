function zenkakuToHankaku(str) {
  return str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
}

function hankakuToZenkaku(str) {
  return str.replace(/[0-9]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 0xFEE0))
}

function parseWeight(weight) {
  const match = weight.match(/([０-９]+)(ｇ)$/);
  if (!match) {
    return null;
  }
  const value = parseInt(zenkakuToHankaku(match[1]));
  const unit = match[2];
  return value;
}

function parsePrice(price) {
  return parseInt(price.replace(',', ''));
}

function insertPricePerGram(carousel, pricePerGram) {
  const pricePerGramNumElement = document.createElement('span');
  pricePerGramNumElement.className = 'num';
  pricePerGramNumElement.textContent = `${hankakuToZenkaku(pricePerGram.toFixed())}`;

  const pricePerGramElement = document.createElement('span')
  pricePerGramElement.className = 'price_per_gram';
  pricePerGramElement.appendChild(document.createTextNode('【'));
  pricePerGramElement.appendChild(pricePerGramNumElement);
  pricePerGramElement.appendChild(document.createTextNode('円/100g】'));

  const weightElement = carousel.querySelector('.itm_type');
  if (weightElement) {
    weightElement.appendChild(pricePerGramElement);
  }
}

document.querySelectorAll('.carouselBox').forEach(carousel => {
  const name = carousel.querySelector('.itm_name')?.textContent?.trim();
  const weight = carousel.querySelector('.itm_type')?.textContent?.trim();
  const price = carousel.querySelector('.itm_price .price .num')?.textContent?.trim();

  if (!name || !weight || !price) {
    return;
  }

  console.log(carousel);
  console.log(`Name: ${name}, Weight: ${weight}, Price: ${price}`);

  const gram = parseWeight(weight);
  const priceValue = parsePrice(price);
  if (priceValue && gram) {
    const pricePerGram = priceValue / gram * 100; // 100gあたりの価格
    insertPricePerGram(carousel, pricePerGram);
  }
})

document.querySelectorAll('.itemDetailSet .txtArea').forEach(carousel => {
  console.log(carousel);
})
