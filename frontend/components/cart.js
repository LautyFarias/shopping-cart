class Cart {
    get items() {
        return this.cart.items;
    }
    set items(items) {
        this.cart.items = items;
    }
    render() {
        let carts = document.querySelectorAll('.cart');
        carts.forEach(cart => {
            cart.parentNode.removeChild(cart);
        });

        this.cartDiv = document.createElement('div');
        this.cartDiv.classList.add('cart');

        this.cartDiv.button = document.createElement('button');
        this.cartDiv.button.classList.add('button', 'purchase-button');
        this.cartDiv.button.addEventListener('click', async () => {
            const { value: email } = await Swal.fire({
                title: '<h3>One more step...</h3>',
                input: 'email',
                inputLabel: 'Your email address',
                inputPlaceholder: 'Enter your email address',
                confirmButtonText: 'Purchase!',
                confirmButtonColor: 'var(--hard-red)',
                focusConfirm: false,
            });

            if (email) {
                const spinner = new Spinner().spin(document.getElementById('container')),
                    spinnerBackground = document.createElement('div');
                spinnerBackground.classList.add("spinner-background");
                document.getElementById('container').appendChild(spinnerBackground);

                let mail_response = await fetch("https://smart-cart-api.herokuapp.com/api/mail/send", {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        items: this.items
                    })
                });
                mail_response = await mail_response.json();

                spinner.stop();

                if (mail_response.response == true) {
                    await Swal.fire('Mail send!', '', 'success');
                } else {
                    await Swal.fire('Ups... Error :(', '', 'error');
                }

                spinnerBackground.parentNode.removeChild(spinnerBackground);

                this.clear();
            }
        });
        this.cartDiv.button.appendChild(document.createTextNode("Purchase!"));

        if (this.cartCards && this.cartCards.length > 0) {
            this.cartDiv.appendChild(this.cartDiv.button);
            this.cartCards.forEach(cartCard => this.cartDiv.appendChild(cartCard.render()));
        } else {
            this.cartDiv.innerHTML = "Buy something!!";
        }

        document.getElementById('container').appendChild(this.cartDiv);
    }
    add(item) {

        let repeated, repeatedStorage, repeatedProduct = {};

        if (this.cartCards && this.cartCards.length > 0) {
            this.cartCards.forEach(cartCard => {
                if (cartCard.title.textContent == item.name) {
                    repeated = true;
                    cartCard.stock = item.stock;
                }
            });
        }

        let cartStorage = JSON.parse(sessionStorage.getItem('cart'));
        if (cartStorage) {
            repeatedStorage = cartStorage.items.some((elem, index) => {
                repeatedProduct.elem = elem;
                repeatedProduct.index = index;
                return item.name === elem.name;
            });

            if (repeatedStorage && repeatedProduct.elem.stock != item.stock) {
                cartStorage.items[repeatedProduct.index] = item;
                sessionStorage.setItem('cart', JSON.stringify(cartStorage));
            }
        }

        if (!repeated) {

            if (!cartStorage || !repeatedStorage) {
                this.cart.items.push(item);
                sessionStorage.setItem('cart', JSON.stringify({ 'items': this.items }));
            }

            let cartCard = new CartCard(item.name, item.price, item.stock, item.image);
            this.cartCards.push(cartCard);

            this.cartDiv.insertBefore(cartCard.render(), this.cartDiv.firstChild);
            cart.render();
        }
    }
    clear() {
        sessionStorage.removeItem('cart');
        delete this.items;
        this.cartCards.forEach(cartCard => {

            this.cartDiv.removeChild(cartCard.card);
        });
        this.cartCards = [];
    }
}

const cart = new Cart();
cart.render();

cart.cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : { 'items': [] };
cart.cartCards = [];

if (cart.items.length > 0) {
    cart.items.forEach(item => {
        cart.add(item);
    });
}
