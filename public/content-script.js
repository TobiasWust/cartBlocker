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

let hidden = 0;
let evilElements = [];
let timeoutTimer;

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
  if (state === null) {
    hideElements();
  }
  chrome.runtime.sendMessage({ hidden });
}

main();
setTimeout(main, 3000); // for weird websites

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'pause') {
    showElements();
    setHostState(request.hostname, 'paused')
    timeoutTimer = setTimeout(() => {
      hideElements();
      setHostState(request.hostname, null)
    }, 10000);
    // }, 600000);
  }
  if (request.action === 'resume') {
    if (timeoutTimer) clearTimeout(timeoutTimer);
    hideElements();
    setHostState(request.hostname, null)
  }
  if (request.action === 'deactivated') {
    showElements();
    setHostState(request.hostname, 'deactivated')
  }
  if (request.action === 'pageLoaded') {
    main();
    setTimeout(main, 3000); // for weird websites
  }
});
