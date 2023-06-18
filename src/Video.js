import react from 'react';
import './App.css';
import CommentSection from './CommentSection';
import HomeComponent from './Home';

const Video = ({ embedId }) => {
    return (
        <>
        <HomeComponent />
        <div className='root-container'>
        <div className="video-responsive">
            <iframe
                width="320"
                height="320"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
        <div className='video-comments'>
            <CommentSection />
        </div>
        </div>
        
        </>
    )
}

export default Video;