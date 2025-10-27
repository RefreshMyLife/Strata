import { QueryClientProvider } from '@tanstack/react-query';
import { Layout, Layout2, ResetScrollOnRouteChange } from 'components';
import React from 'react';
import { HashRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Web3Wrapper } from 'src/libs/wallet/Web3Wrapper';

import 'assets/styles/App.scss';
import { queryClient } from 'clients/api';
import { AnalyticsProvider } from 'context/Analytics';
import { ErrorLoggerProvider } from 'context/ErrorLogger';
import { SuccessfulTransactionModalProvider } from 'context/SuccessfulTransactionModalContext';
import { ErrorBoundary } from 'src/libs/errors/ErrorBoundary';
import { MuiThemeProvider } from 'theme/MuiThemeProvider';

import ConsentModal from './Consent';
import { NoMobile } from './NoMobile';
import { ReferredModal } from './ReferredModal';
import AppSwitch from './Switch';

const App = () => {
    // localStorage.removeItem('wagmi.connected');
    // localStorage.removeItem('wagmi.store');
    return (
        <HashRouter>
            <MuiThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <ErrorBoundary>
                        <Web3Wrapper>
                            <AnalyticsProvider>
                                <SuccessfulTransactionModalProvider>
                                    <ToastContainer />
                                    {/* CHANGES : Layout2 added in place of Layout */}
                                    {/* <Layout>
                                        <ResetScrollOnRouteChange />
                                        <AppSwitch />
                                        <ReferredModal />
                                        <ConsentModal />
                                        <NoMobile />
                                    </Layout> */}
                                    <Layout2>
                                        <ResetScrollOnRouteChange />
                                        <AppSwitch />
                                        <ReferredModal />
                                        <ConsentModal />
                                    </Layout2>
                                    {/* <NoMobile /> */}
                                </SuccessfulTransactionModalProvider>
                            </AnalyticsProvider>
                        </Web3Wrapper>
                    </ErrorBoundary>
                </QueryClientProvider>
            </MuiThemeProvider>
        </HashRouter>
    );
};

export default App;
