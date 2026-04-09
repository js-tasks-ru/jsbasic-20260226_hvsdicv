import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    const carouselHolder = document.querySelector("[data-carousel-holder]");
    const carousel = new Carousel(slides);
    carouselHolder.append(carousel.elem);

    const ribbonHolder = document.querySelector("[data-ribbon-holder]");
    const ribbonMenu = new RibbonMenu(categories);
    ribbonHolder.append(ribbonMenu.elem);

    const sliderHolder = document.querySelector("[data-slider-holder]");
    const stepSlider = new StepSlider({ steps: 5, value: 3 });
    sliderHolder.append(stepSlider.elem);

    const cartIconHolder = document.querySelector("[data-cart-icon-holder]");
    const cartIcon = new CartIcon();
    cartIconHolder.append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    const response = await fetch("products.json");
    this.products = await response.json();

    const productsGridHolder = document.querySelector(
      "[data-products-grid-holder]",
    );
    productsGridHolder.innerHTML = "";
    const productsGrid = new ProductsGrid(this.products);
    productsGridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value,
    });

    document.body.addEventListener("product-add", (event) => {
      const productId = event.detail;
      const product = this.products.find((p) => p.id === productId);
      if (product) {
        cart.addProduct(product);
      }
    });

    document.body.addEventListener("slider-change", (event) => {
      productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    document.body.addEventListener("ribbon-select", (event) => {
      productsGrid.updateFilter({ category: event.detail });
    });

    document
      .getElementById("nuts-checkbox")
      .addEventListener("change", (event) => {
        productsGrid.updateFilter({ noNuts: event.target.checked });
      });

    document
      .getElementById("vegeterian-checkbox")
      .addEventListener("change", (event) => {
        productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
      });

    this.carousel = carousel;
    this.ribbonMenu = ribbonMenu;
    this.stepSlider = stepSlider;
    this.cartIcon = cartIcon;
    this.cart = cart;
    this.productsGrid = productsGrid;
  }
}
