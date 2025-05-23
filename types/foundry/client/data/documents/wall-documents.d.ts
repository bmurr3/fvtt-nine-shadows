import type { CanvasBaseWall } from "./client-base-mixes.ts";

declare global {
    class WallDocument<TParent extends Scene | null> extends CanvasBaseWall<TParent> {}

    interface WallDocument<TParent extends Scene | null> extends CanvasBaseWall<TParent> {
        get object(): Wall<this> | null;
    }
}
