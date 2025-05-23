declare global {
    abstract class PlaceableObject<
        TDocument extends CanvasDocument = CanvasDocument,
    > extends RenderFlagsContainer<TDocument> {}
}

export class RenderFlagsContainer<TDocument extends CanvasDocument> extends PIXI.Container {
    constructor(document: TDocument);
}
