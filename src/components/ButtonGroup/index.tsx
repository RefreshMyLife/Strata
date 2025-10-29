/** @jsxImportSource @emotion/react */
import React from 'react';

import { TertiaryButton } from '../Button';
import useStyles from './styles';

export interface ButtonGroupProps {
    buttonLabels: string[] | { key?: string; label?: string; title?: string | any }[];
    activeButtonIndex: number;
    onButtonClick: (newIndex: number) => void;
    fullWidth?: boolean;
    className?: string;
    tags?: boolean;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
    buttonLabels,
    activeButtonIndex = 0,
    onButtonClick,
    fullWidth = false,
    tags = false,
    className,
}) => {
    const styles = useStyles();

    return (
        <div css={styles.getContainer({ fullWidth })} className={className}>
            {buttonLabels.map((mix, index) => (
                <TertiaryButton
                    key={`button-group-button-${typeof mix === 'string' ? mix : (mix.key ?? mix.label ?? mix.title)}`}
                    onClick={() => onButtonClick(index)}
                    css={styles.getButton({
                        active: index === activeButtonIndex,
                        last: index === buttonLabels.length - 1,
                        fullWidth,
                        tags,
                    })}
                    className={index === activeButtonIndex ? 'active' : ''}
                >
                    {typeof mix === 'string' ? mix : (mix.label ?? mix.title)}
                </TertiaryButton>
            ))}
        </div>
    );
};
