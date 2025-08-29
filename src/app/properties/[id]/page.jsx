'use client';

import { useEffect, useState, use } from 'react';
// Import ImageCarousel component (adjust the path as needed)
import ImageCarousel from '../../components/ImageCarousel';

export default function PropertyDetail({ params }) {
    const { id } = use(params);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

   const bookAppointment = () => {
        const scheduledDate = prompt("Enter appointment date (YYYY-MM-DD):", "2025-07-23");
        if (!scheduledDate) return;

        // Get userId from localStorage (rentify_user)
        const userStr = localStorage.getItem('rentify_user');
        let userId = null;
        try {
            userId = userStr ? JSON.parse(userStr)?.id : null;
        } catch (e) {
            userId = null;
        }
        if (!userId) {
            alert('User not logged in.');
            return;
        }

        fetch(`http://localhost:4001/appointments?propertyId=${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            propertyId: Number(id),
            userId,
            ownerId: property?.ownerId,
            status: "confirmed",
            scheduledDate,
            timestamp: new Date().toISOString()
            })
        })
        .then(res => res.json())
        .then(data => {
            alert('Appointment booked successfully!');
        })
        .catch(err => {
            alert('Failed to book appointment.');
        });
    }

    useEffect(() => {
        // Replace with your actual API endpoint
        fetch(`http://localhost:4001/properties?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data[0]);
                setLoading(false);
            });
    }, [id]);

console.log("PROPERTY", property)
    if (loading) return <div>Loading...</div>;
    if (!property) return <div>Property not found.</div>;
    else
    return (
        <div style={{ maxWidth: 900, margin: '2rem auto', padding: 32, border: '1px solid #eee', borderRadius: 12, background: '#fafbfc' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {/* Image Gallery Carousel */}
                <div style={{ flex: '1 1 350px', minWidth: 320 }}>
                    {property?.images && property.images.length > 0 && (
                        <ImageCarousel images={property.images} title={property.title} />
                    )}
                </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {property?.images?.slice(1).map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Property image ${idx + 2}`}
                                style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 4, border: '1px solid #ddd' }}
                            />
                        ))}
                    </div>
                </div>
                {/* Details */}
                <div style={{ flex: '2 1 400px', minWidth: 320 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <h1 style={{ margin: 0 }}>{property.title}</h1>
                        {property.verified && (
                            <span style={{ background: '#e6f7e6', color: '#1a7f37', padding: '2px 10px', borderRadius: 6, fontSize: 14, fontWeight: 500 }}>
                                Verified
                            </span>
                        )}
                        {property.highlight && (
                            <span style={{ background: '#fffbe6', color: '#ad8b00', padding: '2px 10px', borderRadius: 6, fontSize: 14, fontWeight: 500 }}>
                                Highlighted
                            </span>
                        )}
                    </div>
                    <div style={{ margin: '12px 0 20px 0', color: '#888', fontSize: 16 }}>
                        <span>{property.type}</span> &middot; <span>{property.city}</span>
                    </div>
                    <h2 style={{ margin: '8px 0 16px 0', color: '#0070f3' }}>₹ {property.price} / month</h2>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Availability:</strong>{' '}
                        <span style={{
                            color: property.availability === 'Available' ? '#1a7f37' : '#d7263d',
                            fontWeight: 500
                        }}>
                            {property.availability}
                        </span>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Date Posted:</strong> {property.datePosted}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Description:</strong>
                        <p style={{ margin: '8px 0 0 0' }}>{property.description}</p>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <strong>Details:</strong>
                        <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
                            {property.bedrooms && <li>Bedrooms: {property.bedrooms}</li>}
                            {property.bathrooms && <li>Bathrooms: {property.bathrooms}</li>}
                            {property.area && <li>Area: {property.area} sq.ft.</li>}
                        </ul>
                    </div>
                    <button
                        style={{
                            marginTop: 24,
                            padding: '14px 36px',
                            background: property.availability === 'Available' ? '#0070f3' : '#aaa',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            cursor: property.availability === 'Available' ? 'pointer' : 'not-allowed',
                            fontSize: 18,
                            fontWeight: 500
                        }}
                        disabled={property.availability !== 'Available'}
                        onClick={bookAppointment}
                    >
                        Book Appointment
                    </button>
                </div>
            </div>
    );
}