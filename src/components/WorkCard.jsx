import React, { useState } from 'react';
import PdfModal from './PdfModal'; // Import the PdfModal component

function WorkCard({ img, text, size, pdfUrl, textPara, detailsRoute }) {
    const [hover, setHover] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open

    const handleCardClick = () => {
        setIsModalOpen(true); // Open the modal when the card is clicked
    };

    const isVideo = (url) => {
        return url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg'));
    };

    const cardStyles = {
        margin: '15px 10px',
        padding: 0,
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hover
            ? '0 8px 15px rgba(0, 0, 0, 0.3)' // Enhanced shadow on hover
            : '0 4px 6px rgba(0, 0, 0, 0.1)', // Default shadow
        transform: hover ? 'scale(1.05)' : 'scale(1)', // Enlarge effect on hover
        gridRowEnd: size === 'small' ? 'span 26' : size === 'medium' ? 'span 33' : 'span 45',
    };

    const mediaStyles = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        filter: hover ? 'brightness(60%)' : 'brightness(100%)', // Darken on hover
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
                {isVideo(img) ? (
                    <video style={mediaStyles} src={img} autoPlay loop muted />
                ) : (
                    <div
                        style={{
                            ...mediaStyles,
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                )}
                <div style={textStyles}>
                    {text || 'Hover Text'}
                </div>
            </div>

            {/* Modal to display the PDF */}
            <PdfModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                pdfUrl={pdfUrl} // Pass the PDF URL as a prop
                text={textPara}
                detailsRoute={detailsRoute} // Pass the details route as a prop
            />
        </>
    );
}

export default WorkCard;

