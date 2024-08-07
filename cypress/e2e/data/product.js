const calculateTaxRetailPrice = (retailPrice, taxInclusive) => {
  return taxInclusive ? retailPrice : (retailPrice * 1.16).toFixed(1);
};

const product = {
  name: "Auto product",
  description: "Test description",
  category: "Test category",
  brand: "Test brand",
  location: "Test location",
  barcode: "123456789012",
  opening_quantity: "100.00",
  quantity_unit_code: "pieces",
  buying_price: "50.00",
  retail_price: "70.00",
  min_wholesale_price: "45.00",
  wholesale_price: "48.00",
  min_retail_price: "65.00",
  tax_inclusive: false,
  tax_rate: "Vat- 16%",
  tax_retail_price: calculateTaxRetailPrice(70.0, false),
};

const productEdit = {
  name: "Auto product edited",
  description: "Test description edited",
  category: "Test category edit",
  brand: "Test brand edit",
  location: "Test location edit",
  barcode: "6789",
  opening_quantity: "100.00",
  quantity_unit_code: "pieces",
  buying_price: "40.00",
  retail_price: "80.00",
  min_wholesale_price: "36.00",
  wholesale_price: "38.00",
  min_retail_price: "75.00",
  tax_inclusive: false,
  tax_rate: "Vat- 16%",
  tax_retail_price: calculateTaxRetailPrice(80.0, false),
};

const ProductPos = {
  name: "Pos Auto product",
  description: "Test description",
  category: "Test category",
  brand: "Test brand",
  location: "Test location",
  barcode: 3478378,
  opening_quantity: "100.00",
  quantity_unit_code: "pieces",
  buying_price: "50.00",
  retail_price: "70.00",
  min_wholesale_price: "45.00",
  wholesale_price: "48.00",
  min_retail_price: "65.00",
  tax_inclusive: true,
  tax_rate: "Vat- 16%",
  tax_retail_price: calculateTaxRetailPrice(70.0, true),
};

const productTaxInclusive = {
  name: "Tax Inclusive Auto product",
  description: "Tax inclusive product description",
  category: "Test category",
  brand: "Test brand",
  location: "Test location",
  barcode: "987654321098",
  opening_quantity: "50.50",
  quantity_unit_code: "pieces",
  buying_price: "60.00",
  retail_price: "85.00",
  min_wholesale_price: "55.00",
  wholesale_price: "58.00",
  min_retail_price: "80.00",
  tax_inclusive: true,
  tax_rate: "Vat- 16%",
  tax_retail_price: calculateTaxRetailPrice(85.0, true),
};

const productTaxExclusive = {
  name: "Tax Exclusive Auto product",
  description: "Tax exclusive product description",
  category: "Test category",
  brand: "Test brand",
  location: "Test location",
  barcode: "876543210987",
  opening_quantity: "75.25",
  quantity_unit_code: "pieces",
  buying_price: "45.00",
  retail_price: "60.00",
  min_wholesale_price: "40.00",
  wholesale_price: "42.00",
  min_retail_price: "55.00",
  tax_inclusive: false,
  tax_rate: "Vat- 16%",
  tax_retail_price: calculateTaxRetailPrice(60.0, false),
};

const productDecimalPrice = {
  name: "Decimal Price Auto product",
  description: "Decimal price product description",
  category: "Test category",
  brand: "Test brand",
  location: "Test location",
  barcode: "135792468013",
  opening_quantity: "30.00",
  quantity_unit_code: "pieces",
  buying_price: "20.50",
  retail_price: "35.75",
  min_wholesale_price: "18.00",
  wholesale_price: "19.50",
  min_retail_price: "33.00",
  tax_inclusive: false,
  tax_rate: "Vat- 16%",
  tax_retail_price: calculateTaxRetailPrice(35.75, false),
};

export default {
  product,
  productEdit,
  ProductPos,
  productTaxInclusive,
  productTaxExclusive,
  productDecimalPrice,
};
