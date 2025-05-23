export class ClientBaseActor<TParent extends CanvasBaseToken<ClientBaseScene | null> | null> extends foundry.documents
    .BaseActor<TParent> {}

export class ClientBaseScene extends foundry.documents.BaseScene {}

declare class ClientBaseToken<TParent extends ClientBaseScene | null> extends foundry.documents.BaseToken<TParent> {}

export class CanvasBaseToken<TParent extends ClientBaseScene | null> extends ClientBaseToken<TParent> {}

declare class ClientBaseWall<TParent extends ClientBaseScene | null> extends foundry.documents.BaseWall<TParent> {}
