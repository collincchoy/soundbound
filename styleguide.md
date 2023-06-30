# CSS

* Atomic utility classes
* StyledComponents
* Modular SCSS
* Modular CSS
* Inline

## StyledComponents

### Placement

Components created via `styled.[...]` should be co-located with their usage and live _below_
the component's primary render function at the bottom of the file.

> **Why?**
> So that they are easy to find.

### Naming

Components created via `styled.[...]` should have names prefixed with "Styled"

> **Why?**
> So that it is clear when reading in JSX.
