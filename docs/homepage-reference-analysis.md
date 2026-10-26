# WFC homepage motion reference

Reference: https://elena-voss-portfolio-template-v3.21st.app/
Inspected visually on 26 October 2026, from opening frame through footer.

1. Full viewport photographic hero with overlaid headline.
2. Scroll shrinks the same frame to approximately half size. A two-column image collage appears behind it; the surrounding images sharpen.
3. A broad curved orange/red surface rises over the collage. The collection heading sits above left-side timeline navigation and right-side stacked project images. Scrolling advances the images.
4. Dark section with centered heading and three benefit columns.
5. Left-aligned introduction followed by horizontal cards driven by vertical scrolling.
6. Large heading and ruled rows with image previews.
7. Centered statement surrounded by blurred, floating brand marks.
8. Testimonial section with person selection and previous/next controls.
9. FAQ accordion.
10. Rounded contact panel with orange glow followed by copyright.

WFC adaptation uses existing jewelry photography, collection links, studio benefits, material cards, collection rows, brand statement, purchasable product cards, existing FAQ answers, and a contact panel. Product cards occupy the reference's testimonial position; no customer endorsements or awards have been invented. The shared commerce navigation and legal footer remain available.

Desktop uses sticky scroll scenes and requestAnimationFrame updates. Small screens use ordinary document flow and a touch-scroll material rail. Reduced-motion preferences disable sticky motion and floating labels. Collection controls and inactive panels use inert to keep hidden links out of keyboard navigation.
