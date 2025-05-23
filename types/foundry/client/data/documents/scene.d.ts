import { ClientBaseScene } from "./client-base-mixes.ts";

declare global {
    class Scene extends ClientBaseScene {}

    interface Scene {
        readonly walls: foundry.abstract.EmbeddedCollection<WallDocument<this>>;
    }
}
