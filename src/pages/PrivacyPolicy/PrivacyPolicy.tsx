/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router';
import { useStyles } from './PrivacyPolicyCss';


export const PrivacyPolicy: React.FC<any> = ({ }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const handleBack = () => {
    // Use requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
      navigate(-1);
    });
  };

  return (
    <div css={styles.content}>
      <button css={styles.backButton} onClick={handleBack}>
        <svg css={styles.backIcon} viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.866097 2.60014L3.53276 0.600072C3.86237 0.352851 4.33276 0.588041 4.33276 1.00007L4.33276 5.00007C4.33276 5.41209 3.86239 5.64728 3.53277 5.40007L0.866097 3.40013C0.599431 3.20014 0.599431 2.80014 0.866097 2.60014Z" fill="#90A0AC" fillOpacity="0.8" />
        </svg>
        <span css={styles.backText}>Back</span>
      </button>
      <p><strong>STRATA – PRIVACY NOTICE</strong></p>

      <p><em>Last Updated: October 2025</em></p>
      <hr/>

      <p>This Privacy Policy (the “Policy”) explains how independent contributors and infrastructure operators providing access to the Strata Interface (collectively, the “Interface Providers,” “we,” “us,” or “our”) process limited technical and pseudonymous data when you access <a href="https://www.strata.money">https://www.strata.money</a> or interact with any related Interface components that enable connection to decentralised smart contracts (the “Interface”).</p>

      <p><strong>By accessing or using the Interface, you acknowledge that you have read and understood this Policy. If you do not agree, you should not use the Interface.</strong></p>

      <p>The Interface is non-custodial and permissionless. We do not create user accounts, custody assets, or collect personal identity information.</p>

      <p><strong>1. Personal data We Collect</strong></p>

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
            <td><strong>Wallet Data</strong></td>
            <td>Public blockchain addresses, on-chain interactions</td>
            <td>Public blockchains / user input</td>
          </tr>
          <tr>
            <td><strong>Device &amp; Usage Data</strong></td>
            <td>IP address, browser type/version, operating system, timestamps, request metadata</td>
            <td>Automatically via access logs</td>
          </tr>
          <tr>
            <td><strong>Support Communications</strong></td>
            <td>Emails or messages voluntarily sent to support</td>
            <td>User-initiated contact</td>
          </tr>
          <tr>
            <td><strong>Aggregated / De-identified Data</strong></td>
            <td>Usage metrics that cannot reasonably identify an individual</td>
            <td>Derived internally</td>
          </tr>
        </tbody>
      </table>

      <p>We do not collect names, government IDs, precise geolocation, or biometric/sensitive categories of data.</p>

      <p><strong>2. How We Use Technical Data</strong></p>

      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Operate &amp; Secure the Interface</strong></td>
            <td>We use basic technical data only to enable wallet connections, protect the Interface from abuse, and ensure it remains available and functional</td>
          </tr>
          <tr>
            <td><strong>Performance &amp; Diagnostics</strong></td>
            <td>Improve reliability, debug errors, analyse traffic patterns</td>
          </tr>
          <tr>
            <td><strong>Compliance Controls</strong></td>
            <td>Apply geographic or sanctions-based restrictions in accordance with the Terms of Use</td>
          </tr>
          <tr>
            <td><strong>Support Responses</strong></td>
            <td>Respond to voluntary enquiries received via email</td>
          </tr>
          <tr>
            <td><strong>Aggregated Insights</strong></td>
            <td>Produce non-identifiable data for ecosystem transparency or research</td>
          </tr>
        </tbody>
      </table>

      <p>We do not sell data, conduct behavioural advertising, or engage in automated decision-making with legal or significant effects.</p>

      <p><strong>3. Legal Bases For Processing</strong></p>

      <ul>
        <li><strong>Contract Necessity</strong> – to enable technical access to the Interface;</li>
        <li><strong>Legitimate Interests</strong> – security, anti-abuse, diagnostics, protocol improvement;</li>
        <li><strong>Legal Obligations</strong> – compliance with sanctions enforcement where required;</li>
        <li><strong>Consent</strong> – only for optional communications, where explicitly provided.</li>
      </ul>

      <p><strong>4. Disclosure Of Data</strong></p>

      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Service Providers</strong></td>
            <td>Hosting, analytics, security tools under confidentiality obligations</td>
          </tr>
          <tr>
            <td><strong>Legal / Regulatory Authorities</strong></td>
            <td>If required by applicable law, sanctions, or court order</td>
          </tr>
          <tr>
            <td><strong>Successor Entities</strong></td>
            <td>A future Cayman Islands foundation or governance entity may assume responsibilities</td>
          </tr>
          <tr>
            <td><strong>With Your Consent</strong></td>
            <td>Any additional disclosure expressly authorised by you</td>
          </tr>
        </tbody>
      </table>

      <p>We may share aggregated or de-identified data that cannot reasonably identify any user.</p>

      <p><strong>5. Cookies &amp; Local Storage</strong></p>

      <ul>
        <li>Interface functionality and preferences (e.g., language, layout)</li>
        <li>Basic, non-invasive analytics (without tracking or profiling)</li>
      </ul>

      <p>You may disable cookies in your browser, though some functionality may be limited. We do not respond to “Do Not Track” signals.</p>

      <p><strong>6. User Rights</strong></p>

      <ul>
        <li>Access, correct, or request deletion of data you voluntarily submitted (e.g., support emails);</li>
        <li>Restrict or object to certain processing;</li>
        <li>Withdraw consent (where applicable);</li>
        <li>Lodge a complaint with a data protection authority.</li>
      </ul>

      <p>Due to the pseudonymous and decentralized nature of the Interface, practical fulfillment of certain data rights may be limited for blockchain-based interactions and wallet-related data. Many data rights cannot be fulfilled for on-chain activities or pseudonymous wallet addresses, as these exist on immutable public infrastructure outside our control.</p>

      <p>To exercise rights, contact: <a href="mailto:support@strata.money"><strong>support@strata.money</strong></a></p>

      <p><strong>7. International &amp; Decentralised Operations</strong></p>

      <p>The Interface relies on decentralised and global infrastructure. Data may be processed or routed through multiple jurisdictions inherent to blockchain systems. By using the Interface, you acknowledge such international and technical transfers.</p>

      <p><strong>8. Security</strong></p>

      <p>The Interface employs basic technical measures for operational security, consistent with its non-custodial, pseudonymous nature, including:</p>

      <ul>
        <li>Encryption in transit (where applicable);</li>
        <li>Access controls and monitoring;</li>
        <li>Regular security assessments.</li>
      </ul>

      <p>We <strong>do not</strong> hold private keys, seed phrases, or user credentials. You are solely responsible for securing your wallet and devices.</p>

      <p><strong>9. Data Retention</strong></p>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Typical Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>On-chain data</td>
            <td>Permanent (public blockchain; not controlled by us)</td>
          </tr>
          <tr>
            <td>Technical logs</td>
            <td>Up to 30 days (unless required for ongoing security investigation)</td>
          </tr>
          <tr>
            <td>Support communications</td>
            <td>Up to 3 years post-contact</td>
          </tr>
          <tr>
            <td>Aggregated / anonymised data</td>
            <td>Indefinite (non-identifiable)</td>
          </tr>
        </tbody>
      </table>

      <p><strong>10. Age Eligibility</strong></p>

      <p>The Interface is not intended for individuals under 18. We do not knowingly process data relating to minors. If you believe a minor has interacted with the Interface, contact <a href="mailto:support@strata.money"><strong>support@strata.money</strong></a></p>

      <p><strong>11. Third-Party Links &amp; Integrations</strong></p>

      <p>Third-party wallets or interfaces accessed through the Interface are governed by their own privacy practices. We are not responsible for third-party handling of data.</p>

      <p><strong>12. Changes To This Policy</strong></p>

      <p>We may modify this Policy. The “Last Revised” date indicates the current version. Continued use of the Interface after updates constitutes acceptance of the revised Policy.</p>

      <p><strong>13. Contact</strong></p>

      <p>For questions or data-related requests, contact:<br/>
      <a href="mailto:support@strata.money"><strong>support@strata.money</strong></a></p>

      <p>A future Cayman-based governance entity may adopt this Policy upon public notice.</p>

    </div>
  );
};


