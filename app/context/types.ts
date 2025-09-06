export interface Item {
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

export interface ContentContextType {
  item: Item
}
