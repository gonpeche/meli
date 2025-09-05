This document will expose my train of thougths throghouht the entire challenge journey:

5/09/2025

* How should I structure the page? Initial thoughts:
    - Think what sections of the UI will be reusable
    - Split the layout considering what should be the structure page and the inner components
    - Should I use flexbox or grid?
    - Considering I don't have mobile frames, i'll discard a mobile-first approach and build the UI for Desktop first, and afterwards make it responsive.

* I decided to revise the design and start splitting things:

The main layout of the page could render:
    <MainContainer>
        <HeaderContainer>
            <RelatedSearch>
            <NavContainer>
                <ProductBreadcrumb>
                <ActionItems>
            <NavContainer>>
        </HeaderContainer>
        <ProductContainer>
            <LeftContainer>
                <ProductDetails>
                <Recommendations>
                    <RelatedProductsRecommendationCarrousel>
                    <SellerProductsReccomendationCarrousel>
                </Recommendations>
                <ProductSpecifications>
                <ProductDescription>
            </LeftContainer>
            <RightContainer>
                <BuySection>
                <SellerDetails>
                <OtherSellersBuyOptions>
                <PaymentOptions>
                <RelatedProductsRcommendationList>
            <RightContainer>
        </ProductContainer>
    </MainContainer>

* So now that I have the UI organized into components, i need to think of the data. How & where should I fetch it?

Since I'm using Next Js, I'll try to adequate the code so that it behaves like it's using SSR (server side rendering) and assume i'm getting an initial pre-prendered HTML for the product page layout.
Aftewards, i'll run hydratation (make the page usable) & lazy loading (add parts that weren’t rendered at all)
For this, i'll add a loader skeleton with a 2s timeout.
