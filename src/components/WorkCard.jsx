import React, { useState } from 'react';
import PdfModal from './PdfModal'; // Import the PdfModal component

function WorkCard(props) {
    const [hover, setHover] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open

    const handleCardClick = () => {
        setIsModalOpen(true); // Open the modal when the card is clicked
    };

    const isVideo = (url) => {
        return url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg'));
    };

    const cardStyles = {
        ...styles.card,
        ...styles[props.size],
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
    };

    const mediaStyles = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        filter: hover ? 'brightness(50%)' : 'brightness(100%)',
        transition: 'all 0.3s ease-in-out',
    };

    const textStyles = {
        position: 'absolute',
        zIndex: 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '20px',
        opacity: hover ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        textAlign: 'center',
        width: '100%',
    };

    return (
        <>
            <div
                style={cardStyles}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={handleCardClick} // Trigger modal opening on click
            >
                {/* Display video if the source is video, otherwise display image */}
                {isVideo(props.img) ? (
                    <video style={mediaStyles} src={props.img} autoPlay loop muted />
                ) : (
                    <div
                        style={{
                            ...mediaStyles,
                            backgroundImage: `url(${props.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                )}
                <div style={textStyles}>
                    {props.text || 'Hover Text'}
                </div>
            </div>

            {/* Modal to display the PDF */}
            <PdfModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                pdfUrl={props.pdfUrl} // Pass the PDF URL as a prop
                text={props.textPara}
                detailsRoute={props.detailsRoute} // Pass the details route as a prop
            />
        </>
    );
}

const styles = {
    card: {
        margin: '15px 10px',
        padding: 0,
        borderRadius: '16px',
    },
    small: {
        gridRowEnd: 'span 26',
    },
    medium: {
        gridRowEnd: 'span 33',
    },
    large: {
        gridRowEnd: 'span 45',
    },
};

export default WorkCard;
