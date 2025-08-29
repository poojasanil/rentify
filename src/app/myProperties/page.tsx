'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Property {
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
}

const MyPropertiesPage = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    
        const [showForm, setShowForm] = useState(false);
        const [form, setForm] = useState<Omit<Property, 'id' | 'ownerId' | 'datePosted'>>({
            title: '',
            description: '',
            city: '',
            type: '',
            price: 0,
            images: [],
            highlight: false,
            verified: false,
            availability: '',
        });

    useEffect(() => {
        const fetchProperties = async () => {
            const user = localStorage.getItem('rentify_user');
            if (!user) {
                setLoading(false);
                return;
            }
            const { id: ownerId } = JSON.parse(user);
            try {
                const res = await fetch(`/properties?ownerId=${ownerId}`);
                const data = await res.json();
                setProperties(data);
            } catch (error) {
                setProperties([]);
            }
            setLoading(false);
        };
        fetchProperties();
    }, []);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            setForm((prev) => ({
                ...prev,
                [name]: type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value,
            }));
        };

        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const files = Array.from(e.target.files);
                const urls = files.map((file) => URL.createObjectURL(file));
                setForm((prev) => ({
                    ...prev,
                    images: urls,
                }));
            }
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const user = localStorage.getItem('rentify_user');
            console.log(user)
            if (user) {
                const parsedUser = JSON.parse(user);
                if (!parsedUser || !parsedUser.id) {
                    alert("Kindly login to add property");
                    return;
                }
                const { id } = parsedUser;
    
                const newProperty: Property = {
                    ...form,
                    id: crypto.randomUUID(),
                    ownerId: Number(id),
                    datePosted: new Date().toISOString(),
                };
                await fetch('/properties', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newProperty),
                }).then((res) => {
                    if (!res.ok) throw new Error('Failed to add property');
                    console.log('Property added successfully');
                    console.log(res);
                }).catch((err) => {
                    alert(err.message || 'Error adding property');
                });
                setShowForm(false);
                setLoading(true);
                // Refresh property list
                const res = await fetch(`/properties?ownerId=${id}`);
                const data = await res.json();
                setProperties(data);
                setLoading(false);
            } else {
                alert("Kindly login to add property");
            }
        };
    const handleAddProperty = () => {

       console.log("Clicked");
            setShowForm(true);

        // Render the form above the property list
    };

    return (
        <div>
            {showForm && ( <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '24px auto', background: '#fafafa', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3>Add New Property</h3>
                Title: <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                Price: <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                <input name="availability" placeholder="Availability" value={form.availability} onChange={handleChange} required style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                <input name="images" type="file" multiple accept="image/*" onChange={handleImageChange} style={{ marginBottom: 8 }} />
                <div style={{ marginBottom: 8 }}>
                    <label>
                        <input name="highlight" type="checkbox" checked={form.highlight} onChange={handleChange} /> Highlight
                    </label>
                    <label style={{ marginLeft: 16 }}>
                        <input name="verified" type="checkbox" checked={form.verified} onChange={handleChange} /> Verified
                    </label>
                </div>
                <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 20px', fontWeight: 600, cursor: 'pointer' }}>
                    Submit
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: 12, background: '#eee', color: '#333', border: 'none', borderRadius: 4, padding: '10px 20px', fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                </button>
            </form>)}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 16 }}>
                <button
                    onClick={handleAddProperty}
                    style={{
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '10px 20px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(25, 118, 210, 0.08)',
                        transition: 'background 0.2s',
                    }}
                >
                    Add new Property
                </button>
            </div>
            <h2>My Properties</h2>
            {loading ? (
                <p>Loading...</p>
            ) : properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                <ul>
                    {properties.map((property) => (
                        <li key={property.id} style={{ listStyle: 'none', marginBottom: 24 }}>
                            <div
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: 8,
                                    padding: 20,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    display: 'flex',
                                    gap: 20,
                                    alignItems: 'flex-start',
                                    background: property.highlight ? '#f9fbe7' : '#fff',
                                }}
                            >
                                <img
                                    src={property.images?.[0] || '/placeholder.jpg'}
                                    alt={property.title}
                                    style={{
                                        width: 120,
                                        height: 90,
                                        objectFit: 'cover',
                                        borderRadius: 6,
                                        border: '1px solid #eee',
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <h3 style={{ margin: 0 }}>{property.title}</h3>
                                        {property.verified && (
                                            <span style={{
                                                background: '#e0f7fa',
                                                color: '#00796b',
                                                fontSize: 12,
                                                padding: '2px 8px',
                                                borderRadius: 4,
                                                marginLeft: 4,
                                            }}>
                                                Verified
                                            </span>
                                        )}
                                        {property.highlight && (
                                            <span style={{
                                                background: '#fffde7',
                                                color: '#fbc02d',
                                                fontSize: 12,
                                                padding: '2px 8px',
                                                borderRadius: 4,
                                                marginLeft: 4,
                                            }}>
                                                Highlighted
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ margin: '8px 0 4px 0', color: '#555' }}>{property.description}</p>
                                    <div style={{ fontSize: 14, color: '#666', marginBottom: 6 }}>
                                        <span style={{ marginRight: 16 }}>
                                            <strong>Type:</strong> {property.type}
                                        </span>
                                        <span style={{ marginRight: 16 }}>
                                            <strong>City:</strong> {property.city}
                                        </span>
                                        <span>
                                            <strong>Availability:</strong> {property.availability}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 14, color: '#888', marginBottom: 6 }}>
                                        <span>
                                            <strong>Date Posted:</strong> {new Date(property.datePosted).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div style={{ fontWeight: 600, fontSize: 18, color: '#1976d2' }}>
                                        ${property.price.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyPropertiesPage;
