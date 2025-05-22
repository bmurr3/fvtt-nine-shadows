import { Load } from "./load.ts";

export const HooksNs1 = {
    listen(): void {
        const listeners: { listen(): void }[] = [Load];
        for (const Listener of listeners) {
            Listener.listen();
        }
    },
};
