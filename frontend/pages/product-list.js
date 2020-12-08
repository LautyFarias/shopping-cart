fetchProductList = () => {
    fetch('https://smart-cart-api.herokuapp.com/api/products', { method: 'GET' })
        .then(res => res.json())
        .then(data => !data ? "Our catalog is empty, sorry!" : data.map(
            element => new Card(element.name, element.image, element.price, element.slug).template
        ))
        .then(processedData => {
            const productListDiv = document.createElement('div');
            productListDiv.id = 'product-list';
            productListDiv.innerHTML = processedData.join('');
            return productListDiv;
        })
        .then(element => {
            document.getElementById('container').appendChild(element);
        });
}