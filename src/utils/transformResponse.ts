import {
  LowestPriceProduct,
  Product,
  ProductMap,
  SaltSuggestions,
} from "./app.model";

function findLowestPriceProduct(
  products: ProductMap,
): LowestPriceProduct | null {
  const lowestPriceProduct: LowestPriceProduct | null = Object.keys(
    products,
  ).reduce((lowest: LowestPriceProduct | null, productId: string) => {
    const product = products[productId];

    if (Array.isArray(product)) {
      const lowestInArray = product.reduce(
        (lowestInArr: LowestPriceProduct, item: Product) => {
          if (
            item.selling_price !== null &&
            item.selling_price < lowestInArr.selling_price
          ) {
            return {
              product_id: productId,
              pharmacy_id: item.pharmacy_id,
              selling_price: item.selling_price,
            };
          }
          return lowestInArr;
        },
        { product_id: "", pharmacy_id: "", selling_price: Infinity },
      );

      if (
        lowestInArray.selling_price < (lowest ? lowest.selling_price : Infinity)
      ) {
        return lowestInArray;
      }
    } else if (
      product !== null &&
      typeof product === "object" &&
      product.hasOwnProperty("selling_price") &&
      product.selling_price !== null &&
      product.selling_price < (lowest ? lowest.selling_price : Infinity)
    ) {
      return {
        product_id: productId,
        pharmacy_id: product.pharmacy_id,
        selling_price: product.selling_price,
      };
    }
    return lowest;
  }, null);

  return lowestPriceProduct;
}

export const getTrimmedData = (data: SaltSuggestions) => {
  const newObj: { [key: string]: any } = {};
  const t1: any = {};
  const forms = data.available_forms;
  for (let i = 0; i < forms.length; i++) {
    // forms
    const obj1: { [key: string]: any } = {};
    const t2: any = {};
    for (const strengthKey of Object.keys(data.salt_forms_json[forms[i]])) {
      // strength
      const obj2: { [key: string]: any } = {};
      const t3: any = {};
      for (const packagingKey of Object.keys(
        data.salt_forms_json[forms[i]][strengthKey],
      )) {
        // packaging
        const obj3 = findLowestPriceProduct(
          data.salt_forms_json[forms[i]][strengthKey][packagingKey],
        );
        if (obj3) {
          t3[packagingKey] = obj3;
        }
        obj2[packagingKey] = obj3;
      }
      obj1[strengthKey] = obj2;
      if (!isEmpty(t3)) {
        t2[strengthKey] = t3;
      }
    }
    newObj[forms[i]] = obj1;
    if (!isEmpty(t2)) {
      t1[forms[i]] = t2;
    }
  }

  return { ...data, salt_forms_json: newObj, productObj: t1 };
};

function isEmpty(obj: object): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export function buttonMapper(
  arg1: boolean | undefined | null,
  arg2: boolean | undefined | null,
): "primary" | "secondary" | "tertiary" | "quaternary" {
  arg1 = arg1 ?? false; // If arg1 is null or undefined, consider it as false
  arg2 = arg2 ?? false; // If arg2 is null or undefined, consider it as false

  if (arg1 && arg2) {
    return "primary";
  } else if (arg1 && !arg2) {
    return "secondary";
  } else if (!arg1 && arg2) {
    return "tertiary";
  } else {
    return "quaternary";
  }
}
