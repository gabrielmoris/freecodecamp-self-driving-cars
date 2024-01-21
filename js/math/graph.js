class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  // this fn belongs to the class, not to the inscances
  static load(info) {
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equalPoints(i.p1)),
          points.find((p) => p.equalPoints(i.p2))
        )
    );
    // this would be a more declarative version
    // const points ==[]
    // const segments = [];

    // for (const pointInfo of info.points) {
    //   points.push(new Point(pointInfo.x, pointInfo.y));
    // }
    // for (const segmentInfo of info.segments) {
    //   segments.push(
    //     new Segment(
    //       points.find((p) => p.equalPoints(segmentInfo.p1)),
    //       points.find((p) => p.equalPoints(segmentInfo.p2))
    //     )
    //   );
    // }

    return new Graph(points, segments);
  }

  // POINTS SECTION
  addPoint(point) {
    this.points.push(point);
  }

  containsPoint(point) {
    return this.points.find((p) => p.equalPoints(point));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  removePoint(point) {
    const segments = this.getSegmentsWithPoint(point);
    for (const seg of segments) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  // SEGMENTS SECTION
  addSegment(segment) {
    this.segments.push(segment);
  }

  containsSegment(segment) {
    return this.segments.find((s) => s.equalSegments(segment));
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment) && !segment.p1.equalPoints(segment.p2)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  getSegmentsWithPoint(point) {
    const segments = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segments.push(seg);
      }
    }
    return segments;
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
