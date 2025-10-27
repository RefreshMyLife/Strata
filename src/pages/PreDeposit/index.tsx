/** @jsxImportSource @emotion/react */
import { AnchorButton, Spinner, Tabs, TextButton, TokenIcon } from 'components';
import React, { useState } from 'react';

import img_stars_sm from 'assets/img/stars.svg';

import { useGetPreDeposits } from 'clients/api';
import { useAuth } from 'context/AuthContext';

import { TPreDepositData } from 'src/clients/api/queries/useGetPreDeposits/useGetPreDepositData/useGetPreDepositPoolData';
import { ChainId, changeChainId } from 'src/packages/contracts';
import { Box } from '@mui/material';

import PreDepositPanel from './PreDepositPanel';
import PreDepositStatus from './PreDepositStatus';
import WithdrawForm from './WithdrawPanel/WithdrawForm';
import { useStyles } from './styles';
import { useLayout } from 'src/theme/useLayout';



import img_strata_p from 'assets/img/tokens/strata_p.svg';
import img_ethena_p from 'assets/img/tokens/ethena_p.svg';
import img_ethereal_p from 'assets/img/tokens/ethereal_p.svg';
import img_strata from 'assets/img/StrataLogoPureV2.svg';
import img_share from 'assets/img/share.svg';
import img_pendle from 'assets/img/protocols/pendle.svg';
import img_euler from 'assets/img/protocols/euler.svg';
import img_termmax from 'assets/img/protocols/termmax.svg';
import { ShareReferralModal } from './components/ShareReferralModal';
import { useAuthModal } from 'src/libs/wallet';


export interface PreDepositUiProps {
  preDeposit: TPreDepositData;
  isInitialLoading: boolean;
}

const goToMainnet = () => {
  changeChainId(ChainId.ETHEREUM_MAINNET);
};


const DepositTab = ({ preDeposit }) => {
  return <>
    <PreDepositPanel preDeposit={preDeposit} key='predeposit' />
  </>;
};


const WithdrawTab = ({ preDeposit }) => {
  return <>
    <WithdrawForm preDeposit={preDeposit} key='withdraw' />
  </>;
};


