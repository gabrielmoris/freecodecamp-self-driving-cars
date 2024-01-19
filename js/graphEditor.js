class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");

    this.selected = null;
    this.hovered = null;
    this.dragging = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      //right click
      if (e.button == 2) {
        if (this.hovered) {
          this.#removePoint(this.hovered);
        } else {
          this.selected = null;
        }
      }
      //left click
      if (e.button == 0) {
        const mouse = new Point(e.offsetX, e.offsetY);

        if (this.hovered) {
          if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, this.hovered));
          }
          this.selected = this.hovered;
          this.dragging = true;
          return;
        }
        this.graph.addPoint(mouse);
        if (this.selected) {
          this.graph.tryAddSegment(new Segment(this.selected, mouse));
        }
        this.selected = mouse;
        this.hovered = mouse;
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const mouse = new Point(e.offsetX, e.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 10);
      if (this.dragging == true) {
        this.selected.x = mouse.x;
        this.selected.y = mouse.y;
      }
    });

    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
