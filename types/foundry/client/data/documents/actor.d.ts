import type { ClientBaseActor } from "./client-base-mixes.ts";

declare global {
    class Actor<TParent extends TokenDocument | null = TokenDocument | null> extends ClientBaseActor<TParent> {}

    interface Actor<TParent extends TokenDocument | null = TokenDocument | null> extends ClientBaseActor<TParent> {}

    namespace Actor {
        const implementation: typeof Actor;
    }
}
