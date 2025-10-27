import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: css`
            padding: 10px 0 0 10px;
            color: ${theme.palette.text.primary};
             ${theme.breakpoints.down('sm')} {
                padding: 10px;
            }
        `,

        header: css`
            margin-bottom: ${theme.spacing(6)};
        `,

        title: css`
            color: ${theme.palette.text.primary};
            font-family: Chakra Petch;
            font-weight: 600;
            font-style: SemiBold;
            font-size: 32px;
            leading-trim: NONE;
            line-height: 120%;
            letter-spacing: -1%;
            vertical-align: middle;
            margin-bottom: ${theme.spacing(4)};
        `,

        seasonTabs: css`
            height: 40px;
            display: flex;
            gap: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        `,

        seasonTab: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 22px;
            leading-trim: NONE;
            line-height: 120%;
            letter-spacing: -1%;
            vertical-align: middle;
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: all 0.2s;
            color: rgba(144, 160, 172, 0.5);
            &:hover {
                border-color: ${theme.palette.primary.main};
            }
        `,

        activeSeasonTab: css`
            border-bottom: 1px solid rgba(32, 176, 253, 1);
            color: rgba(255, 255, 255, 1);
        `,

        liveIndicator: css`
            background: rgba(15, 43, 58, 1);
            border-radius: 5px;
            color: rgba(32, 176, 253, 1);
            padding: 2px 6px;
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            vertical-align: middle;
            margin-left: 10px;
        `,

        statsContainer: css`
            display: flex;
            gap: 34px;
            justify-content: center;
            margin-bottom: ${theme.spacing(6)};

            ${theme.breakpoints.down('md')} {
                flex-direction: column;
                gap: ${theme.spacing(3)};
                align-items: center;
            }
        `,

        statCard: css`
            width: 646px;
            height: 130px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 20px;
            padding: 32px 24px;
            display: flex;
            align-items: center;
            gap: 24px;

            ${theme.breakpoints.down('md')} {
                width: 100%;
                max-width: 646px;
                min-width: 300px;
            }

            ${theme.breakpoints.down('sm')} {
                padding: 24px 20px;
                height: auto;
                min-height: 130px;
            }
        `,

        statIcon: css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        `,

        statContent: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex-grow: 1;
            gap: 8px;
        `,

        statLabel: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(144, 160, 172, 0.8);
        `,

        statValue: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 32px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            vertical-align: middle;
        `,

        statValueRow: css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        `,

        activitiesSection: css`
            margin-bottom: ${theme.spacing(4)};
        `,

        activitiesHeader: css`
            display: flex;
            flex-direction: column;
            gap: ${theme.spacing(4)};
            margin-bottom: ${theme.spacing(4)};

            ${theme.breakpoints.up('md')} {
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            }
        `,

        activitiesTitle: css`
            color: rgba(255, 255, 255, 1);
            font-family: Chakra Petch;
            font-weight: 600;
            font-style: SemiBold;
            font-size: 32px;
            leading-trim: NONE;
            line-height: 120%;
            letter-spacing: -1%;
            vertical-align: middle;
            margin-bottom: 20px;
            margin-top: 60px;
        `,

        filterTabs: css`
            display: flex;
            gap: ${theme.spacing(1)};
            flex-wrap: wrap;
        `,

        filterTab: css`
        height: 40px;
        gap: 4px;
        angle: 0deg;
        opacity: 1;
        border-radius: 5px;
        padding: 10px 12px ;
        border: none;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: ${theme.spacing(0.5)};
        border-radius: 5px;
        background: rgba(26, 34, 41, 1);
        color:rgba(255, 255, 255, 1)
        font-family: Chakra Petch;
        font-weight: 500;
        font-style: Medium;
        font-size: 14px;
        leading-trim: NONE;
        line-height: 140%;
        letter-spacing: 0%;
        text-align: center;
        vertical-align: middle;

            &:hover {
                border-color: ${theme.palette.primary.main};
            }
        `,

        activeFilterTab: css`
            width: 40;
            height: 40;
            gap: 4px;
            angle: 0 deg;
            opacity: 1;
            border-radius: 5px;
            padding-top: 10px;
            padding-right: 12px;
            padding-bottom: 10px;
            padding-left: 12px;
            background: rgba(15, 43, 58, 1);

            color: rgba(32, 176, 253, 1);
        `,

        networkArrow: css`
            transition: transform 0.2s;
        `,

        searchContainer: css`
            position: relative;
            display: flex;
            align-items: center;
        `,

        searchIcon: css`
            position: absolute;
            left: ${theme.spacing(2)};
            color: ${theme.palette.text.secondary};
        `,

        searchInput: css`
            background: rgba(16, 23, 27, 1);
            border: 1px solid ${theme.palette.divider};
            padding: ${theme.spacing(1.5)} ${theme.spacing(2)} ${theme.spacing(1.5)}
                ${theme.spacing(5)};
            border-radius: 5px;
            width: 300px;
            opacity: 1;
            border-radius: 5px;
            padding-top: 10px;
            padding-right: 12px;
            padding-bottom: 10px;
            padding-left: 30px;
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            vertical-align: middle;
            color: rgba(144, 160, 172, 0.5);
            outline: none;
            transition: border-color 0.2s;

            &::placeholder {
                color: rgba(144, 160, 172, 0.5);
            }
        `,

        activitiesTable: css`
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 20px;
            overflow: hidden;
            padding: 10px 20px;
        `,

        tableHeader: css`
            display: grid;
            grid-template-columns: 500px 500px 300px;
            padding: ${theme.spacing(3)};
            height: 28px;
            gap: 12px;
            opacity: 1;
            margin-bottom: 18px;
        `,

        tableHeaderCell: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,

        tableRow: css`
            display: grid;
            grid-template-columns: 500px 480px 200px;
            padding: ${theme.spacing(3)};
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            align-items: center;

            &:last-child {
                border-bottom: none;
            }
        `,

        tableCell: css`
            display: flex;
            align-items: center;
        `,

        poolInfo: css`
            display: flex;
            align-items: center;
            gap: ${theme.spacing(2)};
        `,

        poolName: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 16px;
            leading-trim: NONE;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 1);
        `,

        poolDescription: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
        `,

        rewards: css`
            display: flex;
            gap: ${theme.spacing(2)};
        `,

        reward: css`
            display: flex;
            align-items: center;
            gap: ${theme.spacing(0.5)};
        `,

        rewardValue1: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 16px;
            leading-trim: NONE;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 1);
        `,

        rewardValue2: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 16px;
            leading-trim: NONE;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(144, 160, 172, 0.8);
        `,
        connectButton: css`
            padding: ${theme.spacing(1)} ${theme.spacing(3)};
            font-size: 14px;
            margin-right: ${theme.spacing(2)};
        `,

        tableFooter: css`
            border-top: 1px solid rgba(255, 255, 255, 0.08);
        `,

        paginationContainer: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 24px 20px;
        `,

        activitiesCount: css`
            text-align: center;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
            line-height: 1.2;
        `,

        activitiesSubtext: css`
            font-size: 14px;
            color: rgba(144, 160, 172, 0.8);
            font-weight: 500;
        `,

        progressLine: css`
            width: 160px;
            height: 2px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 1px;
            overflow: hidden;
        `,

        progressFill: css`
            height: 100%;
            background: rgba(144, 160, 172, 0.8);
            border-radius: 1px;
            transition: width 0.3s ease;
        `,

        loadMoreButton: css`
            width: 107px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            background: rgba(26, 34, 41, 1);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Chakra Petch', sans-serif;
            color: rgba(144, 160, 172, 0.8);
            transition: all 0.2s ease;
            font-size: 14px;

            &:hover:not(:disabled) {
                background: rgba(34, 42, 49, 1);
                color: rgba(255, 255, 255, 1);
            }

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        `,

        loadMoreArrow: css`
            transform: rotate(90deg);
        `,

        networkDropdownContainer: css`
            position: relative;
        `,

        networkDropdownButton: css`
            position: relative;
        `,

        networkDropdownMenu: css`
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            width: 200px;
            height: 160px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 5px;
            box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.25);
            z-index: 1000;
            margin-top: 4px;
            padding: 5px 1px;
            gap: 2px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(255, 255, 255, 1);
        `,

        networkDropdownItem: css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 198px;
            height: 36px;
            padding: 8px 12px;
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:hover {
                background: rgba(32, 176, 253, 0.1);
            }
        `,

        selectedNetworkItem: css`
            background: rgba(32, 176, 253, 0.15);
        `,

        networkInfo: css`
            display: flex;
            align-items: center;
            gap: 8px;
        `,

        networkName: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            color: rgba(255, 255, 255, 1);
        `,

        networkChainId: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 400;
            font-size: 12px;
            line-height: 120%;
            color: rgba(144, 160, 172, 0.8);
            text-align: right;
            min-width: 20px;
        `,
    };
};