const PreDepositPage: React.FC = () => {
  const [ shareDialogShown, showReferralShareDialog ] = useState(false);
  const { accountAddress } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { data: preDeposit, isLoading: isGetPreDepositsLoading } = useGetPreDeposits({
    accountAddress,
  });
  const styles = useStyles();
  const l = useLayout();
  const [ settingsOpened, setSettingsOpened ] = useState(false);

  if (isGetPreDepositsLoading || preDeposit == null) {
    return <Spinner />;
  }

  const onReferralShareButtonClicked = () => {
    if (!accountAddress) {
      openAuthModal();
      return;
    }
    showReferralShareDialog(true);
  }

  const tabsContent = [
    {
      key: 'deposit',
      title: <><span className='text-icon'>+</span>Deposit</>,
      content: <DepositTab preDeposit={ preDeposit } />,
    },
    {
      key: 'withdraw',
      title: <><span className='text-icon'>-</span>Withdraw</>,
      content: <WithdrawTab preDeposit={ preDeposit } />
    },
  ];

  const onDepositClicked = () => {
    (window.scrollTo({ top: 0, behavior:'smooth' }));
    (document.body.querySelector(`input[name="amountFrom"]`) as any)?.focus();
  }


  return (<>
    {/* { showTestnetHint && <Paper style={{ marginBottom: '50px' }}>
        <Typography style={{ padding: "20px 10px"}}>
        You are viewing the Testnet PRE_DEPOSIT.
        </Typography>

        <PrimaryButton onClick={goToMainnet}>
            Switch to the BNB Chain Mainnet
        </PrimaryButton>

      </Paper>
    } */}

    <div css={styles.infoContainer}>
        <h4>
          <img css={styles.headerStars} src={img_stars_sm} />
          <span css={styles.headerStrats}>Strata</span>
          <span css={styles.headerText}> Season 0</span>
        </h4>
        <p css={styles.infoText}>
          Pre-deposit USDe and eUSDe in the Strata Points Farm. <br/>
          Earn boosted Strata, Ethena and Ethereal Points and more.
        </p>

        <p style={{padding: '0em 0 5em 0'}}>
          <AnchorButton css={styles.button} href='https://mirror.xyz/0xf911b79f573dD758166FB33dE96d2727e25071b6/qCAxCDuU9aCpJcjRWAaEqLlZ0tz7wWKCHG3IU9W3alU' variant='senary'>Learn More</AnchorButton>
        </p>
    </div>

    <div css={styles.container}>
        <PreDepositStatus stakedToken={preDeposit.stakedToken}/>
        <Tabs tabsContent={tabsContent} />
    </div>


    <div css={styles.maximizeContainer}>
        <h4>
           <span css={styles.headerText}>Deposit.</span>&nbsp;&nbsp;
           <span css={styles.headerText}>Earn.</span>&nbsp;&nbsp;
           <span css={[styles.headerText, styles.headerBlue]}>Maximize.</span>
        </h4>
        <p css={styles.infoText}>
          Unlock even greater rewards by using pUSDe across <br />  partner DeFi protocols in the Strata and Ethena ecosystem.
        </p>

        <Box>
          <table css={l.table}>
            <thead>
              <tr>
                <th>Pool</th>
                <th>Rewards</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_strata} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>Strata</div>
                        <div css={l.rowBadge}>Deposit USDe/eUSDe into Strata</div>
                      </div>
                  </div>
                </td>
                <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>

                  30x <TokenIcon token={{asset: img_strata_p}} /> + 30x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />

                </td>
                <td css={l.tableCellPadding}>
                  <TextButton css={[styles.buttonDark, styles.tableAction]} onClick={() => onDepositClicked("strata")}>Deposit</TextButton>
                </td>
              </tr>

              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_pendle} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>Pendle LP (Oct 25)</div>
                        <div css={l.rowBadge}>Deposit pUSDe into Pendle LP</div>
                      </div>
                  </div>
                </td>
                <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>
                  60x <TokenIcon token={{asset: img_strata_p}} /> + 50x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />

                  {/* Soon */}
                </td>
                <td css={l.tableCellPadding}>
                  <AnchorButton
                    css={[styles.buttonDark, styles.tableAction]}
                    href='https://app.pendle.finance/trade/pools/0xf4c449d6a2d1840625211769779ada42857d04dd/zap/in?chain=ethereum'
                    variant='text'
                  >Deposit</AnchorButton>
                  {/* <TextButton disabled css={[styles.buttonDark, styles.tableAction]} >Soon</TextButton> */}
                </td>
              </tr>

              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_pendle} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>Pendle YT (Oct 25)</div>
                        <div css={l.rowBadge}>Deposit pUSDe into Pendle YT</div>
                      </div>
                  </div>
                </td>
                <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>
                  60x <TokenIcon token={{asset: img_strata_p}} /> + 50x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />

                  {/* Soon */}
                </td>
                <td css={l.tableCellPadding}>
                  <AnchorButton
                    css={[styles.buttonDark, styles.tableAction]}
                    href='https://app.pendle.finance/trade/markets/0xf4c449d6a2d1840625211769779ada42857d04dd/swap?view=yt&chain=ethereum'
                    variant='text'
                  >Deposit</AnchorButton>

                  {/* <TextButton disabled css={[styles.buttonDark, styles.tableAction]} >Soon</TextButton> */}
                </td>
              </tr>

              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_euler} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>Euler Strata Frontier</div>
                        <div css={l.rowBadge}>Deposit pUSDe into Euler</div>
                      </div>
                  </div>
                </td>
                <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>
                  30x <TokenIcon token={{asset: img_strata_p}} /> + 30x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />
                </td>
                <td css={l.tableCellPadding}>
                  <AnchorButton
                    css={[styles.buttonDark, styles.tableAction]}
                    href='https://app.euler.finance/?market=frontier-strata&network=ethereum'
                    variant='text'
                  >Deposit</AnchorButton>
                </td>
              </tr>

              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_euler} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>Euler Yield</div>
                        <div css={l.rowBadge}>Deposit PT-pUSDe and borrow</div>
                      </div>
                  </div>
                </td>
                <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>
                  —
                </td>
                <td css={l.tableCellPadding}>
                  <AnchorButton
                    css={[styles.buttonDark, styles.tableAction]}
                    href='https://app.euler.finance/vault/0x2f94Bbe20ECa1e3f9332aA93A90920a0a5be0728?network=ethereum'
                    variant='text'
                  >Deposit</AnchorButton>
                </td>
              </tr>

              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_termmax} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>TermMax (Oct 25)</div>
                        <div css={l.rowBadge}>Deposit pUSDe and borrow</div>
                      </div>
                  </div>
                </td>
                <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>
                  30x <TokenIcon token={{asset: img_strata_p}} /> + 30x <TokenIcon token={{asset: img_ethena_p }} /> + <TokenIcon token={{asset: img_ethereal_p }} />
                </td>
                <td css={l.tableCellPadding}>
                  <AnchorButton
                    css={[styles.buttonDark, styles.tableAction]}
                    href='https://app.termmax.ts.finance/market/eth/0xf2e6884a0520373bd92dfc49ce7d7ee69e6022bd?chain=eth&persistChain=1&orderAddress=0xe6c31e7cee0442551361fe1aba279a31dfd8ee0c&type=borrow'
                    variant='text'
                  >Deposit</AnchorButton>
                  {/* <TextButton disabled css={[styles.buttonDark, styles.tableAction]} >Soon</TextButton> */}
                </td>
              </tr>

              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_termmax} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>TermMax (Oct 25)</div>
                        <div css={l.rowBadge}>Deposit PT-pUSDe and borrow</div>
                      </div>
                  </div>
                </td>
                <td css={[l.tableCellPadding, l.inlineHeight, l.pointsRow]}>
                  —
                </td>
                <td css={l.tableCellPadding}>
                  <AnchorButton
                    css={[styles.buttonDark, styles.tableAction]}
                    href='https://app.termmax.ts.finance/market/eth/0x91cfbffe825280e2eed995a17fe08c88635d7f0e?chain=eth&persistChain=1&orderAddress=0xc810dba29b358926081ef1fc24ca98eb4f0535fa&type=borrow'
                    variant='text'
                  >Deposit</AnchorButton>
                  {/* <TextButton disabled css={[styles.buttonDark, styles.tableAction]} >Soon</TextButton> */}
                </td>
              </tr>


            </tbody>
            {/* <tfoot>
              <tr>
                <td></td>
              </tr>
            </tfoot> */}
          </table>
        </Box>
        <hr css={l.hr}/>

        <Box>
          <table css={[l.table]} className='noHeader'>
            <tbody>
              <tr>
                <td css={l.tableCellFullWith}>
                  <div css={l.row}>
                     <div css={l.rowIcon} > <img src={img_share} style={{height: '34px'}}/> </div>
                     <div>
                        <div css={l.rowTitle}>Share your referral link</div>
                        <div css={l.rowBadge}>10% of referee’s total points</div>
                      </div>
                  </div>
                </td>
                <td css={l.tableCellPadding}>
                  <TextButton css={[styles.buttonDark, styles.tableAction]} onClick={onReferralShareButtonClicked}>
                    { accountAddress ? 'Share' : 'Connect'}
                  </TextButton>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
    </div>

    <ShareReferralModal isOpen={shareDialogShown} handleClose={() => showReferralShareDialog(false) }/>


    <div css={styles.faqContainer}>
        <div css={styles.faqContainerInfo}>
          <div className='title1'>Everything you</div>
          <div className='title2'>need to know</div>
          <AnchorButton css={styles.button} href='https://docs.strata.money/resources/faqs' variant='senary'>All FAQs</AnchorButton>
        </div>
        <div>
          <FaqItems />
        </div>
    </div>

  </>);
};

