const evilWords = [
  "wagen", "kaufen", "bestellen",
  "cart", "buy", "order",
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

// console log number of elements hidden
let hidden = 0;
document.querySelectorAll('a, button, span, input').forEach((e) => {
  if (evilWords.some(word => e.textContent.toLowerCase().includes(word))) {
    e.style.display = 'none';
    hidden++;
  }
})

chrome.runtime.sendMessage({ hidden });
