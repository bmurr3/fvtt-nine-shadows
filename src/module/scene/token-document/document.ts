import type { SceneNs } from "../document.ts";

class TokenDocumentNs<TParent extends SceneNs | null = SceneNs | null> extends TokenDocument<TParent> {}

export { TokenDocumentNs };
