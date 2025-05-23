import { TokenDocumentNs } from "@scene/token-document/document.ts";

class ActorNs<TParent extends TokenDocumentNs | null = TokenDocumentNs | null> extends Actor<TParent> {
    declare initialized: boolean;

    get level(): number {
        return this.system.details.level.value;
    }
}

interface ActorNs<TParent extends TokenDocumentNs | null = TokenDocumentNs | null> extends Actor<TParent> {}

export { ActorNs };
