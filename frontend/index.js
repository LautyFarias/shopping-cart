if (location.pathname && location.pathname != "/") {
    if (sessionStorage.getItem('product') !== location.pathname.split('/')[1]) sessionStorage.setItem('product', location.pathname.split('/')[1]);
    fetchProductDetail(sessionStorage.getItem('product'));
}

if (!location.pathname || location.pathname == "/") {
    fetchProductList();
}

const redirect = (slug) => {
    sessionStorage.setItem('product', slug);
    location.pathname = '/' + slug;
};

const stock = (stock) => {
    const stockView = document.getElementById('product-view-stock');
    stockView.innerHTML = (
        (parseInt(stockView.innerHTML) + parseInt(stock)) > 0 ?
            parseInt(stockView.innerHTML) + parseInt(stock) :
            stockView.innerHTML
    );
};

const addToCart = () => {
    let name = document.querySelector('.product-view-title').textContent,
        image = document.querySelector('.product-view-image').src,
        price = document.querySelector('.product-view-price').textContent,
        stock = document.querySelector('.product-view-stock').textContent,
        data = {
            name: name,
            price: price.split(' ')[1],
            image: image,
            stock: stock
        };
    cart.add(data);
};

(() => {
    const cartButton = document.getElementById('cart-button');
    cartButton.addEventListener('click', () => {
        let cartDiv = document.querySelector('.cart');
        cartDiv.classList.add('visible');
    });
    document.getElementById('container').addEventListener('click', event => {
        let target = event.target;
        let cartDiv = document.querySelector('.cart');
        if (target !== cartDiv &&
            !cartDiv.contains(target) &&
            target !== cartButton) cartDiv.classList.remove('visible');
    });
})();