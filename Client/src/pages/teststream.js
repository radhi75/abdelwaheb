import React, { useState, useEffect } from 'react';
import Hls from 'react-hls';

function StreamList() {
    const [streams, setStreams] = useState([]);
    const [currentStreamUrl, setCurrentStreamUrl] = useState('');

    useEffect(() => {
        fetch('/streams')
            .then(res => res.json())
            .then(data => setStreams(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            {streams.map(stream => (
                <div key={stream.id}>
                    <h2>{stream.StreamPath}</h2>
                    <button onClick={() => setCurrentStreamUrl(`rtmp://localhost:1935/${stream.StreamPath}`)}>
                        Play
                    </button>
                </div>
            ))}
            <Hls
                url={currentStreamUrl}
                autoplay={true}
            />
        </div>
    );
}

export default StreamList;
