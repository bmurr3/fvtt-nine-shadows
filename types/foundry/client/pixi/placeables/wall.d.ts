declare class Wall<TDocument extends WallDocument<Scene | null>> extends PlaceableObject<TDocument> {}

declare interface Wall<TDocument extends WallDocument<Scene | null>> extends PlaceableObject<TDocument> {
    get layer(): WallsLayer<this>;
}
