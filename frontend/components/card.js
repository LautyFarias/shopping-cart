class Card extends Component {
    constructor(title, image, price, slug) {
        super();
        this.template = `
            <div class="card">
                <img class="card-image" src="./assets/images/${image}" alt="${title}">
                <h4 class="card-title">${title}</h4>
                <div class="card-footer">
                    <p class="card-price">$ ${price}</p>
                    <a href="http://localhost:5000/${slug}" class="card-button">
                        Ver más
                    </a>
                </div>
            </div>`;
    }
}
