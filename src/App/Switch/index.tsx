import { Navigate, Route, Routes, useLocation } from 'react-router';

import 'assets/styles/App.scss';
import { routes } from 'constants/routing';
import { useAuth } from 'context/AuthContext';
import Account from 'pages/Account';
import Points from 'pages/Points';
import PreDeposit from 'pages/PreDeposit';
import BuyAndEarnUi from 'src/pages/BuyAndEarn';
import { NewDashboardUi } from 'src/pages/NewDashboard';
import { OverviewPage } from 'src/pages/Overview';
import { Points2 } from 'src/pages/Points2';
import { LegalDisclaimer } from 'src/pages/PrivacyPolicy/LegalDisclaimer';
import { PrivacyPolicy } from 'src/pages/PrivacyPolicy/PrivacyPolicy';
import { TermsOfService } from 'src/pages/PrivacyPolicy/TermsOfService';
import { Test } from 'src/pages/Test/TestPage';

const AppSwitch = () => {
    const { accountAddress } = useAuth();
    const location = useLocation();

    return (
        <Routes>
            <Route path="/" element={<Navigate to={routes.overview.path} replace />} />

            {/* <Route exact path={routes.vaults.path} component={Vaults} /> */}
            <Route path={routes.preDeposit.path} element={<PreDeposit />} />
            <Route path={routes.account.path} element={<Account />} />
            <Route path={routes.points.path} element={<Points2 />} />
            <Route path={routes.privacy.path} element={<PrivacyPolicy />} />
            <Route path={routes.terms.path} element={<TermsOfService />} />
            <Route path={routes.disclaimer.path} element={<LegalDisclaimer />} />
            {/* <Route exact path={routes.history.path} component={History} /> */}

            <Route path={routes.account.path} element={<Account />} />
            <Route path={routes.overview.path} element={<OverviewPage />} />
            <Route path={routes.buyAndEarn.path} element={<BuyAndEarnUi />} />
            <Route path={routes.dashboard.path} element={<NewDashboardUi />} />
        </Routes>
    );
};

export default AppSwitch;
