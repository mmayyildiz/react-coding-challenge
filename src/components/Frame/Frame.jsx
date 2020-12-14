import React from 'react';
import './style.css';
import { normalizeStr } from '../../utils';

function Frame({ columns, row }) {
    const colsToShow = columns.filter(col => col.parentFrameId === row.frameId && !col.isHidden);

    return (
        <table>
            <thead>
                <tr>
                    {colsToShow.map((col, index) => <th key={index}>{normalizeStr(col.keyName)}</th>)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {colsToShow.map((col, index) => <td key={index}>
                        {row.content[col.keyName] instanceof Object ? (JSON.stringify(row.content[col.keyName])) : (row.content[col.keyName])}
                    </td>)
                    }
                </tr>
            </tbody>
        </table>
    )
}

export default React.memo(Frame);