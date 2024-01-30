# Linear Interpolation (lerp)

`lerp` is an abbreviation for **linear interpolation**. Linear interpolation is a mathematical operation that finds a value between two points (or values) based on a linear progression. It calculates intermediate values within a range.

The formula for linear interpolation is often expressed as:

```markdown
lerp(a, b, t) = (1 - t) _ a + t _ b
```

Here:

- `a` is the starting value.
- `b` is the ending value.
- `t` is a parameter that represents the position between `a` and `b`, usually ranging from 0 to 1.

The `lerp` function is commonly used in computer graphics, animation, and game development to smoothly transition between two values over time. It provides a straightforward way to create smooth transitions or animations by specifying the start and end points and the interpolation factor.
