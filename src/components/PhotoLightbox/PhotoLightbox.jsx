import { useState, useEffect, useCallback, useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import './PhotoLightbox.css';

// Expand button enlarges the fitted photo by this much (never beyond the photo's real size)
const EXPAND_FACTOR = 1.15;

/**
 * Shared photo pop-up used by the Gallery and About pages.
 *
 *   <PhotoLightbox
 *       images={[{ src: 'https://…/photo.jpg', alt: '…' }, …]}
 *       index={openIndex}               // number, or null when closed
 *       onIndexChange={setOpenIndex}    // called with the new index, or null to close
 *   />
 *
 * Photo opens at its real size and shrinks only to fit the window (like prettyPhoto on the
 * original site); expand button; hover the left / right half for previous / next; ← → Esc keys.
 */
function PhotoLightbox({ images, index, onIndexChange }) {
    const [expanded, setExpanded] = useState(false);
    const [expandedSize, setExpandedSize] = useState(null);
    const [canExpand, setCanExpand] = useState(false);
    const imgRef = useRef(null);

    const isOpen = index !== null && index !== undefined && images?.length > 0;
    const count = images?.length || 0;
    const image = isOpen ? images[Math.min(index, count - 1)] : null;

    const close = useCallback(() => onIndexChange(null), [onIndexChange]);
    const go = useCallback((direction) => {
        if (!count) return;
        onIndexChange(direction === 'next' ? (index + 1) % count : (index - 1 + count) % count);
    }, [index, count, onIndexChange]);

    // A new photo always opens fitted to the window
    useEffect(() => {
        setExpanded(false);
        setExpandedSize(null);
        setCanExpand(false);
    }, [image?.src]);

    // Is the photo shown smaller than its real size? Then offer the expand button.
    const checkCanExpand = useCallback(() => {
        const img = imgRef.current;
        if (!img || !img.naturalWidth) return;
        setCanExpand(img.naturalWidth > img.clientWidth + 1 || img.naturalHeight > img.clientHeight + 1);
    }, []);

    useEffect(() => {
        if (!isOpen || expanded) return undefined;
        window.addEventListener('resize', checkCanExpand);
        return () => window.removeEventListener('resize', checkCanExpand);
    }, [isOpen, expanded, checkCanExpand]);

    const expand = useCallback(() => {
        const img = imgRef.current;
        if (!img) return;
        const width = Math.min(img.naturalWidth, Math.round(img.clientWidth * EXPAND_FACTOR));
        const height = Math.round(width * (img.naturalHeight / img.naturalWidth));
        setExpandedSize({ width, height });
        setExpanded(true);
    }, []);

    const fit = useCallback(() => {
        setExpanded(false);
        setExpandedSize(null);
    }, []);

    // Keyboard: Esc closes, ← / → change photo
    useEffect(() => {
        if (!isOpen) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowRight') go('next');
            else if (e.key === 'ArrowLeft') go('prev');
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, close, go]);

    if (!isOpen) return null;

    return (
        <div
            className={`lightbox-overlay ${expanded ? 'is-expanded' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
        >
            <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
                {(canExpand || expanded) && (expanded ? (
                    <CloseFullscreenIcon
                        className="lightbox-expand"
                        onClick={fit}
                        aria-label="Fit image to window"
                        titleAccess="Fit to window"
                    />
                ) : (
                    <OpenInFullIcon
                        className="lightbox-expand"
                        onClick={expand}
                        aria-label="Show image larger"
                        titleAccess="Expand the image"
                    />
                ))}
                <CancelIcon
                    className="lightbox-close"
                    onClick={close}
                    aria-label="Close lightbox"
                />
                <div className="lightbox-image-wrapper">
                    <div className="lightbox-image-holder">
                        <img
                            ref={imgRef}
                            src={image.src}
                            alt={image.alt || ''}
                            style={expanded && expandedSize ? { width: expandedSize.width, height: expandedSize.height } : undefined}
                            onLoad={checkCanExpand}
                        />
                        {count > 1 && (
                            <>
                                {/* Hover the left / right half of the photo to show the previous / next arrow */}
                                <button
                                    type="button"
                                    className="lightbox-hover-nav lightbox-hover-prev"
                                    onClick={() => go('prev')}
                                    aria-label="Previous image"
                                >
                                    <ArrowCircleLeftIcon className="lightbox-hover-icon" />
                                </button>
                                <button
                                    type="button"
                                    className="lightbox-hover-nav lightbox-hover-next"
                                    onClick={() => go('next')}
                                    aria-label="Next image"
                                >
                                    <ArrowCircleRightIcon className="lightbox-hover-icon" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="lightbox-controls">
                    <ArrowCircleLeftIcon
                        className="lightbox-nav lightbox-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            go('prev');
                        }}
                        aria-label="Previous image"
                    />
                    <span className="lightbox-counter">
                        {index + 1} / {count}
                    </span>
                    <ArrowCircleRightIcon
                        className="lightbox-nav lightbox-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            go('next');
                        }}
                        aria-label="Next image"
                    />
                </div>
            </div>
        </div>
    );
}

export default PhotoLightbox;
