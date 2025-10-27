import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
    const theme = useTheme();

    return {
        container: css`
            padding: 10px 0 0 10px;
            color: ${theme.palette.text.primary};
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
            margin-left: 0px;
        `,

        statsCardContainer: css`
            display: flex;
            gap: 24px;
            justify-content: space-between;
            margin-bottom: ${theme.spacing(6)};

            ${theme.breakpoints.down('lg')} {
                flex-direction: column;
                gap: 20px;
                align-items: center;
            }
        `,

        myPointsCard: css`
            width: 424px;
            height: 212px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 20px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 16px;
            position: relative;

            ${theme.breakpoints.down('lg')} {
                width: 100%;
                height: auto;
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
                
            }
                
            ${theme.breakpoints.down('sm')} {
                flex-direction: column;
                align-items: flex-start;
                
            }
        `,

        season2StatsCard: css`
            width: 424px;
            height: 212px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 20px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 16px;
            position: relative;

            ${theme.breakpoints.down('lg')} {
                width: 100%;
                height: auto;
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
            }
            ${theme.breakpoints.down('lg')} {
                flex-direction: column;
                align-items: flex-start;
               
            }
        `,

        referToFriendsCard: css`
            width: 424px;
            height: 212px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 20px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;

            ${theme.breakpoints.down('lg')} {
                width: 100%;
                height: auto;
                gap: 16px
            }
        `,

        viewButton: css`
            position: absolute;
            top: 24px;
            right: 16px;
            height: 40px;
            background: rgba(26, 34, 41, 1);
            border: none;
            border-radius: 5px;
            padding: 10px 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            color: rgba(144, 160, 172, 0.8);
            transition: all 0.2s;
            text-align: center;

            &:hover {
                background: rgba(34, 42, 49, 1);
                color: rgba(255, 255, 255, 1);
            }
        `,

        cardIcon: css`
            display: flex;
            align-items: start;
            justify-content: start;
            flex-shrink: 0;
        `,

        cardHeader: css`
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 16px;
            margin-bottom: 10px;
            ${theme.breakpoints.down('lg')} {
                gap: 32px;
                margin-bottom: 0px;
            }
        `,
        cardContent: css`
            display: flex;
            flex-direction: column;
            gap: 20px;
        `,

        cardLabel: css`
            width: 98;
            height: 26;
            angle: 0 deg;
            opacity: 1;
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 22px;
            leading-trim: NONE;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
        `,

        cardValueRow: css`
            display: flex;
            align-items: center;
            gap: 40px;
        `,

        cardValueSubRow: css`
            display: flex;
            align-items: center;
            gap: 8px;
        `,

        cardValueHeader: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
            margin-bottom: 6px;
        `,

        cardValue: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 22px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            vertical-align: middle;
        `,

        cardRank: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 600;
            font-size: 32px;
            line-height: 120%;
            letter-spacing: -1%;
            color: rgba(32, 176, 253, 1);
            vertical-align: middle;
        `,
         referContainer: css`
             ${theme.breakpoints.down('lg')} {
                display:flex;
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
            }
            ${theme.breakpoints.down('sm')} {
                flex-direction: column;
                align-self: flex-start;
                gap:24px;

            }
        `,
        referTitle: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 22px;
            leading-trim: NONE;
            line-height: 100%;
            letter-spacing: -1%;
            color: rgba(255, 255, 255, 1);
            margin-bottom:6px;
        `,

        referDescription: css`
            font-family: Space Grotesk;
            font-weight: 400;
            font-style: Thin;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 150%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 0.8);
        `,

        inviteButton: css`
            width: 104px;
            height: 40px;
            gap: 4px;
            border-radius: 5px;
            padding: 10px 12px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.21) inset;
            border: none;
            color: rgba(0, 0, 0, 1);
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0%;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                background: rgba(245, 245, 245, 1);
            }
            ${theme.breakpoints.down('sm')} {
                display: flex;
                align-self: flex-start;

            }
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
             ${theme.breakpoints.down('sm')} {
                margin-top: 16px;
                margin-bottom: 16px;
            }
        `,

        filterTabs: css`
            display: flex;
            gap: ${theme.spacing(1)};
            flex-wrap: wrap;
              ${theme.breakpoints.down('md')} {
                order:2;
            }
        `,

        filterTab: css`
            height: 40px;
            gap: 4px;
            angle: 0deg;
            opacity: 1;
            border-radius: 5px;
            padding: 10px 12px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: ${theme.spacing(0.5)};
            border-radius: 5px;
            background: rgba(26, 34, 41, 1);
            color: rgba(255, 255, 255, 1);
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
            background: rgba(15, 43, 58, 1);
            color: rgba(32, 176, 253, 1);
        `,

        searchContainer: css`
            position: relative;
            display: flex;
            align-items: center;
            align-self: flex-start;
               ${theme.breakpoints.down('md')} {
                align-self: auto;
            }
        `,

        searchIcon: css`
            position: absolute;
            left: ${theme.spacing(2)};
            color: ${theme.palette.text.secondary};
        `,

        searchInput: css`
            background: rgba(16, 23, 27, 1);
            border: 1px solid ${theme.palette.divider};
            padding: 10px 12px 10px 30px;
            border-radius: 5px;
            width: 300px;
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
            ${theme.breakpoints.down('md')} {
               width: 100%
            }
        `,

        activitiesTable: css`
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 20px;
            overflow: hidden;
            padding: 10px 20px;
                ${theme.breakpoints.down('md')} {
                padding-left: 10px;
                padding-right: 10px;
            }
        `,

        tableHeader: css`
            display: grid;
            grid-template-columns:minmax(0, 2fr) minmax(0, 0.5fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 0.5fr);
            padding: ${theme.spacing(3)} ${theme.spacing(3)};
            height: 28px;
            gap: 12px;
            opacity: 1;
            margin-bottom: 18px;

             @media(max-width: 940px){
                grid-template-columns:minmax(0, 2fr) minmax(0, 0.5fr) minmax(0, 1fr) minmax(0, 1.5fr) ;
            }
          
            ${theme.breakpoints.down('md')} {
                padding: ${theme.spacing(2)};
                grid-template-columns:minmax(0, 2fr) minmax(0, 1fr)  minmax(0, 1.5fr) ;
            }
            ${theme.breakpoints.down('sm')} {
                padding: ${theme.spacing(1)};
                grid-template-columns:minmax(0, 2fr) minmax(0, 1fr)   ;
            }
            .no-account & {
                grid-template-columns: 1.4fr 1fr 1fr;
                ${theme.breakpoints.down('sm')} {
                    grid-template-columns: 2fr 1fr;
                    padding: ${theme.spacing(2)};
                }
            }

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
            display: flex;
            align-items: center;
            justify-content: flex-start;
             @media(max-width: 940px){
               &:nth-child(5) {
                    display: none;
                }
            }
            ${theme.breakpoints.down('md')} {
                &:nth-child(3) {
                    display: none;
                }
            }
            &:last-child {
                justify-content: flex-end;
                padding-right: 20px;

                ${theme.breakpoints.down('md')} {
                    padding-right: 0px;
                }
            }

            ${theme.breakpoints.down('sm')} {

                &:nth-child(2) {
                   justify-content: end;
                }
                &:nth-child(3) {
                    display: none;
                }
                  &:nth-child(4) {
                    display: none;
                }
                .no-account & {
                    &:nth-child(3) {
                        display: none;
                    }
                }
            }
        `,

        tableRow: css`
            display: grid;
            grid-template-columns:minmax(0, 2fr) minmax(0, 0.5fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 0.5fr);
            padding: ${theme.spacing(3)} ${theme.spacing(3)};
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            align-items: center;
            gap: 12px;

            &:last-child {
                border-bottom: none;
            }
            .no-account & {
                grid-template-columns: 1.4fr 1fr 1fr;

                ${theme.breakpoints.down('sm')} {
                    grid-template-columns: 2fr 1fr;
                }
            }
          
             @media(max-width: 940px){
                grid-template-columns:minmax(0, 2fr) minmax(0, 0.5fr) minmax(0, 1fr) minmax(0, 1.5fr) ;
            }
          
            ${theme.breakpoints.down('md')} {
                padding: ${theme.spacing(2)};
                grid-template-columns:minmax(0, 2fr) minmax(0, 1fr)  minmax(0, 1.5fr) ;
            }
            ${theme.breakpoints.down('md')} {
                padding-left: ${theme.spacing(3)};
                padding-right: ${theme.spacing(3)};
             

                
            }
            ${theme.breakpoints.down('sm')} {
                grid-template-columns: 2fr 1fr;
                padding: ${theme.spacing(2)};
            }

        `,

        tableCell: css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
            @media(max-width: 940px){
               &:nth-child(5) {
                    display: none;
                }
            }
             @media(max-width: 940px){
               &:nth-child(5) {
                    display: none;
                }
            }
            ${theme.breakpoints.down('md')} {
                &:nth-child(3) {
                    display: none;
                }
            }
              ${theme.breakpoints.down('sm')} {

                &:nth-child(2) {
                   justify-content: end;
                }
                &:nth-child(3) {
                    display: none;
                }
                  &:nth-child(4) {
                    display: none;
                }
                .no-account & {
                    &:nth-child(3) {
                        display: none;
                    }
                }
            }
        `,
        tableActions: css`
            justify-content: flex-end;
            padding-right: 20px;
            ${theme.breakpoints.down('md')} {
                padding-right: 0px;
            }
            ${theme.breakpoints.down('sm')} {
                display: none;
            }
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

        totalPoints: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            color: rgba(255, 255, 255, 1);
        `,

        points24h: css`
            font-family: 'Chakra Petch', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 125%;
            color: rgba(255, 255, 255, 1);
        `,

        rewards: css`
            display: flex;
            gap: ${theme.spacing(1)};
            white-space: nowrap;
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

        depositButton: css`
            min-width: 90px;
            background: rgba(26, 34, 41, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 5px;
            padding: 8px 16px;
            color: rgba(255, 255, 255, 1);
            font-family: 'Chakra Petch', sans-serif;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;


            &:hover {
                background: rgba(34, 42, 49, 1);
                border-color: rgba(32, 176, 253, 0.3);
            }
            &:disabled {
                pointer-events: none;
                opacity: .6;
            }
            ${theme.breakpoints.down('sm')} {
              
               display: none;
            }
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
            height: auto;
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
        season1ActivitySection: css`
            margin-top: 20px;
            margin-bottom: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            background: rgba(4, 8, 10, 1);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px 0px 10px 0px rgba(32, 175, 253, 0.1) inset;
            border-radius: 20px;
            padding: 40px;
        `,

        seasonButton: css`
            margin-top: 20px;
            width: 150px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: rgba(26, 34, 41, 1);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Chakra Petch', sans-serif;
            color: rgba(144, 160, 172, 0.8);
            transition: all 0.2s ease;
            font-size: 14px;

            &:hover {
                background: rgba(34, 42, 49, 1);
                color: rgba(255, 255, 255, 1);
            }
        `,

        season1Title: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 16px;
            leading-trim: NONE;
            line-height: 125%;
            letter-spacing: 0px;
            color: rgba(255, 255, 255, 1);
        `,
        season1Description: css`
            font-family: Chakra Petch;
            font-weight: 500;
            font-style: Medium;
            font-size: 14px;
            leading-trim: NONE;
            line-height: 140%;
            letter-spacing: 0%;
            color: rgba(144, 160, 172, 0.8);
            text-align: center;
        `,
        season1TextSection: css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
        `,
        cardValueRowSeason1: css`
            display: flex;
            align-items: center;
            gap: 100px;
        `,
    };
};
