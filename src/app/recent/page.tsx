

'use client';

import React, { useEffect, useState } from 'react';



type Property = {
    id: string;
    title: string;
    description: string;
    city: string;
    type: string;
    price: number;
    images: string[];
    ownerId: number;
    highlight: boolean;
    datePosted: string;
    verified: boolean;
    availability: string;
};

const RecentPropertiesPage: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const isRecent = window.location.pathname.includes('/recent');
        console.log("isRecent", isRecent);
        const url = isRecent
            ? 'http://localhost:4001/properties?_sort=datePosted&_order=desc'
            : 'http://localhost:4001/properties??highlight=true';
        fetch(url)
            .then(async res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(res);
                const data = await res.json();
                console.log(data);
                setProperties(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Recent Properties</h1>
            {loading ? (
                <p>Loading...</p>
            ) : properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
                    {properties.map(property => (
                        <div key={property.id} style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
                            <img
                                src={property.images[0]}
                                alt={property.title}
                                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                            />
                            <div style={{ padding: '1rem' }}>
                                <h2 style={{ margin: '0 0 0.5rem 0' }}>{property.title}</h2>
                                <p style={{ margin: 0, color: '#555' }}>{property.city} &middot; {property.type}</p>
                                <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>Rs. {property.price}</p>
                                <p style={{ fontSize: 14, color: '#888' }}>
                                    Posted on {new Date(property.datePosted).toLocaleDateString()}
                                </p>
                                <p style={{ fontSize: 14, color: property.availability === 'Available' ? 'green' : 'red' }}>
                                    {property.availability}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentPropertiesPage;