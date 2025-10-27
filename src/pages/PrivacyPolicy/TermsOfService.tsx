/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router';

import { useStyles } from './PrivacyPolicyCss';

export const TermsOfService: React.FC<any> = ({}) => {
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
                <svg
                    css={styles.backIcon}
                    viewBox="0 0 5 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.866097 2.60014L3.53276 0.600072C3.86237 0.352851 4.33276 0.588041 4.33276 1.00007L4.33276 5.00007C4.33276 5.41209 3.86239 5.64728 3.53277 5.40007L0.866097 3.40013C0.599431 3.20014 0.599431 2.80014 0.866097 2.60014Z"
                        fill="#90A0AC"
                        fillOpacity="0.8"
                    />
                </svg>
                <span css={styles.backText}>Back</span>
            </button>

            <h2>STRATA – TERMS OF USE</h2>
            <p>
                <strong>Last Updated:</strong> October 2025
            </p>
            <hr />

            <h3>PLEASE READ CAREFULLY BEFORE USING THE INTERFACE</h3>

            <h3>Plain-English Summary</h3>
            <ul>
                <li>
                    Non-custodial: You always use your own wallet; the Interface Providers never
                    hold your assets.
                </li>
                <li>
                    High risk: Smart contracts can fail; markets can crash; you could lose
                    everything.
                </li>
                <li>
                    Irreversible: On-chain transactions are final; no reversals by the Interface.
                </li>
                <li>Pre-deposits: No guaranteed rights (no promised tokens, yield, or launch).</li>
                <li>
                    No advice / no offer: Nothing here is investment, legal, or tax advice; this is
                    not a securities offering.
                </li>
                <li>
                    Access limits: No U.S. users and no users in OFAC-sanctioned regions; do not
                    bypass via VPN/proxy.
                </li>
                <li>
                    Your responsibility: You are responsible for your wallet, transactions, and
                    legal compliance.
                </li>
                <li>
                    Disputes: Confidential arbitration seated in the Cayman Islands; no class
                    actions.
                </li>
            </ul>

            <h3>1. Acceptance of Terms</h3>
            <p>
                By accessing or using the Interface, you agree to be bound by these Terms of Use
                (the “Terms”). If you do not agree to all provisions of these Terms, you must not
                access or use the Interface.{' '}
                <strong>
                    By accessing or using the Interface, you acknowledge that you understand the
                    technical and legal risks involved and that you assume full responsibility for
                    your use of decentralised smart contracts.
                </strong>
            </p>

            <p>
                These Terms constitute a binding agreement between you and the persons or entities
                that make the Interface available (collectively, the “Interface Providers”). The
                Interface is provided on a non-custodial, permissionless basis and is intended
                solely as a gateway to decentralised smart contracts deployed on public blockchain
                networks (the “Protocol”). The Interface Providers do not control or operate the
                Protocol, do not execute or settle transactions on your behalf, and do not hold or
                safeguard any digital assets.
            </p>

            <h3>2. Nature of the Interface</h3>
            <p>
                The Interface is provided for informational and interaction purposes only. It is one
                of multiple possible means by which users may access the Protocol. The Protocol is
                composed of autonomous smart contracts that operate independently of the Interface
                Providers, and may be accessed directly via compatible wallets.
            </p>

            <p>
                No brokerage, custody, portfolio management, advisory or intermediary services are
                provided through the Interface. No fiduciary, agency, partnership or joint venture
                relationship is created between you and the Interface Providers by your use of the
                Interface.
            </p>

            <h3>4. Eligibility and Restricted Jurisdictions</h3>
            <p>You represent and warrant that you:</p>
            <ul>
                <li>are at least the age of majority in your jurisdiction;</li>
                <li>are not a citizen, resident of, or located in the United States;</li>
                <li>
                    are not a citizen, resident of, or located in any jurisdiction subject to
                    comprehensive sanctions, including Cuba, Iran, North Korea, Syria or any other
                    jurisdiction designated by the Interface Providers for legal or compliance
                    reasons;
                </li>
                <li>
                    are not listed on any sanctions-related list, including the U.S. Specially
                    Designated Nationals (SDN) list or equivalent;
                </li>
                <li>
                    will not use VPNs, proxies, or other means to circumvent geographic or
                    compliance restrictions; and
                </li>
                <li>will comply with all applicable laws and self-executing sanctions regimes.</li>
            </ul>
            <p>
                The Interface Providers may block or restrict access (including by blacklisting
                wallet addresses, IP ranges, or regions) at their discretion or where required by
                law.
            </p>

            <h3>5. Prohibited Uses</h3>
            <p>You will not use the Interface or Protocol to:</p>
            <ul>
                <li>
                    engage in unlawful activity (including money laundering, terrorist financing,
                    fraud, or sanctions evasion);
                </li>
                <li>violate any law, regulation, or third-party right;</li>
                <li>
                    interfere with or attack the Interface or Protocol (including hacking, scraping,
                    denial-of-service, or introducing malicious code);
                </li>
                <li>circumvent technical restrictions (e.g., geofencing or address blocks);</li>
                <li>impersonate others or provide false information; or</li>
                <li>
                    promote or conduct token sales, investment schemes, or fundraising through the
                    Interface.
                </li>
            </ul>
            <p>
                The Interface Providers may investigate suspected violations and take appropriate
                measures, including blocking access or reporting unlawful conduct.
            </p>

            <h3>6. Risk Disclosures</h3>
            <p>
                Your use of decentralised protocols involves significant risks, including but not
                limited to:
            </p>
            <ul>
                <li>Market volatility: digital assets may lose substantial or total value;</li>
                <li>
                    Smart-contract risk: bugs, vulnerabilities, exploits, or upgrade errors may
                    result in loss;
                </li>
                <li>
                    Oracle/data risk: inaccurate or unavailable data feeds may impact Protocol
                    function or allocations;
                </li>
                <li>
                    Risk-tranching mechanics: tranche structures may not perform as expected;
                    “senior” is not risk-free and “junior” may experience first-loss/total loss;
                </li>
                <li>
                    Integration risk: reliance on third-party protocols, tokens, or stablecoins that
                    may fail, de-peg, or change terms;
                </li>
                <li>
                    MEV/transaction ordering: transactions may be re-ordered, front-run, or
                    back-run, worsening outcomes;
                </li>
                <li>
                    Regulatory risk: legal changes or enforcement may restrict access or affect
                    functionality or legality;
                </li>
                <li>
                    No insurance: assets are not bank deposits and are not insured or guaranteed.
                </li>
            </ul>
            <p>
                You acknowledge that you may lose some or all assets and will have no recourse to
                the Interface Providers.
            </p>

            <h3>7. Prior Pre-Launch Deposits</h3>
            <p>
                Certain users may have previously interacted with early-stage contract deployments
                or contributed assets during experimental or pre-launch phases (“Prior Deposits”).
                Any such interactions were conducted on a voluntary basis and did not create any
                contractual rights, guarantees, claims, or entitlements to tokens, rewards,
                allocations, governance participation, or future benefits.
            </p>
            <p>
                The transition to the live Protocol does not convert any Prior Deposits into claims
                against the Interface Providers or any present or future entity. No rights are
                granted or implied by virtue of any historical interaction. Any acknowledgements or
                allocations (if any) will occur solely at the discretion of the Protocol’s
                autonomous mechanisms and not by promise, obligation, or agreement.
            </p>
            <p>
                Users remain solely responsible for withdrawing or managing any remaining balances
                directly through the Protocol if applicable. The Interface Providers have no control
                over, and no liability for, any such balances.
            </p>

            <h3>8. No Financial, Tax or Legal Advice</h3>
            <p>
                All content and functionality accessible via the Interface is for informational and
                technical interaction purposes only. Nothing constitutes investment, legal, or tax
                advice. You are solely responsible for obtaining independent professional advice
                before interacting with the Protocol.
            </p>

            <h3>9. No Offer of Securities</h3>
            <p>
                The Interface and Protocol do not constitute or facilitate an offer or sale of
                securities, derivatives, collective investment schemes, or other regulated financial
                products. No promises of profit, passive return, or capital protection are made. Any
                tokens emergent from the Protocol are designed for technical use, not investment.
            </p>

            <h3>10. Fees and Charges</h3>
            <p>
                You are responsible for all network fees (e.g., gas) and any disclosed interface or
                protocol-level fees. Network fees apply even to reverted or failed transactions. The
                Interface Providers may modify displayed fees or fee parameters at any time to the
                extent surfaced by the Interface, without obligation to continue providing the
                Interface.
            </p>

            <h3>11. Changes, Suspension, and Termination</h3>
            <p>
                The Interface Providers may modify, suspend, or discontinue the Interface (in whole
                or part) at any time, with or without notice, and without liability. Certain
                provisions will survive any suspension or termination (see Section 15).
            </p>

            <h3>12. Limitation of Liability</h3>
            <p>
                To the fullest extent permitted by law, the Interface Providers and their
                affiliates, contributors, contractors, and service providers (collectively, the
                “Operator Parties”) shall not be liable for any indirect, incidental, consequential,
                special, exemplary, or punitive damages, or for loss of profits, data, business,
                goodwill, or other intangible losses, arising out of or related to these Terms or
                your use of (or inability to use) the Interface or Protocol, whether in contract,
                tort, strict liability, or otherwise, even if advised of the possibility of such
                damages.
            </p>
            <p>
                Without limitation, the Operator Parties have no liability for losses arising from
                the risks described in Section 6, from unauthorised access to your wallet, from user
                error, or from regulatory action. In all cases, the total aggregate liability of the
                Operator Parties to you shall not exceed USD 100. Some jurisdictions do not allow
                certain limitations; where prohibited, the limitations apply to the maximum extent
                permitted by law.
            </p>

            <h3>13. Indemnification</h3>
            <p>
                You agree to defend, indemnify, and hold harmless the Operator Parties from and
                against any claims, liabilities, damages, losses, and expenses (including reasonable
                legal fees) arising out of or related to:
            </p>
            <ul>
                <li>your breach of these Terms;</li>
                <li>your violation of law or third-party rights;</li>
                <li>your use of the Interface or Protocol; or</li>
                <li>any claim by a third party connected to your actions.</li>
            </ul>
            <p>
                We may assume control of the defence, in which case you will cooperate fully and
                will not settle without our written consent.
            </p>

            <h3>14. Governing Law and Dispute Resolution</h3>
            <p>
                <strong>14.1 Governing Law.</strong> These Terms and any dispute, claim, or
                controversy arising out of or relating to them or to the Interface or Protocol (a
                “Dispute”) are governed by the laws of the Cayman Islands, without regard to
                conflict-of-law rules.
            </p>

            <p>
                <strong>14.2 Arbitration.</strong> Any Dispute shall be finally resolved by
                confidential binding arbitration administered under the ICC Rules (International
                Chamber of Commerce). Seat: Grand Cayman, Cayman Islands. Language: English.
                Tribunal: one arbitrator. The arbitrator may award any relief available at law,
                excluding punitive damages where permitted.
            </p>

            <p>
                <strong>14.3 Class Action Waiver.</strong> Disputes are resolved individually. No
                class, collective, or representative actions are permitted. If a court finds this
                waiver unenforceable, Section 14.2 will not apply to that claim.
            </p>

            <p>
                <strong>14.4 Courts.</strong> For permitted court proceedings, the parties submit to
                the exclusive jurisdiction of the courts of the Cayman Islands.
            </p>

            <h3>15. Assignment, Novation, and Miscellaneous</h3>
            <ul>
                <li>
                    <strong>15.1 Assignment and Novation.</strong> The Interface Providers may
                    assign or novate these Terms to any successor or affiliate upon notice. You may
                    not assign without consent.
                </li>
                <li>
                    <strong>15.2 Entire Agreement.</strong> These Terms are the complete agreement
                    and supersede prior understandings.
                </li>
                <li>
                    <strong>15.3 Severability.</strong> Invalid provisions will be enforced to the
                    maximum extent permitted; others remain in effect.
                </li>
                <li>
                    <strong>15.4 No Waiver.</strong> Failure to enforce is not a waiver; waivers
                    must be in writing.
                </li>
                <li>
                    <strong>15.5 No Third-Party Beneficiaries.</strong> Except Operator Parties, no
                    other person has rights under these Terms.
                </li>
                <li>
                    <strong>15.6 Survival.</strong> Sections 3, 5–9, 12–15 survive termination.
                </li>
                <li>
                    <strong>15.7 Contact.</strong> Notices may be given via the Interface. If a
                    support contact is provided, use it for official notices.
                </li>
            </ul>

            <hr />
        </div>
    );
};
