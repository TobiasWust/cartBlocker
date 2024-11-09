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

function hideElements() {
  evilElements.forEach(e => e.classList.add('cart-hopper-hidden'));
}

function showElements() {
  evilElements.forEach(e => e.classList.remove('cart-hopper-hidden'));
}

function setHostState(host, state) {
  chrome.storage.local.set({ [host]: state });
}

async function getState() {
  const hostname = window.location.hostname;
  if (!hostname) return;
  const data = await chrome.storage.local.get(hostname)
  return data[hostname]
}

async function main() {
  let hidden = 0;
  document.querySelectorAll('a, button, span, input').forEach((e) => {
    if (evilWords.some(word => e.textContent.toLowerCase().includes(word))) {
      evilElements.push(e);
      hidden++;
    }
  })
  const state = await getState();
  if (!state) hideElements();
  chrome.runtime.sendMessage({ hidden });
}

main();
setTimeout(main, 3000); // for weird websites
setTimeout(main, 5000); // for weird websites

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'pause') {
    showElements();
    chrome.runtime.sendMessage({ action: 'startTimer' });
    setHostState(hostname, 'paused')
  }
  if (request.action === 'resume') {
    hideElements();
    chrome.runtime.sendMessage({ action: 'clearTimer', host: hostname });
  }
  if (request.action === 'deactivated') {
    showElements();
    setHostState(hostname, 'deactivated')
  }
  if (request.action === 'pageLoaded') {
    main();
    setTimeout(main, 3000); // for weird websites
    setTimeout(main, 5000); // for weird websites
  }
});
