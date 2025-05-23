declare global {
    class TokenDocument<TParent extends Scene | null = Scene | null> extends CanvasBaseToken<TParent> {}

    interface TokenDocument<TParent extends Scene | null = Scene | null> extends CanvasBaseToken<TParent> {}
}
