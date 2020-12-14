import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Popup from './Popup';

describe('Popup', () => {
    it('renders correctly', () => {
        render(<Popup content='Dummy Message' />);
        expect(screen.queryByText('Dummy Message')).toBeInTheDocument();
    })
});

describe('on close button click', () => {
    it('passes constructed onClose function', () => {
        const onClose = jest.fn();
        render(<Popup onClose={onClose} />);
        fireEvent.click(screen.queryByText('x'));
        expect(onClose).toHaveBeenCalled();
    })
});