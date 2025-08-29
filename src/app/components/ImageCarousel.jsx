import React, { useState } from "react";

const ImageCarousel = ({ images = [], title = "" }) => {
    const [current, setCurrent] = useState(0);

    if (!images.length) return null;

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: 500, margin: "auto" }}>
            {title && (
                <h3 style={{ textAlign: "center", marginBottom: 12 }}>{title}</h3>
            )}
            <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 8 }}
            />
            <button
                onClick={prevSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: 10,
                    transform: "translateY(-50%)",
                    background: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
                aria-label="Previous"
            >
                &#8592;
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                    background: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
                aria-label="Next"
            >
                &#8594;
            </button>
            <div style={{ textAlign: "center", marginTop: 8 }}>
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            margin: "0 4px",
                            borderRadius: "50%",
                            background: idx === current ? "#333" : "#ccc",
                            cursor: "pointer",
                        }}
                        onClick={() => setCurrent(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
