import React, { useState } from 'react';
import { useData } from '../../hooks/useData';
import './style.css';
import { responseStatus, frames } from '../../constants';
import { cloneObject } from '../../utils';
import Frame from '../../components/Frame/Frame';
import Popup from '../../components/Popup/Popup';

function App() {

    const { variant, columns, isLoading, error, showPopup, setShowPopup } = useData();
    const [frameIndex, setFrameIndex] = useState(frames.FIRST);
    const [copiedFrames, setCopiedFrames] = useState();
    const [middleIndex, setMiddleIndex] = useState();
    let rowToShow;

    if (isLoading) {
        return <div style={{
            textAlign: 'center', padding: '5rem'
        }}> Loading... </div>
    }

    if (error) {
        if (error.message == responseStatus.INTERNAL_SERVER_ERROR) {
            return <div style={{ color: 'red', padding: '5rem' }}>A PROBLEM OCCURED! PLEASE TRY AGAIN LATER!</div>
        }
    }

    if (!showPopup && variant) {
        if (frameIndex === frames.MIDDLE) {
            rowToShow = variant.creativeList[0].workingData.frames[frameIndex][middleIndex];
        } else {
            rowToShow = variant.creativeList[0].workingData.frames[frameIndex];
        }
    }

    const copyFrames = () => {
        const clonedFrames = cloneObject(variant.creativeList[0].workingData.frames);
        setCopiedFrames(clonedFrames);
    }

    return (
        <div className="app">
            { showPopup ? <div className="popup-container"><Popup content='You are not authorised' onClose={() => setShowPopup(false)} /></div>
                :
                rowToShow &&
                <>
                    <div className="top-bar">
                        <div className="radio-list">
                            <div>
                                <div>First</div>
                                <div>
                                    <input type="radio" value="first" name="frame" checked={frameIndex === frames.FIRST} onChange={(e) => setFrameIndex(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div>Middle</div>
                                <div>
                                    <input type="radio" value="0" name="frame" checked={frameIndex === frames.MIDDLE && middleIndex === '0'} onChange={(e) => { setFrameIndex(frames.MIDDLE); setMiddleIndex(e.target.value) }} />
                                    <input type="radio" value="1" name="frame" checked={frameIndex === frames.MIDDLE && middleIndex === '1'} onChange={(e) => { setFrameIndex(frames.MIDDLE); setMiddleIndex(e.target.value) }} />
                                </div>
                            </div>
                            <div>
                                <div>Last</div>
                                <div>
                                    <input type="radio" value="last" name="frame" checked={frameIndex === frames.LAST} onChange={(e) => setFrameIndex(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn" onClick={copyFrames}>Copy Frames</button>
                        </div>
                    </div>
                    <Frame columns={columns} row={rowToShow} />
                    {
                        copiedFrames &&
                        <div style={{ marginTop: '2rem' }}>
                            <h3 style={{ color: '#3333ff' }}>BELOW FRAMES ARE COPIED SUCCESSFULLY :</h3>
                            <h4>FIRST</h4>
                            <Frame columns={columns} row={copiedFrames[frames.FIRST]} />
                            <h4>MIDDLE</h4>
                            <Frame columns={columns} row={copiedFrames[frames.MIDDLE][0]} />
                            <Frame columns={columns} row={copiedFrames[frames.MIDDLE][1]} />
                            <h4>LAST</h4>
                            <Frame columns={columns} row={copiedFrames[frames.LAST]} />
                        </div>
                    }
                </>
            }
        </div>
    );

}

export default App;
