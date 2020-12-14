import React from 'react';
import App from './App';
import * as hooks from '../../hooks/useData';
import { render, screen, fireEvent } from "@testing-library/react";
import { responseStatus } from '../../constants';
import { act } from 'react-dom/test-utils';

const columns = [{
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
    keyName: '$CtaText',
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
    parentFrameId: '4',
    keyName: '$TermsCopy',
    isHidden: false,

}
];

const variant = {
    dateCreated: '2020-01-13T17:33:53+00:00',
    lastUpdated: '2020-01-13T17:33:54+00:00',
    creativeList: [
        {
            workingData: {
                frames: {
                    first: {
                        content: {
                            $TaglineWeight: 'normal',
                            $PrefixText: '',
                            $CopyColour: 'black',
                            $ModelSize: 20,
                            $TermsCopy: 'Car Finance. 18+. &lt;br/&gt;Subject to status.   T&amp;Cs apply.*',
                            $CtaText: 'MORE ON THIS OFFER',
                            $BodyCopySize: 15,
                            $CopyBoxColour: 'transparent'
                        },
                        frameTemplateId: 304,
                        frameId: '1'
                    },
                    middle: [
                        {
                            content: {
                                $TaglineWeight: 'normal',
                                $PrefixText: '',
                                $CopyColour: 'black',
                                $ModelSize: 20,
                                $BodyCopyText: '&pound;179 deposit*&lt;br/&gt;&lt;br/&gt;',
                                $BodyCopySize: 15,
                                $CopyBoxColour: 'transparent'
                            },
                            frameTemplateId: 291,
                            frame_id: '2'
                        },
                        {
                            content: {
                                $TaglineWeight: 'normal',
                                $PrefixText: '',
                                $CopyColour: 'black',
                                $ModelSize: 20,
                                $BodyCopySize: 15,
                                $CopyBoxColour: 'transparent'
                            },
                            frameTemplateId: 291,
                            frame_id: '3'
                        }
                    ],
                    last: {
                        content: {
                            $TaglineWeight: 'normal',
                            $TaglineText: 'Seduction never ends',
                            $TermsCopy: 'Car Finance',
                            $CtaText: 'MORE ON THIS OFFER',
                            $BodyCopySize: 15,
                            $CopyBoxColour: 'transparent'
                        },
                        frameTemplateId: 290,
                        frame_id: '4'
                    }
                }
            }
        }
    ]
};


describe('App', () => {

    it('renders correctly while data is loading', () => {
        render(<App />);
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
    })

    it('renders correctly when got data', () => {
        hooks.useData = jest.fn();
        hooks.useData.mockReturnValue({
            variant,
            columns,
            isLoading: false,
            showPopup: false
        });
        render(<App />);

        expect(screen.queryByText('First')).toBeInTheDocument();
        expect(screen.queryByText('Copy Frames')).toBeInTheDocument();
        expect(screen.queryByText('Cta Text')).toBeInTheDocument();
    })

    it('renders correctly when got error', () => {
        hooks.useData = jest.fn();
        hooks.useData.mockReturnValue({
            isLoading: false,
            error: new Error(responseStatus.INTERNAL_SERVER_ERROR)
        });
        render(<App />);

        expect(screen.queryByText('A PROBLEM OCCURED! PLEASE TRY AGAIN LATER!')).toBeInTheDocument();
    })

    it('shows a popup', () => {
        hooks.useData = jest.fn();
        hooks.useData.mockReturnValue({
            isLoading: false,
            showPopup: true
        });
        render(<App />);

        expect(screen.queryByText('You are not authorised')).toBeInTheDocument();
        expect(screen.queryByText('Copy Frames')).not.toBeInTheDocument();
    })

});

describe('App', () => {

    it('handles Copy Frames button click', () => {
        hooks.useData = jest.fn();
        hooks.useData.mockReturnValue({
            variant,
            columns,
            isLoading: false,
            showPopup: false
        });
        render(<App />);

        act(() => { fireEvent.click(screen.getByText('Copy Frames')); })
        expect(screen.queryByText('BELOW FRAMES ARE COPIED SUCCESSFULLY :')).toBeInTheDocument();
        expect(screen.queryByText('FIRST')).toBeInTheDocument();
        expect(screen.queryByText('MIDDLE')).toBeInTheDocument();
        expect(screen.queryByText('LAST')).toBeInTheDocument();
    })

});