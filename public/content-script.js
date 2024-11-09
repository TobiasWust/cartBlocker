const evilWords = [
  "wagen", "kaufen", "bestellen", "warenkorb", "kasse",
  "cart", "buy", "order", "checkout",
  "carrito", "comprar", "orden",
  "panier", "acheter", "commande",
  "carrello", "compra", "ordine",
  "carrinho", "comprar", "pedido",
  "wagen", "kopen", "bestel",
  "корзин", "купить", "заказ",
  "购物车", "购买", "订单",
  "カート", "購入", "注文",
  "عربة", "شراء", "طلب",
  "장바구니", "구매", "주문"
]

let evilElements = [];
const hostname = window.location.hostname;
let hidden = 0;

function hideElements() {
  evilElements.forEach(e => e.classList.add('cart-hopper-hidden'));
  chrome.runtime.sendMessage({ hidden });
}

function showElements() {
  evilElements.forEach(e => e.classList.remove('cart-hopper-hidden'));
  chrome.runtime.sendMessage({ hidden: 0 });
}

async function main() {
  hidden = 0;
  document.querySelectorAll('a, button, span, input').forEach((e) => {
    if (evilWords.some(word => e.textContent.toLowerCase().includes(word))) {
      evilElements.push(e);
      hidden++;
    }
  });

  chrome.storage.local.get(hostname).then((data) => {
    if (data[hostname]) {
      showElements();
    } else {
      hideElements();
    }
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'pageLoaded') {
    main();
    setTimeout(main, 3000); // for weird websites
    setTimeout(main, 5000); // for weird websites
  }
});

chrome.storage.onChanged.addListener((data) => {
  console.log({ data });
  if (data[hostname]) {
    if (data[hostname].newValue === 'deactivated') {
      showElements();
    } else if (data[hostname].newValue === 'paused') {
      showElements();
      chrome.runtime.sendMessage({ action: 'setTimer', hostname });
    } else {
      hideElements();
      chrome.runtime.sendMessage({ action: 'clearTimer' });
    }
  }
});
