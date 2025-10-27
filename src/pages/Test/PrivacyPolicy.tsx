/** @jsxImportSource @emotion/react */
import { Fade, Paper } from '@mui/material';
import React from 'react';

import { useNavigate } from 'react-router';
import { useStyles } from './PrivacyPolicyCss';
import { routes } from 'src/constants/routing';
import { Button, Icon } from 'src/components';


export const PrivacyPolicy: React.FC<any> = ({ }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(routes.preDeposit.path);
  };

  return <Paper css={styles.docs}>
    <Button css={styles.closeButton} onClick={handleBack} variant='text' className='transparent'>
        <Icon name="close" size={`32`} />
    </Button>
    <h1>Privacy Policy</h1>
    <p><em>Last Revised: 28  July 2025</em></p>
    <hr/>

    <p>This Privacy Policy (the “Policy”) explains how Bentobox Labs LLC ("Bentobox Labs", "we", "us" or "our") collects, uses, discloses and safeguards Personal Data when you visit <a href="https://www.strata.money">https://www.strata.money</a> or use any related applications, products or services (collectively, the “Services”). By accessing or using the Services, you acknowledge that you have read and understood this Policy. If you do not agree, please do not use the Services.</p>

    <p>Bentobox Labs LLC is a technology company incorporated in Sharjah Media City Free Zone (Shams), Sharjah, United Arab Emirates, formation no. 2326826, business‑licence no. 2326826.01.</p>

    <hr/>

    <h3>1. PERSONAL DATA WE COLLECT</h3>

    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Examples</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Wallet Data</td>
          <td>Public blockchain addresses, on‑chain transactions, token balances</td>
          <td>Public blockchains, user input</td>
        </tr>
        <tr>
          <td>Contact Data</td>
          <td>E‑mail address, support tickets, feedback forms</td>
          <td>User input</td>
        </tr>
        <tr>
          <td>Device &amp; Usage Data</td>
          <td>IP address, browser type/version, operating system, referring URL, clickstream data, time‑stamp</td>
          <td>Automated via cookies and server logs</td>
        </tr>
        <tr>
          <td>Third‑Party Integration Data</td>
          <td>Analytics events, referral codes, partner‑integration metadata</td>
          <td>Third‑party providers</td>
        </tr>
        <tr>
          <td>Support Communications</td>
          <td>Chat transcripts, e‑mails with our support team</td>
          <td>User input</td>
        </tr>
        <tr>
          <td>Aggregated / De‑identified Data</td>
          <td>Statistical metrics that cannot reasonably identify an individual</td>
          <td>Derived internally</td>
        </tr>
      </tbody>
    </table>

    <p>We do not intentionally collect names, national ID numbers, precise geolocation, or special‑category data (e.g., health, biometric or political‑opinion data).</p>

    <hr/>

    <h3>2. HOW WE USE PERSONAL DATA</h3>

    <table>
      <thead>
        <tr>
          <th>Purpose</th>
          <th>Examples</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Operate &amp; secure the Services</td>
          <td>Provide wallet‑connect functionality; prevent fraud and abuse; debug and monitor performance; enforce our Terms of Service</td>
        </tr>
        <tr>
          <td>Customer support</td>
          <td>Respond to enquiries and resolve issues</td>
        </tr>
        <tr>
          <td>Analytics &amp; product improvement</td>
          <td>Measure usage, improve user experience, develop new features</td>
        </tr>
        <tr>
          <td>Marketing &amp; communications</td>
          <td>Send newsletters or product updates (you may opt‑out at any time)</td>
        </tr>
        <tr>
          <td>Legal &amp; compliance</td>
          <td>Comply with AML/CFT, sanctions, tax or other regulatory obligations</td>
        </tr>
        <tr>
          <td>Corporate transactions</td>
          <td>Conduct due‑diligence or transfer assets in a merger, acquisition, financing or re‑organisation</td>
        </tr>
        <tr>
          <td>Aggregation / anonymisation</td>
          <td>Produce de‑identified statistics for research, business or ecosystem purposes</td>
        </tr>
      </tbody>
    </table>

    <p>We do not sell Personal Data and do not engage in automated decision‑making that produces legal or similarly significant effects.</p>

    <hr/>

    <h3>3. LEGAL BASES FOR PROCESSING</h3>
    <p>Where applicable data‑protection law (e.g., EU GDPR, UK GDPR or the UAE Federal Decree‑Law No. 45 of 2021) requires a lawful basis, we rely on:</p>
    <ul>
      <li>Contract necessity – operating and providing the Services you request.</li>
      <li>Legitimate interests – security, fraud prevention, analytics and product improvement (balanced against your rights).</li>
      <li>Consent – sending marketing e‑mails (withdraw at any time by clicking “unsubscribe”).</li>
      <li>Legal obligations – compliance with sanctions screening, anti‑money‑laundering and tax laws.</li>
    </ul>

    <hr/>

    <h3>4. DISCLOSURE OF PERSONAL DATA</h3>

    <table>
      <thead>
        <tr>
          <th>Recipient</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Service Providers</td>
          <td>Cloud hosting, analytics, customer‑support platforms, security vendors, e‑mail delivery (bound by written data‑processing agreements)</td>
        </tr>
        <tr>
          <td>Legal / Regulatory Authorities</td>
          <td>Where required to comply with law, court order or applicable sanctions, or to protect rights, property or safety</td>
        </tr>
        <tr>
          <td>Corporate Successors</td>
          <td>As part of, or during negotiations for, a merger, acquisition, asset sale or similar transaction</td>
        </tr>
        <tr>
          <td>Others with Your Consent</td>
          <td>Any additional disclosure you explicitly authorise</td>
        </tr>
      </tbody>
    </table>

    <p>We may share aggregated or de‑identified data that cannot reasonably be used to identify you.</p>

    <hr/>

    <h3>5. COOKIES AND SIMILAR TECHNOLOGIES</h3>
    <p>We use:</p>
    <ul>
      <li>Essential cookies – enable core site functionality and security;</li>
      <li>Analytics cookies – collect pseudonymous usage metrics via tools such as Plausible or Google Analytics.</li>
    </ul>
    <p>You can disable cookies in your browser settings, but some features may not function. We do not respond to “Do Not Track” signals.</p>

    <hr/>

    <h3>6. YOUR RIGHTS</h3>
    <p>Depending on your jurisdiction, you may have the right to:</p>
    <ul>
      <li>Access, correct or delete Personal Data;</li>
      <li>Restrict or object to processing;</li>
      <li>Port your Personal Data to another controller in a structured, machine‑readable format;</li>
      <li>Withdraw consent to marketing communications;</li>
      <li>Lodge a complaint with your local data‑protection authority.</li>
    </ul>
    <p>To exercise these rights, e‑mail <a href="mailto:privacy@bentoboxlabs.xyz">privacy@bentoboxlabs.xyz</a>. We may ask you to verify your identity.</p>

    <hr/>

    <h3>7. INTERNATIONAL TRANSFERS</h3>
    <p>Personal Data may be processed in, and transferred to, countries outside your home jurisdiction (including the European Economic Area, the UAE and the United States) that may not provide the same level of data protection. Where legally required, we implement appropriate safeguards—such as Standard Contractual Clauses or Intra‑Group Data‑Transfer Agreements—to protect your Personal Data.</p>

    <hr/>

    <h3>8. DATA SECURITY</h3>
    <p>We employ commercially reasonable administrative, technical and physical safeguards, including:</p>
    <ul>
      <li>TLS encryption in transit and encryption at rest;</li>
      <li>Access controls on a least‑privilege basis;</li>
      <li>Continuous monitoring, vulnerability scanning and periodic penetration testing.</li>
    </ul>
    <p>No transmission or storage system is 100 % secure; you are responsible for safeguarding wallet keys, seed phrases and device credentials.</p>

    <hr/>

    <h3>9. DATA RETENTION</h3>

    <table>
      <thead>
        <tr>
          <th>Data Category</th>
          <th>Typical Retention Period</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Wallet &amp; blockchain data</td>
          <td>Recorded on public ledgers (indefinite)</td>
        </tr>
        <tr>
          <td>Contact &amp; support data</td>
          <td>3 years after last interaction</td>
        </tr>
        <tr>
          <td>Server logs</td>
          <td>12 months</td>
        </tr>
        <tr>
          <td>Marketing lists</td>
          <td>Until you unsubscribe</td>
        </tr>
        <tr>
          <td>Aggregated / de‑identified data</td>
          <td>Indefinite</td>
        </tr>
      </tbody>
    </table>

    <p>We retain Personal Data only as long as necessary for the purposes set out in this Policy or as required by law.</p>

    <hr/>

    <h3>10. CHILDREN</h3>
    <p>The Services are not directed to individuals under 18 years of age. We do not knowingly collect data from children. If you learn that a minor has provided Personal Data, please contact <a href="mailto:privacy@bentoboxlabs.xyz">privacy@bentoboxlabs.xyz</a> and we will delete it.</p>

    <hr/>

    <h3>11. THIRD‑PARTY LINKS AND FEATURES</h3>
    <p>Links or integrations to third‑party websites, wallets or protocols are operated by those third parties, and their privacy practices apply. Bentobox Labs is not responsible for such practices.</p>

    <hr/>

    <h3>12. CHANGES TO THIS POLICY</h3>
    <p>We may modify this Policy at any time. Material changes will be announced via banner on the Platform or e‑mail where feasible. The “Last updated” date indicates the effective version. Continued use of the Services after an update constitutes acceptance of the revised Policy.</p>

    <hr/>

    <h3>13. CONTACT</h3>
    <p>Questions, concerns or requests? E‑mail <a href="mailto:privacy@bentoboxlabs.xyz">privacy@bentoboxlabs.xyz</a> or write to Bentobox Labs LLC, Sharjah Media City (Shams), Sharjah, United Arab Emirates.</p>

    <hr/>

    <p>© 2025 Bentobox Labs LLC. All rights reserved.</p>
    <hr/>

  </Paper>
};


