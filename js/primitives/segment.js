class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  length() {
    return distance(this.p1, this.p2);
  }

  directionVector() {
    return normalize(substract(this.p2, this.p1));
  }

  equalSegments(segment) {
    // return (
    //   (this.p1.equalPoints(segment.p1) && this.p2.equalPoints(segment.p2)) || (this.p1.equalPoints(segment.p2) && this.p2.equalPoints(segment.p1))
    // );
    // with this helper function is more elegant
    return this.includes(segment.p1) && this.includes(segment.p2);
  }

  includes(point) {
    return this.p1.equalPoints(point) || this.p2.equalPoints(point);
  }

  draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
