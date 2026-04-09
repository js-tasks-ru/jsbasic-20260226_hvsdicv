import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true },
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetWidth) return;

    if (document.documentElement.clientWidth <= 767) {
      Object.assign(this.elem.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        zIndex: "",
      });
      return;
    }

    if (this.elem.style.position !== "fixed") {
      this.initialTopCoord =
        this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    if (window.pageYOffset > this.initialTopCoord) {
      const container = document.querySelector(".container");
      const containerRight = container
        ? container.getBoundingClientRect().right
        : 0;

      const leftIndent = Math.min(
        containerRight + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10,
      );

      Object.assign(this.elem.style, {
        position: "fixed",
        top: "50px",
        left: `${leftIndent}px`,
        right: "10px",
        zIndex: 1000,
      });
    } else {
      Object.assign(this.elem.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        zIndex: "",
      });
    }
  }
}
