# Box model

A box that wraps around every HTML element. Consists of :

1. Content - where texts and images appear.
2. Padding - area around the content but inside the element.
3. Border - border that goes around the padding and content.
4. Margin - clears an area outside the border.

# CSS Specificity

- Hierarchy that determines which styling is applied to an element.
- Inline style > id selectors > classes & pseudo-classes > attributes > elements & pseudo-elements

# CSS Positioning

- Specifies the type of positioning to apply to an element.

1. Static -> is the default. Element not affected by top, left, right or bottom properties
2. Relative -> positioned relative to its normal position. Setting top, left, right or bottom will have it adjusted relative to its normal position.
3. Fixed -> positioned relative to its viewport. It will always stay at the same place even if page is scrolled.
4. Absolute -> positioned relative to the nearest positioned ancestor.
5. Sticky -> positioned based on the user's scroll position. You must specify at least one of top, right, bottom or left for sticky positioning to work.

# CSS Flexbox

- Layout method for arranging items in rows or columns.

```
.flex-container {
  display: flex;
}
```

flex-direction -> specifies the display-direction of flex items in the container.
flex-wrap -> determines if flex objects should wrap or not if there isnt enough room in one line.
justify-content -> used to align items horizontally.
align-items -> used to align items vertically.

# CSS Grid

Lays out content in the form of a grid (rows and columns)

```
.container {
  display: grid;
}
```

Grid properties

1. gap -> sets the gap between rows and columns `gap: 20px 30px`
2. grid-template-colummns -> specifies the number of columns in your grid layout, and can define the width of each column.

```
.container {
    display: grid;
    grid-template-columns: auto auto auto auto
}
```

```
.container {
    display: grid;
    grid-template-columns: 80px 200px auto 40px
}
```

3. grid-template-rows -> defines the height for each row.

```
.grid-container {
  display: grid;
  grid-template-rows: 80px 200px;
}
```

4. justify-content - works normally for items in container
5. align-content - works like align-items for items in container
