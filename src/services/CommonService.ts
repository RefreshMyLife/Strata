import { TOKENS } from 'src/constants/tokens';
import { Token } from 'src/types';

export namespace CommonService {

    export let preferredTranche = TOKENS.srusde;

    export function setPreferredTranche (tranche: Token) {
        preferredTranche = tranche;
    }

    let shouldConnectTick = false;
    export function setConnectTick () {
        shouldConnectTick = true;
    }
    export function getConnectTick () {
        let tick = shouldConnectTick;
        shouldConnectTick = false;
        return tick;
    }
}
