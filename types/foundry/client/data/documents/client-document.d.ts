import { ClientBaseScene } from "./client-base-mixes.ts";

declare global {
    interface ClientDocument extends foundry.abstract.Document {}

    interface CanvasDocument extends ClientDocument {
        readonly parent: ClientBaseScene | null;
        object: PlaceableObject<this> | null;
        hidden?: boolean;
    }
}
