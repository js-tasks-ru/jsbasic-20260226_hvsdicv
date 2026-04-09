import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.#render();
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    for (let key in this.filters) {
      if (this.filters[key] === "" || this.filters[key] === undefined) {
        delete this.filters[key];
      }
    }

    this.#render();
  }

  #filterProducts() {
    return this.products.filter((product) => {
      if (this.filters.noNuts && product.nuts) {
        return false;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        return false;
      }

      if (this.filters.maxSpiciness !== undefined) {
        const spiciness =
          product.spiciness !== undefined ? product.spiciness : 0;
        if (spiciness > this.filters.maxSpiciness) {
          return false;
        }
      }

      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }

      return true;
    });
  }

  #render() {
    const filteredProducts = this.#filterProducts();
    const inner = this.elem.querySelector(".products-grid__inner");
    inner.innerHTML = "";

    filteredProducts.forEach((product) => {
      const card = new ProductCard(product);
      inner.append(card.elem);
    });
  }
}
