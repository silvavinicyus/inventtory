export class StockChecker {
  static isStockLow(quantity: number): boolean {
    return quantity <= +process.env.STOCK_LIMIT
  }

  static isQuantityEnough(
    productQuantity: number,
    quantityToRemove: number
  ): boolean {
    return productQuantity >= quantityToRemove
  }
}
