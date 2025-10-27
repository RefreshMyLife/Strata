export enum Subdirectory {
    DASHBOARD = '/dashboard',
    ACCOUNT = '/account',
    HISTORY = '/history',
    VAULTS = '/vaults',
    PRE_DEPOSIT = '/predeposit',
    POINTS = '/points',
    LEADER_BOARD = '/leaderboard',
    PRIVACY = '/privacy-policy',
    TERMS = '/terms-of-service',
    DISCLAIMER = '/legal-disclaimer',
    // TEST
    TEST = '/test',
    OVERVIEW = '/overview', // redirects to dashboard
    BUYANDEARN = '/buy-and-earn', // redirects to account
}

const routeSubdirectories = {
    dashboard: [Subdirectory.DASHBOARD],
    account: [Subdirectory.ACCOUNT],
    history: [Subdirectory.HISTORY],
    vaults: [Subdirectory.VAULTS],
    preDeposit: [Subdirectory.PRE_DEPOSIT],
    points: [Subdirectory.POINTS],
    privacy: [Subdirectory.PRIVACY],
    terms: [Subdirectory.TERMS],
    disclaimer: [Subdirectory.DISCLAIMER],
    // TEST
    test: [Subdirectory.TEST],
    overview: [Subdirectory.OVERVIEW], // redirects to dashboard
    buyAndEarn: [Subdirectory.BUYANDEARN], // redirects to account
};

type RouteName = keyof typeof routeSubdirectories;

type Routes = {
    [key in RouteName]: {
        path: string;
        subdirectories: Subdirectory[];
    };
};

export const routes = Object.keys(routeSubdirectories).reduce<Routes>(
    (obj, key) =>
        Object.prototype.hasOwnProperty.call(routeSubdirectories, key)
            ? {
                  ...obj,
                  [key]: {
                      path: routeSubdirectories[key as RouteName].join(''),
                      subdirectories: routeSubdirectories[key as RouteName],
                  },
              }
            : obj,
    {} as Routes,
);
