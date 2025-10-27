export namespace PointsConstants {
    type TIntegration = 'pendle' | 'termmax' | 'morpho' | 'euler' | 'gearbox' | 'ipor' | 'tranche';

    export const IntegrationsS1 = [
        {
            key: 'tranche',
            names: ['srUSDe', 'jrUSDe'],
            idxs: [0, 2],
            // srUSDe$, jrUSDe$
            idxs$: [1, 3],
            overallIdxs: [0, 1]
        },
        {
            key: 'pendle',
            names: ['srUSDe LP', 'srUSDe YT', 'jrUSDe LP', 'jrUSDe YT'],
            // srUSDe LP, srUSDe YT, jrUSDe LP, jrUSDe YT
            idxs: [0, 2, 4, 6],
            // srUSDeLP$, srUSDeYT$, jrUSDeLP$, jrUSDeYT$
            idxs$: [1, 3, 5, 7],
            overallIdxs: [0, 1, 2, 3]
        }

    ] as {
        key: TIntegration
        names?: string[]
        idxs: number[]
        idxs$: number[]
        overallIdxs: number[]
    }[];
}
