import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        backdrop: css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            backdrop-filter: blur(4px);
            z-index: 999;
            border-radius: 20px;
            cursor: pointer;

            ${theme.breakpoints.down('sm')} {
                position: fixed;
                z-index: 9999;
                background-color: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(8px);
                border-radius: 0;
            }
        `,

        dialog: css`
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-width: 520px;
            max-height: fit-content;
            display: flex;
            flex-direction: column;

            background: rgba(12, 18, 21, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow:
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
                0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
                0px 0px 250px 44px rgba(24, 70, 87, 0.25),
                0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            backdrop-filter: blur(12px);
            border-radius: 17px;
            z-index: 1000;

            animation: slideUpFromBottom 0.3s ease-out forwards;

            @keyframes slideUpFromBottom {
                from {
                    transform: translateY(10%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            ${theme.breakpoints.down('sm')} {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                max-width: 100%;
                width: 100%;
                height: 60vh;
                max-height: 60vh;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                z-index: 10000;
            }
        `,

        dialogHeading: css`
            position: relative;
            padding: ${theme.spacing(2)} ${theme.spacing(4)};
            height: 73px;
            display: flex;
            align-items: center;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
        `,

        dialogHeadingBorder: css`
            height: 1px;
            background: rgba(255, 255, 255, 0.08);
            margin: 0 ${theme.spacing(4)};
        `,

        closeIcon: css`
            right: ${theme.spacing(2)};
            top: 50%;
            margin-top: ${-12}px;
            position: absolute;
            height: 24px;
            width: 24px;
            margin-left: auto;
            min-width: 0;
            padding: 0;
            background-color: transparent;
            box-shadow: none;
            border: none;
            border-radius: 4px;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        `,

        closeIconSize: 14,

        closeIconSvg: css`
            color: #e4dede;
        `,

        dialogBody: css`
            padding: ${theme.spacing(2)} ${theme.spacing(3)};
            display: flex;
            flex-direction: column;
        `,

        stepsContainer: css`
            padding: 20px 10px;
            display: flex;
            flex-direction: column;
            gap: 24px;
        `,

        stepItem: css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        `,

        stepLeft: css`
            display: flex;
            align-items: center;
            gap: 16px;
        `,

        stepIconContainer: css`
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        `,

        stepIconCompleted: css`
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #20b0fd;
            display: flex;
            align-items: center;
            justify-content: center;
        `,

        stepIconSpinner: css`
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;

            @keyframes spin {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        `,

        stepIconFailed: css`
            color: #ff6b7d;
            font-size: 20px;
        `,

        stepIconPending: css`
            width: 20px;
            height: 20px;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOSIgcng9IjkuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDgiLz4KPC9zdmc+');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }
        `,

        stepContent: css`
            flex: 1;
        `,

        stepTitle: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 1);
            transition: color 0.2s ease;
        `,

        stepTitleCompleted: css`
            color: #fff;
        `,

        stepTitleInProgress: css`
            color: #fff;
        `,

        stepTitleFailed: css`
            color: #ff6b7d;
        `,

        checkIcon: css`
            width: 16px;
            height: 16px;
        `,

        // Success Modal Styles (Step 4)
        successDialog: css`
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, 50%);
            width: 240px;
            height: 240px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background: rgba(12, 19, 22, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow:
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
                0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
                0px 0px 250px 44px rgba(24, 70, 87, 0.25),
                0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            backdrop-filter: blur(12px);
            border-radius: 17px;
            z-index: 1000;

            animation: scaleIn 0.3s ease-out forwards;

            @keyframes scaleIn {
                from {
                    transform: translate(-50%, -50%) scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }

            ${theme.breakpoints.down('sm')} {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                top: auto;
                transform: none;
                width: 100%;
                max-width: 100%;
                height: 60vh;
                max-height: 60vh;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                z-index: 10000;

                animation: slideUpFromBottom 0.3s ease-out forwards;

                @keyframes slideUpFromBottom {
                    from {
                        transform: translateY(10%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            }
        `,

        successCloseIcon: css`
            position: absolute;
            top: ${theme.spacing(2)};
            right: ${theme.spacing(2)};
            height: 40px;
            width: 40px;
            min-width: 0;
            padding: 10px;
            background-color: transparent !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 6px;

            &&&:hover:not(:disabled) {
                background: rgba(26, 34, 41, 1) !important;
                background-color: rgba(26, 34, 41, 1) !important;
                box-shadow: none !important;
                border-color: transparent !important;
            }

            &&&:focus:not(:disabled) {
                background: rgba(26, 34, 41, 1) !important;
                background-color: rgba(26, 34, 41, 1) !important;
                outline: none;
                box-shadow: none !important;
                border-color: transparent !important;
            }

            &&&:active:not(:disabled) {
                background: rgba(26, 34, 41, 1) !important;
                background-color: rgba(26, 34, 41, 1) !important;
                box-shadow: none !important;
                border-color: transparent !important;
            }
        `,

        successContent: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
            height: 100%;
            justify-content: center;
            gap: 12px;
        `,

        successCheckIcon: css`
            width: 40px;
            height: 40px;
            margin-bottom: 0;
        `,

        successTitle: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 10px;
        `,

        failureTitle: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 10px;
        `,

        successSubtitle: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
        `,

        tokenIcon: css`
            width: 16px;
            height: 16px;
        `,

        // Failure Modal Styles
        failureDialog: css`
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 289px;
            height: 240px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            background: rgba(12, 19, 22, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow:
                0px 2.23px 5.96px -1.49px rgba(11, 3, 26, 0.4),
                0px 8.94px 17.87px -1.49px rgba(12, 4, 26, 0.2),
                0px 0px 250px 44px rgba(24, 70, 87, 0.25),
                0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            backdrop-filter: blur(12px);
            border-radius: 17px;
            z-index: 1000;

            animation: scaleIn 0.3s ease-out forwards;

            @keyframes scaleIn {
                from {
                    transform: translate(-50%, -50%) scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }

            ${theme.breakpoints.down('sm')} {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                top: auto;
                transform: none;
                width: 100%;
                max-width: 100%;
                height: 60vh;
                max-height: 60vh;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                z-index: 10000;

                animation: slideUpFromBottom 0.3s ease-out forwards;

                @keyframes slideUpFromBottom {
                    from {
                        transform: translateY(10%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            }
        `,
    };
};
