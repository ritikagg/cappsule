export interface Product {
  pharmacy_id: string;
  selling_price: number | null;
}

export type ProductMap = {
  [productId: string]: Product[] | null | Product | undefined;
};

interface SaltFormJson {
  [key: string]: {
    // form
    [key: string]: {
      // strength
      [key: string]: ProductMap;
    };
  };
}

export interface SaltSuggestions {
  id: number;
  salt: string;
  salt_frequency: number;
  available_forms: string[];
  salt_forms_json: SaltFormJson;
}
export interface APIResponse {
  data: {
    saltSuggestions: SaltSuggestions[];
  };
}

export interface LowestPriceProduct {
  product_id: string;
  pharmacy_id: string;
  selling_price: number;
}
