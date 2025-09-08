# Challenge Documentation

This document outlines my reasoning, design decisions, and technical solutions throughout the challenge.  
My goal was not only to meet the requirements (mocking UI & backend) but also to **replicate the behavior of a real-world e-commerce product page** as closely as possible, focusing on performance, structure, and maintainability.

---

## Design Choices

- **Framework**: I chose **Next.js** to leverage **SSR/SSG** for pre-rendering and hydration. While the challenge only required mocking the UI & backend, I aimed to replicate the real user experience in Mercado Libre.
- **Initial Load Assumption**: When a user requests a product page, it is served from a **CDN edge cache** with basic data for a fast first paint.
  - To simulate this, I added a short **loading screen (100–300ms)** representing the CDN fetch.
- **Lazy Loading**: After rendering core product data (name, price, details), I **lazy load non-critical components** (recommendations, seller details) with **skeleton loaders (~2.5s delay)**.
- **Styling**: Used **Tailwind CSS** for inline utility classes, ensuring **faster above-the-fold paint**. Also implemented a small **design system library** for reusable styles (buttons, titles).
- **Icons**: Integrated the **Lucide React** utility library for consistent and lightweight icons.
- **Data Fetching**: Implemented **React Query** for caching and managing request states efficiently.
- **Testing**: Chose **Jest** to validate UI behavior and measure **test coverage** for each component.

---

## Challenges & Solutions

### A) Handling Responsiveness

- **Problem**: Deciding how to serve different layouts for mobile and desktop.
- **Solution**:
  - Built **Mobile and Desktop templates**, toggled with Tailwind’s `hidden md:block` utility.
  - Organized them under symbolic routes inside `components/`, colocated with the main `page` file.
  - The page decides which template to render based on viewport.

---

### B) Organizing Folders

- **Problem**: Unsure whether to separate components strictly by device type.
- **Solution**:
  - Reusable components are stored under `app/components`.
  - Created a dedicated **`ui/` folder** for atomic UI elements (e.g., `Card`, `Loader`).
  - This allows reuse across both mobile and desktop templates without duplication.

---

### C) Data Fetching

- **Problem**: Managing core product data vs. secondary data for lazy-loaded components.
- **Solution**:
  - Core product JSON (price, name, details) is fetched server-side, injected into **Context API**, and made available to all nested components.
  - For lazy-loaded sections, created **custom hooks** that:
    - Handle API calls,
    - Expose `isLoading`, `data`, `error` states,
    - Integrate seamlessly with React Query caching.
