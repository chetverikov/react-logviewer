import React, { CSSProperties, Component, ReactNode } from "react";

import LinePart from "../LinePart";
import styles from "./index.module.css";

/* eslint-disable react/no-array-index-key */

export interface LineContentProps {
    /**
     * The pieces of data to render in a line. Will typically
     * be multiple items in the array if ANSI parsed prior.
     */
    data?: any[];
    /**
     * The line number being rendered.
     */
    number: string | number | undefined;
    /**
     * Execute a function against each line part's
     * `text` property in `data` to process and
     * return a new value to render for the part.
     */
    formatPart?: ((text: string) => ReactNode) | undefined;
    /**
     * CSS Style of the LineContent.
     */
    style?: CSSProperties | undefined;
}

/**
 * The container of all the individual pieces of content that
 * is on a single line. May contain one or more `LinePart`s
 * depending on ANSI parsing.
 */
export default class LineContent extends Component<LineContentProps, any> {
    static defaultProps = {
        formatPart: null,
        style: null,
    };

    render() {
        const { data, formatPart, number, style } = this.props;

        if (data) {
            const last = data[data.length - 1];

            if (
                last &&
                typeof last.text === "string" &&
                !last.text.endsWith("\n")
            ) {
                last.text += "\n";
            }
        }

        return (
            <span className={`log-content ${styles.lineContent}`} style={style}>
                {data &&
                    data.map((part: any, n: number) => (
                        <LinePart
                            part={part}
                            format={formatPart}
                            key={`line-${number}-${n}`}
                        />
                    ))}
            </span>
        );
    }
}