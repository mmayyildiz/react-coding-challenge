import React from "react";
import { render, screen } from "@testing-library/react";
import Frame from './Frame';

const cols = [{
    id: '1',
    parentFrameId: '1',
    keyName: '$BodyCopyWeight',
    isHidden: false,

},
{
    id: '2',
    parentFrameId: '1',
    keyName: '$BodyCopySize',
    isHidden: true,

},
{
    id: '3',
    parentFrameId: '1',
    keyName: '$CtaSize',
    isHidden: false,

},
{
    id: '4',
    parentFrameId: '2',
    keyName: '$CopyBoxColour',
    isHidden: false,

},
{
    id: '5',
    parentFrameId: '1',
    keyName: '$CopyColour',
    isHidden: false,

}
];

const row = {
    content: {
        $BodyCopySize: 15,
        $BodyCopyWeight: "normal",
        $CopyBoxColour: "transparent",
        $CopyColour: "black"
    },
    frameId: "1"
};


describe('Frame', () => {
    it('renders correctly', () => {
        render(<Frame columns={cols} row={row} />);

        expect(screen.queryByText('Body Copy Weight')).toBeInTheDocument();
        expect(screen.queryByText('Body Copy Size')).not.toBeInTheDocument();
        expect(screen.queryByText('Cta Size')).toBeInTheDocument();
        expect(screen.queryByText('transparent')).not.toBeInTheDocument();
        expect(screen.queryByText('black')).toBeInTheDocument();
    })
});