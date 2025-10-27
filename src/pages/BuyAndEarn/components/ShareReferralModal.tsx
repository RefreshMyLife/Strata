/** @jsxImportSource @emotion/react */
import { useLayout } from 'src/theme/useLayout';
import { useStyles } from '../styles';
import { useAuth } from 'src/context/AuthContext';
import { useGetPointsStats, useGetRefCode } from 'src/clients/api/queries/getPoints/getPointsStats';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { Icon, Modal, NoticeError, Spinner } from 'src/components';
import img_refer from 'assets/img/refer.png';

export const ShareReferralModal: React.FC<any> = ({
    isOpen = false,
    handleClose,
}) => {
    const styles = useStyles();
    const l = useLayout();
    const { accountAddress } = useAuth();
    const { data: account, isLoading, isError, error } = useGetRefCode({ accountAddress });
    const copyToClipboard = useCopyToClipboard('Referral link');

    if (!accountAddress) {
      return <></>;
    }

    const url = isLoading ? null : `https://${window.location.host}${account?.url}`;
    const hasError = isError || (!isLoading && account == null);

    return (
      <Modal isOpen={isOpen} handleClose={handleClose}>
          <div css={[l.row, l.gap, styles.shareHead]}>
            <div><img src={img_refer} style={{height: '60px'}} /></div>
            <div css={{paddingLeft: '1em'}}>
              <div css={styles.shareTitleHint}>Your Referral</div>
              <div css={styles.shareTitle}>{isLoading ? "Loading" : "Link Created" }</div>
            </div>
          </div>
          { isLoading && <Spinner />}
          { hasError && <NoticeError description={'Link not properly loaded'} /> }
          { !isLoading && !hasError && <>
            <div css={[styles.shareInput, l.row, l.spaceBetween]}>
                <div>{ url }</div>
                <div>
                  <Icon
                    name="copy"
                    css={styles.copyIcon}
                    onClick={() => copyToClipboard(url)}
                  />
                </div>
            </div>
            <div css={[styles.shareInfo, l.column]}>
                {/* <div css={styles.shareInfoTitle}>Referral</div> */}
                <div css={styles.shareInfoDescription}>
                  Share the referral link with your friends and earn 10% of total Strata Points earned by them. They’ll receive a 10% boost on their Strata Points.
                </div>
            </div>
          </>}
      </Modal>
    );
};
