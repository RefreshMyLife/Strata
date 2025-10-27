import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        formContainer: css`
            position: relative;
        `,
        panelSection: css`
            padding: 0;
            padding-bottom: 0px;
        `,
        container: css`
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0px;
            background: transparent;
            border: none;
            position: relative;
        `,
        header: css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: ${theme.spacing(6)};
        `,
        title: css`
            display: flex;
            align-items: center;
        `,
        tokenIcon: css`
            width: ${theme.shape.iconSize.xLarge}px;
            height: ${theme.shape.iconSize.xLarge}px;
            margin-right: ${theme.spacing(1)};
        `,
        tokenIconLarge: css`
            width: ${theme.spacing(8)};
            height: ${theme.spacing(8)};
            margin-right: ${theme.spacing(2)};
        `,
        tokenIconWithdraw: css`
            margin-left: ${theme.spacing(1)};
        `,
        label: css`
            display: block;
            margin-bottom: ${theme.spacing(2)};

            ${theme.breakpoints.down('sm')} {
                margin-bottom: 0;
            }
        `,
        stakingLabel: css`
            margin-bottom: ${theme.spacing(1)};
        `,
        text: css`
            display: inline;
        `,
        textRewardValue: css`
            font-weight: 600;
        `,
        textStakeValue: css`
            display: inline-flex;
            align-items: center;
        `,
        textAligned: css`
            display: inline-flex;
            align-items: center;
        `,
        textSmallMobile: css`
            ${theme.breakpoints.down('sm')} {
                font-size: ${theme.typography.small2.fontSize};
                font-size: ${theme.typography.small2.lineHeight};
            }
        `,
        dataRow: css`
            display: flex;
            padding-left: 0;
            margin-top: ${theme.spacing(6)};

            ${theme.breakpoints.down('sm')} {
                margin-top: ${theme.spacing(4)};
                flex-direction: column;
            }
        `,
        valueWrapper: css`
            display: block;

            & + & {
                border-left: 1px solid transparent;
                margin-left: ${theme.spacing(6)};
                padding-left: ${theme.spacing(6)};

                ${theme.breakpoints.down('sm')} {
                    margin-left: 0;
                    padding-left: 0;
                    border: none;
                    margin-top: ${theme.spacing(2)};
                }
            }

            ${theme.breakpoints.down('sm')} {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        `,
        buttonsWrapper: css`
            display: flex;
            justify-content: space-between;
            margin-top: auto;

            ${theme.breakpoints.down('sm')} {
                flex-direction: column;
                margin-top: ${theme.spacing(6)};
            }
        `,
        button: css`
            margin-top: ${theme.spacing(8)};
            width: 100%;

            ${theme.breakpoints.down('sm')} {
                width: 100%;

                :not(:first-of-type) {
                    margin-top: ${theme.spacing(3)};
                }
            }
        `,
        optionsButton: css`
            position: absolute;
            top: -63px;
            right: 5px;
        `,
        expandToggle: css`
            pointer-events: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: ${theme.spacing(2)};
            cursor: pointer;
            color: #8b8e9a;

            &:hover {
                color: #c6d0dd;
            }
        `,
        expandToggleText: css`
            width: 219px;
            height: 20px;
            opacity: 1;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 1);
        `,
        expandIcon: css`
            font-size: 0.8rem;
            font-weight: 400;
            transition: all 0.2s ease;
            line-height: 1;
            color: #8b8e9a;
        `,
        expandedDetails: css`
            background: rgba(41, 41, 42, 0.3);
            border-radius: 8px;
            margin-bottom: 10px;
            border: 1px solid rgba(41, 41, 42, 0.6);
        `,
        detailsGrid: css`
            display: flex;
            flex-direction: column;
            gap: ${theme.spacing(2)};
            padding: ${theme.spacing(2)};
        `,
        detailRow: css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: ${theme.spacing(0.5)} 0;
        `,
        detailLabel: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,
        detailValue: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: right;
            color: rgba(144, 160, 172, 0.8);
        `,
        moreInfoContainer: css`
            padding: ${theme.spacing(4)};

            h3 {
                color: #fff;
                margin-bottom: ${theme.spacing(3)};
                font-size: 1.5rem;
            }

            p {
                margin-bottom: ${theme.spacing(3)};

                h5 {
                    color: #fff;
                    font-size: 1rem;
                    margin-bottom: ${theme.spacing(1)};
                }

                span {
                    color: #c6d0dd;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
            }
        `,
        arrowContainer: css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: ${theme.spacing(2)} 0;
            position: relative;
            margin-bottom: 14px;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 50%;
                height: 1px;
                background: rgba(41, 41, 42, 0.8);
                z-index: 1;
            }
        `,
        arrowIcon: css`
            width: 28px;
            height: 28px;
            padding: 4px;
            background: rgba(41, 41, 42, 0.8);
            border: 1px solid rgba(41, 41, 42, 0.9);
            border-radius: 6px;
            position: relative;
            z-index: 2;
        `,
        enterAmountButton: css`
            width: 472px;
            height: 50px;
            gap: 8px;
            opacity: 1;
            border-radius: 5px;
            padding: 14px 24px;
            background: rgba(68, 79, 86, 1) !important;
            box-shadow:
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4) inset,
                0px 0px 20px 44px rgba(0, 0, 0, 0.25) inset !important;

            &:hover {
                background: rgba(68, 79, 86, 1) !important;
                box-shadow:
                    0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4) inset,
                    0px 0px 20px 44px rgba(0, 0, 0, 0.25) inset !important;
            }

            ${theme.breakpoints.down('sm')} {
                width: 100%;
            }
        `,
        buyButton: css`
            height: 50px;
        `,
        buyButtonModalOpen: css`
            &:hover:not(:disabled) {
                background: rgba(32, 175, 253, 0.9) !important;
                box-shadow:
                    0px 2.23px 5.96px -1.49px rgba(32, 175, 253, 0.3),
                    0px 8.94px 17.87px -1.49px rgba(32, 175, 253, 0.2),
                    0px 0px 10px 0px rgba(32, 175, 253, 0.4) inset !important;
                transform: translateY(-1px);
                transition: all 0.2s ease;
            }
        `,
    };
};
