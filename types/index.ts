export interface Item {
  id: string
  seller: {
    id: string
  }
  header: {
    suggestions: string[]
    breadcrumbs: string[]
  }
  page_content: {
    item_image: {
      images: string[]
    }
    item_summary: {
      header: {
        title: string
        rating: number
        reviews: number
      }
      attributes: {
        condition: string
        sold: string
        favorite: boolean
        color: string
        other_colors: string[]
        features: string[]
      }
      buy_options: {
        new_products: number
        used_products: number
      }
      pricing: {
        price: number
        installments: number
        installment_value: number
        tax_free_price: number
      }
      payment_options: {
        payment_methods: string[]
        payment_methods_description: string
      }
      product_specifications: {
        memory_ram: string
        internal_memory: string
        main_front_camera: string
        main_rear_camera: string
        unlock_methods: string
        nfc: string
        screen_size: {
          value: string
          dimensions: string
          scale: number
        }
      }
      product_description: {
        sections: Array<{
          title: string
          content: string
        }>
      }
    }
  }
}

export interface ContextContextType {
  item: Item
}

export interface RelatedProduct {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  installments: {
    amount: number
    value: number
  }
  freeShipping: boolean
}

export type RelatedProducts = RelatedProduct[]

export interface SellerProduct {
  id: string
  seller: {
    id: string
    name: string
    logo: string
  }
  title: string
  price: number
  image: string
  installments: {
    quantity: number
    amount: number
  }
}