const FaqItem = ({ title, opened, handleToggle, children }) => {
  const styles = useStyles();
  // const [ opened, setOpen ] = React.useState(false);
  return (
    <div css={styles.accordion} className={ opened ? '' : 'collapsed'} >
      <h4 className='accordion-header'>
          <button className={ opened ? 'accordion-button' : 'accordion-button collapsed'} onClick={() => handleToggle()}>
            {title}
          </button>
      </h4>
      <div className='accordion-collapse collapse'>
        <div className={ opened ? 'accordion-body' : 'accordion-body collapsed'}>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}

const FaqItems = () => {
  const [idx, setIdx] = React.useState(-1);
  const toggle = (i: number) => {
    if (i === idx) {
      setIdx(-1);
      return;
    }
    setIdx(i);
  };
  return <>
    <FaqItem title='What is Strata?' opened={idx === 0} handleToggle={() => toggle(0)}>
      Strata is a perpetual yield tranching protocol designed to offer structured yields on USDe — Ethena’s synthetic dollar backed by delta-neutral positions on blue-chip crypto assets. Strata enables investors to tailor their risk-return preferences while earning crypto-native returns from carry and basis trade strategies through two risk tranches: Senior and Junior.

  The protocol introduces two liquid and composable tokens built on Ethena’s reward-bearing synthetic dollar, sUSDe: <a href='https://docs.strata.money/overview/stusde' target='_blank'>Strata USDe (stUSDe)</a>  and <a href='https://docs.strata.money/overview/stjlp' target='_blank'>Strata Junior Liquidity Pool (stJLP)</a>. For more details, visit the <a href='https://docs.strata.money' target='_blank'>Strata Docs</a>.

    </FaqItem>
    <FaqItem title='What is Strata Season 0?' opened={idx === 1} handleToggle={() => toggle(1)}>
      Season 0 is the first step in our journey toward the mainnet deployment. This pre-launch, pre-deposit phase is designed to kickstart our platform, onboard USDe collateral, and introduce the Strata Points points program. Users who participate in Season 0 receive boosted Strata Points, along with Ethena and Ethereal points, plus additional rewards.
    </FaqItem>
    <FaqItem title='What is pUSDe?' opened={idx === 2} handleToggle={() => toggle(2)}>
      pUSDe is the receipt token for depositing USDe or eUSDe into the Strata Season 0 points farm on Ethereum Mainnet. Holders earn boosted Strata Points, along with Ethena Points, Ethereal Points, and additional rewards. It’s a liquid, composable token, 1:1 backed by USDe, instantly redeemable with no lock-up, and usable across DeFi protocols in the Strata and Ethena ecosystems to further maximize rewards.
    </FaqItem>
    <FaqItem title='Which assets can be deposited in Season 0?' opened={idx === 3} handleToggle={() => toggle(3)}>
      At launch, users will be able to mint pUSDe by depositing Ethena’s USDe or Ethereal’s eUSDe and earn boosted rewards. Over time, Strata will support additional 1:1 USDe wrappers from other projects launching pre-deposits within the Ethena and Converge ecosystems. Follow us on <a href='https://x.com/strata_money' target='_blank'>X</a> and join our <a href='https://discord.gg/sHtZDvTPxB' target='_blank'>Discord</a> community to stay updated on future announcements.
    </FaqItem>
    <FaqItem title='Is there a lock‑up period?' opened={idx === 4} handleToggle={() => toggle(4)}>
      No, withdrawals can be made at any time for USDe or eUSDe — instantly and without any lock-up.
    </FaqItem>
    <FaqItem title='How can I maximize my Strata Points and other rewards?' opened={idx === 5} handleToggle={() => toggle(5)}>
        Maximize your rewards by:
        <ol>
          <li>Depositing into the Strata points farm and holding pUSDe to earn Strata Points + Ethena Points + Ethereal Points. Hold longer, earn more.</li>
          <li>Using pUSDe across the DeFi ecosystem to amplify your rewards with the boosted multipliers.</li>
          <li>Using Strata’s referral program. Share your referral link with your friends and earn 10% of the total points they earn.</li>
        </ol>
    </FaqItem>
    <FaqItem title='How long is Season 0 expected to run?' opened={idx === 6} handleToggle={() => toggle(6)}>
      Season 0 is expected to run until the launch of the Strata protocol with stUSDe and stJLP, and we aim to conclude it within three months of launching pre-deposits.

    </FaqItem>
  </>
}

export default PreDepositPage;
