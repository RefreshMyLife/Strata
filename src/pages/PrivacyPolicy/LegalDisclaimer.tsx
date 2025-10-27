/** @jsxImportSource @emotion/react */
import { Fade, Paper } from '@mui/material';
import React from 'react';


import { RouteComponentProps } from 'react-router';
import { useStyles } from './PrivacyPolicyCss';


export const LegalDisclaimer: React.FC<RouteComponentProps> = ({ history, location }) => {
  const styles = useStyles();
  return <Paper css={styles.docs}>

  <h1>Legal Disclaimer</h1>

<p>The protocol is currently under development and has not yet launched. This pre-deposit phase allows participants to voluntarily deposit assets in advance of the anticipated protocol deployment. Participation is entirely optional and does not entitle you to any future benefit, token allocation, or yield.</p>

<p>Deposits are not locked and may be withdrawn at any time prior to the protocol's official launch, subject to network conditions and applicable transaction fees.</p>

<p>Please carefully review the following:</p>

<hr />

<h3>1. No Guarantees</h3>

<ul>
    <li>The protocol is still in development.</li>
    <li>The timeline for launch is uncertain, and development may take significantly longer than anticipated.</li>
    <li>There is no guarantee that the protocol will launch, or that any specific features or functions will be implemented.</li>
</ul>

<h3>2. Technical and Security Risks</h3>

<ul>
    <li>The smart contracts associated with the pre-deposit phase have not completed final security audits and may contain bugs or vulnerabilities.</li>
    <li>You may lose all deposited assets as a result of unforeseen contract behavior, protocol failure, or malicious exploitation.</li>
</ul>

<h3>3. No Custody or Guarantee</h3>

<ul>
    <li>No entity is acting as a custodian of deposited assets.</li>
    <li>There is no insurance, guarantee, or recourse in the event of loss.</li>
</ul>

<h3>4. No Offer or Solicitation</h3>

<ul>
    <li>This pre-deposit opportunity does not constitute an offer to sell, or the solicitation of an offer to buy, any security, investment contract, or other financial instrument.</li>
    <li>Deposits made during this phase are not investments and do not create any ownership, creditor, or other enforceable rights in or against any entity, team, or protocol.</li>
</ul>

<hr />

<h3>By interacting with the pre-deposit contracts, you represent and warrant that:</h3>

<ul>
    <li>You are not a citizen or resident of any jurisdiction where participation in decentralized protocols or cryptocurrency-related activities is prohibited by law.</li>
    <li>You are sophisticated and knowledgeable in the use of blockchain-based software systems, including risks related to smart contracts and token transfers.</li>
    <li>You are acting solely for your own account and not as an agent or representative of any other person or entity.</li>
    <li>You understand and accept the risks involved, including the total loss of deposited assets, delay or cancellation of the protocol launch, and absence of any legal remedies.</li>
    <li>You are not relying on any statements, representations, or omissions by the team or any affiliated party as a basis for your decision to participate.</li>
</ul>

<p>Participation in the pre-deposit phase is entirely at your own risk. There is no assurance that any future launch, distribution, or feature set will occur, and no promises or commitments are being made by the team or any affiliated entity.</p>

<p>This disclaimer is in addition to Strata's Terms of Service, which you hereby agree to by your use of the protocol and participation in this phase.</p>


  </Paper>
};


