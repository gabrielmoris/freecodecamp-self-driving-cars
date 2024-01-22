class World {
  constructor(graph, roadWidth = 100, roadRoundness = 3) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const segment of this.graph.segments) {
      this.envelopes.push(new Envelope(segment, this.roadWidth, this.roadRoundness));
    }
    this.intersections = Polygon.break(this.envelopes[0].poly, this.envelopes[1].poly);
  }

  draw(ctx) {
    for (const envelope of this.envelopes) {
      envelope.draw(ctx);
    }
    for (const intersection of this.intersections) {
      intersection.draw(ctx, { color: "red", size: 6 });
    }
  }
}
