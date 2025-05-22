import { Load } from "./load";

export const HooksNs1 = {
    listen(): void {
        const listeners: { listen(): void }[] = [Load];
        for (const Listener of listeners) {
            Listener.listen();
        }
    },
};
