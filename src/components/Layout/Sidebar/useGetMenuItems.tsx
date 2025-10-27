import { useMemo } from 'react';
import { isFeatureEnabled } from 'utilities';

import { routes } from 'constants/routing';
import { useAuth } from 'context/AuthContext';
import { useChainId } from 'wagmi';

import { MenuItem } from '../types';
import { ChainId } from 'src/packages/contracts';

const useGetMenuItems = () => {
  const { accountAddress } = useAuth();
  const { chainId } = useAuth();

  return useMemo(() => {
    const menuItems: MenuItem[] = [
      // {
      //   href: routes.points.path,
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.vaults')
      //   i18nKey: 'layout.menuItems.points',
      //   icon: 'preDeposit',
      //   //isNew: true,
      // },
      // {
      //   href: routes.dashboard.path,
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.dashboard')
      //   i18nKey: 'layout.menuItems.dashboard',
      //   icon: 'dashboard',
      // },
    ];

    // Insert account page if wallet is connected
    if (accountAddress) {
      menuItems.push({
        href: routes.account.path,
        // Translation key: do not remove this comment
        // t('layout.menuItems.account')
        i18nKey: 'layout.menuItems.account',
        icon: 'person',
      });
    }

    // if (isFeatureEnabled('isolatedPools')) {
    //   menuItems.push(
    //     {
    //       href: routes.corePool.path,
    //       // Translation key: do not remove this comment
    //       // t('layout.menuItems.corePool')
    //       i18nKey: 'layout.menuItems.corePool',
    //       icon: 'markets',
    //     },
    //     {
    //       href: routes.isolatedPools.path,
    //       // Translation key: do not remove this comment
    //       // t('layout.menuItems.isolatedPools')
    //       i18nKey: 'layout.menuItems.isolatedPools',
    //       icon: 'fourDots',
    //       withBadge: 'SOON',
    //     },
    //   );
    // } else {
    //   menuItems.push({
    //     href: routes.corePool.path,
    //     // Translation key: do not remove this comment
    //     // t('layout.menuItems.markets')
    //     i18nKey: 'layout.menuItems.markets',
    //     icon: 'markets',
    //   });
    // }

    menuItems.push(
      // chainId === ChainId.ETHEREUM_MAINNET ? null : {
      //   href: routes.vaults.path,
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.vaults')
      //   i18nKey: 'layout.menuItems.vaults',
      //   icon: 'vault',
      // },
      // // {
      // //   href: routes.swap.path,
      // //   // Translation key: do not remove this comment
      // //   // t('layout.menuItems.swap')
      // //   i18nKey: 'layout.menuItems.swap',
      // //   icon: 'convert',
      // // },
      // {
      //   href: routes.history.path,
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.history')
      //   i18nKey: 'layout.menuItems.history',
      //   icon: 'history',
      // },
      // // {
      // //   href: routes.governance.path,
      // //   // Translation key: do not remove this comment
      // //   // t('layout.menuItems.governance')
      // //   i18nKey: 'layout.menuItems.governance',
      // //   icon: 'market',
      // // },
      // chainId === ChainId.ETHEREUM_MAINNET ? null : {
      //   href: routes.strata.path,
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.strata')
      //   i18nKey: 'layout.menuItems.strata',
      //   icon: 'strata',
      // },
      // {
      //   href: routes.seusd.path,
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.seusd')
      //   i18nKey: 'layout.menuItems.seusd',
      //   icon: 'seusdOutline',
      // },
      // {
      //   href: routes.convertSrt.path,
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.convertSrt')
      //   // t('layout.menuItems.convertSrtTitle')
      //   i18nKey: 'layout.menuItems.convertSrt',
      //   icon: 'convert',
      // },

      {
        href: routes.preDeposit.path,
        // Translation key: do not remove this comment
        // t('layout.menuItems.vaults')
        i18nKey: 'layout.menuItems.preDeposit',
        icon: 'preDeposit',
        isLive: true,
      },

      {
        href: 'https://docs.strata.money',
        // Translation key: do not remove this comment
        // t('layout.menuItems.vaults')
        i18nKey: 'layout.menuItems.docs',
        icon: 'docs',
      },
      {
        href: 'https://docs.strata.money/protocol/security',
        // Translation key: do not remove this comment
        // t('layout.menuItems.vaults')
        i18nKey: 'layout.menuItems.bugBounty',
        icon: 'bugBounty',
      },
      // {
      //   href: 'https://neonpass.live',
      //   // Translation key: do not remove this comment
      //   // t('layout.menuItems.vaults')
      //   i18nKey: 'Bridge',
      //   icon: 'lightening',
      // },
    );

    return menuItems.filter(x => x != null);
  }, [accountAddress, chainId]);
};

export default useGetMenuItems;
