fetchProductDetail = (slug) => {
    fetch(`https://smart-cart-api.herokuapp.com/api/products/${slug}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => !data ? "Product not found, sorry!" : `
            <div class="product-view-data">
            <div class="return-button" onclick="redirect('')">
                <i class="fas fa-chevron-circle-left icon-chevron-circle-left"></i>
            </div>
            <hr/><h2 class="product-view-title">${data.name}</h2><hr/>
                <img class="product-view-image" src="./assets/images/${data.image}" alt="${data.slug}">
                <div class="product-view-footer">
                    <p class="product-view-price">$ ${data.price}</p>
                    <i onclick="stock(-1)" class="fas fa-caret-left icon-caret-left"></i>
                    <p id="product-view-stock" class="product-view-stock"> 1 </p>
                    <i onclick="stock(1)" class="fas fa-caret-right icon-caret-right"></i>
                </div>
            </div>
            <div class="product-view-buttons">
                <button class="button purchase-button">Purchase</button>
                <button onclick="addToCart()" class="button add-to-cart-button">Add to cart...</button>
                <p class="add-to-cart-text">and continue browsing!</p>
            </div>`)
        .then(processedData => {
            const productDetailDiv = document.createElement('div');
            productDetailDiv.id = 'product-detail';
            productDetailDiv.innerHTML = processedData;
            return productDetailDiv;
        })
        .then(element => {
            document.getElementById('container').appendChild(element);
        });
};