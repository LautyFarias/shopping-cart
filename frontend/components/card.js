class Card extends Component {
    constructor(title, image, price, slug) {
        super();
        this.template = `
            <div class="card">
                <img class="card-image" src="./assets/images/${image}" alt="${title}">
                <h4 class="card-title">${title}</h4>
                <div class="card-footer">
                    <p class="card-price">$ ${price}</p>
                    <button onclick="redirect('${slug}')" class="card-button">
                        Ver más
                    </button>
                </div>
            </div>`;
    }
}
