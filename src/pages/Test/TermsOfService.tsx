/** @jsxImportSource @emotion/react */
import { Fade, Paper } from '@mui/material';
import React from 'react';


import { useNavigate } from 'react-router';
import { useStyles } from './PrivacyPolicyCss';
import { Button, Icon } from 'src/components';
import { routes } from 'src/constants/routing';


export const TermsOfService: React.FC<any> = ({  }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(routes.preDeposit.path);
  };
  return <Paper css={styles.docs}>

    <Button css={styles.closeButton} onClick={handleBack} variant='text' className='transparent'>
        <Icon name="close" size={`32`} />
    </Button>

    <h1>Terms of Service</h1>
    <p><em>Last Revised: 28  July 2025</em></p>
    <hr/>

    <h4>IMPORTANT NOTICE — READ CAREFULLY</h4>
    <p>BY CLICKING “I AGREE,” CONNECTING A DIGITAL‑ASSET WALLET, OR OTHERWISE ACCESSING OR USING THE PLATFORM OR ANY SERVICES (AS DEFINED BELOW), YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD AND AGREE TO BE LEGALLY BOUND BY THESE TERMS OF SERVICE (THE “TERMS” OR THIS “AGREEMENT”). IF YOU DO NOT ACCEPT EVERY PROVISION OF THESE TERMS, DO NOT ACCESS OR USE THE SERVICES.</p>

    <hr/>

    <strong>PLAIN‑ENGLISH SUMMARY</strong>
    <ul>
      <li>The interface is non‑custodial—you alone control your wallet and assets.</li>
      <li>Crypto is high‑risk—you may lose your entire balance and transactions are irreversible.</li>
      <li>Pre‑deposits confer no token right, yield, or launch guarantee.</li>
      <li>Do NOT use the Services from the United States, sanctioned countries, or other Restricted Jurisdictions.</li>
      <li>Bentobox Labs gives no financial, tax, or legal advice and is not your broker or agent.</li>
      <li>Disputes are subject to binding Sharjah arbitration and no class actions.</li>
    </ul>
    <p>This summary is for convenience only and is not legally binding. Read the full Terms.</p>

    <hr/>

    <h3>1. DEFINITIONS AND INTERPRETATION</h3>
    <ul>
      <li><strong>Affiliate</strong> – Entity under common control.</li>
      <li><strong>Applicable Law</strong> – All applicable laws and regulations.</li>
      <li><strong>Bentobox Labs</strong> – Bentobox Labs LLC, registered in Sharjah Media City Free Zone.</li>
      <li><strong>Digital Asset</strong> – Token recorded on a distributed ledger.</li>
      <li><strong>Digital Asset Wallet</strong> – Non‑custodial wallet that stores private keys.</li>
      <li><strong>Force Majeure Event</strong> – See Clause 27.2.</li>
      <li><strong>Party</strong> – You and/or Bentobox Labs.</li>
      <li><strong>Person</strong> – Individual or legal entity.</li>
      <li><strong>Platform</strong> – <a href="https://www.strata.money">strata.money</a> and associated interfaces.</li>
      <li><strong>Protocol</strong> – Open‑source smart contracts known as “Strata”.</li>
      <li><strong>Restricted Jurisdiction</strong> – See Clause 3.2.</li>
      <li><strong>Services</strong> – Platform and associated functionality.</li>
      <li><strong>User</strong> – You.</li>
    </ul>

    <hr/>

    <h3>2. ACCEPTANCE, MODIFICATIONS AND PRE‑DEPOSIT DISCLOSURES</h3>
    <ul>
      <li><strong>2.1 Acceptance</strong> – You accept by using the Services.</li>
      <li><strong>2.2 Modifications</strong> – Terms may change. Continued use means acceptance.</li>
      <li><strong>2.3 Pre‑Deposit Contracts</strong> – Includes disclosures that:
        <ul>
          <li>There’s no guarantee of launch or entitlements.</li>
          <li>Contracts may contain bugs despite audits.</li>
          <li>Deposits are non-custodial and uninsured.</li>
          <li>Withdrawals are possible before launch with gas fees.</li>
        </ul>
      </li>
    </ul>

    <hr/>

    <h3>3. ELIGIBILITY</h3>
    <ul>
      <li><strong>3.1</strong> – You must be 18+, legally capable, and not a Prohibited Person.</li>
      <li><strong>3.2</strong> – Prohibited Persons include:
        <ul>
          <li>Residents of the U.S. or sanctioned jurisdictions.</li>
          <li>Listed persons under OFAC, UN, EU, or UK sanctions.</li>
        </ul>
      </li>
      <li><strong>3.3</strong> – Use of VPNs to bypass restrictions is prohibited.</li>
    </ul>

    <hr/>

    <h3>4. DIGITAL‑ASSET WALLETS</h3>
    <ul>
      <li><strong>4.1</strong> – Services are non‑custodial.</li>
      <li><strong>4.2</strong> – You are fully responsible for your wallet keys and credentials.</li>
      <li><strong>4.3</strong> – Wallet tools are third-party; Bentobox Labs has no control or liability.</li>
    </ul>

    <hr/>

    <h3>5. THE PLATFORM AND THE PROTOCOL</h3>
    <ul>
      <li>Bentobox Labs does not control the Protocol or any blockchain network.</li>
      <li>All Protocol use involves risk.</li>
      <li>No fiduciary or brokerage relationship exists.</li>
    </ul>

    <hr/>

    <h3>6. THIRD‑PARTY SERVICES</h3>
    <p>The Platform may link to third-party services. Use at your own risk.</p>

    <hr/>

    <h3>7. REWARDS AND AIRDROPS</h3>
    <p>All incentives are discretionary and not guaranteed. They may be taxable.</p>

    <hr/>

    <h3>8. RISK DISCLOSURES</h3>
    <p>You assume all risks, including loss of funds, exploits, and regulatory action. No legal or financial advice is provided.</p>

    <hr/>

    <h3>9. USER COVENANTS AND COMPLIANCE</h3>
    <ul>
      <li>You agree to comply with all applicable laws.</li>
      <li>No fiduciary duty is owed to you.</li>
      <li>You may be required to provide KYC/AML information.</li>
    </ul>

    <hr/>

    <h3>10. PROHIBITED USES</h3>
    <p>No illegal activity, fraud, infringement, malware, or circumvention of restrictions.</p>

    <hr/>

    <h3>11. CHANGES, SUSPENSION AND TERMINATION</h3>
    <p>Services may be changed or terminated without notice. Certain clauses survive termination.</p>

    <hr/>

    <h3>12. INTELLECTUAL PROPERTY</h3>
    <p>Bentobox Labs owns the intellectual property. You get a limited, revocable license to use the Platform.</p>

    <hr/>

    <h3>13. DATA PRIVACY</h3>
    <p>Data use is governed by the Privacy Policy.</p>

    <hr/>

    <h3>14. PROMOTIONS AND FEEDBACK</h3>
    <p>Promotions may be withdrawn at any time. Feedback may be used freely by Bentobox Labs.</p>

    <hr/>

    <h3>15. CHARGES AND FEES</h3>
    <p>You are responsible for gas fees and disclosed interface fees. Reverted transactions are still subject to network fees.</p>

    <hr/>

    <h3>16. NO WARRANTIES</h3>
    <p>Services are provided “as is” without warranties of any kind.</p>

    <hr/>

    <h3>17. INDEMNIFICATION</h3>
    <p>You agree to indemnify Bentobox Labs for any claims from your breach or misuse.</p>

    <hr/>

    <h3>18. LIMITATION OF LIABILITY</h3>
    <p>Liability is capped at US$500 or the fees you paid in the past 12 months. Bentobox Labs is not liable for indirect damages, unless prohibited by law.</p>

    <hr/>

    <h3>19. NO SECURITIES OFFERING</h3>
    <p>Services do not constitute securities or regulated financial products.</p>

    <hr/>

    <h3>20. TAXES</h3>
    <p>You are responsible for any taxes that arise from your use.</p>

    <hr/>

    <h3>21. UAE REGULATORY STATUS</h3>
    <p>Bentobox Labs is currently outside the scope of UAE VASP regulation but may seek licensing if future activities require it.</p>

    <hr/>

    <h3>22. DISPUTE RESOLUTION AND ARBITRATION</h3>
    <ul>
      <li>60-day informal resolution period.</li>
      <li>Binding arbitration in Sharjah, UAE under TAHKEEM rules.</li>
      <li>No class actions.</li>
      <li>30-day opt-out available via email.</li>
    </ul>

    <hr/>

    <h3>23. GOVERNING LAW</h3>
    <p>Governed by Sharjah and UAE federal law.</p>

    <hr/>

    <h3>24. NOTICES</h3>
    <p>Bentobox Labs may notify you via Platform or email. Legal notices go to <a href="mailto:legal@bentoboxlabs.xyz">legal@bentoboxlabs.xyz</a>.</p>

    <hr/>

    <h3>25. ASSIGNMENT</h3>
    <p>You cannot assign your rights; Bentobox Labs can.</p>

    <hr/>

    <h3>26. SURVIVAL</h3>
    <p>Several clauses remain in effect after termination.</p>

    <hr/>

    <h3>27. MISCELLANEOUS</h3>
    <ul>
      <li><strong>Entire Agreement</strong> – These Terms are the full agreement.</li>
      <li><strong>Force Majeure</strong> – No liability for events beyond reasonable control.</li>
      <li><strong>Severability</strong> – Invalid parts do not affect the rest.</li>
      <li><strong>Waiver</strong> – Must be in writing.</li>
      <li><strong>Relationship</strong> – No partnership or agency is created.</li>
    </ul>

    <hr/>
    <p>© 2025 Bentobox Labs LLC. All rights reserved.</p>
    <hr/>



  </Paper>
};


