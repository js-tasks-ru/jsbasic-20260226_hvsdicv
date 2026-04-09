export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product || !product.id) {
      return;
    }

    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id,
    );

    let cartItem;
    if (existingItem) {
      existingItem.count += 1;
      cartItem = existingItem;
    } else {
      cartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const itemIndex = this.cartItems.findIndex(
      (item) => item.product.id === productId,
    );

    if (itemIndex === -1) {
      return;
    }

    const cartItem = this.cartItems[itemIndex];
    cartItem.count += amount;

    let updatedItem = cartItem;

    if (cartItem.count === 0) {
      this.cartItems.splice(itemIndex, 1);
      updatedItem = null;
    }

    this.onProductUpdate(updatedItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.count,
      0,
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
