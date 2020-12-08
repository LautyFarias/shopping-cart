class CartCard {
    get stock() {
        return this.card.stock.innerText;
    }
    set stock(stock) {
        this.card.stock.innerText = stock;
    }
    constructor(name, price, stock, image) {
        this.card = document.createElement('div');
        this.card.classList.add('cart-card');

        this.card.dataDiv = document.createElement('div');
        this.card.dataDiv.classList.add('cart-card-data');

        this.card.image = document.createElement('img');
        this.card.image.classList.add('cart-card-image');
        this.card.image.src = image;

        this.card.removeButton = document.createElement('p');
        this.card.removeButton.classList.add('cart-card-remove-button');
        this.card.removeButton.innerText = 'X';
        this.card.removeButton.addEventListener('click', () => {
            this.card.parentNode.removeChild(this.card);

            cart.items.forEach((item, index) => {
                if(item.name === this.title.textContent) cart.items.splice(index, 1);
            });

            cart.cartCards.forEach((item, index) => {
                if(item.title.textContent === this.title.textContent) cart.cartCards.splice(index, 1);
            });

            sessionStorage.setItem('cart', JSON.stringify({"items": cart.items}));
        });
        this.card.dataDiv.appendChild(this.card.removeButton);

        this.title = document.createElement('p');
        this.title.classList.add('cart-card-title');
        this.title.appendChild(document.createTextNode(name));
        this.card.dataDiv.appendChild(this.title);

        this.card.price = document.createElement('p');
        this.card.price.classList.add('cart-card-price');
        this.card.price.appendChild(
            document.createTextNode(
                `$ ${parseInt(price) * parseInt(stock)}`
            ));
        this.card.dataDiv.appendChild(this.card.price);

        this.card.stock = document.createElement('p');
        this.card.stock.classList.add('cart-card-stock');
        this.card.stock.innerText = `quantity: ${stock}`;
        this.card.dataDiv.appendChild(this.card.stock);
    }
    render() {
        this.card.appendChild(this.card.image);
        this.card.appendChild(this.card.dataDiv);

        return this.card;
    }
}