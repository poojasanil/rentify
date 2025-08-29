

'use client';
import React, { useEffect, useState } from 'react';

interface Appointment {
    id: string;
    propertyId: number;
    userId: string;
    ownerId: number;
    status: string;
    scheduledDate: string;
    timestamp: string;
}

const MyAppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
const deleteBooking = (aptId: any) => {
    fetch(`http://localhost:4001/appointments/${aptId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
            if (!res.ok) throw new Error('Failed to delete appointment');
            setAppointments((prev) => prev.filter((apt) => apt.id !== aptId));
        })
        .catch((err) => {
            setError(err.message || 'Error deleting appointment');
        });
}
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const userStr = localStorage.getItem('rentify_user');
                if (!userStr) {
                    setError('Kindly Login to view your appointments');
                    setLoading(false);
                    return;
                }
                const user = JSON.parse(userStr);
                const userId = user.id || user.userId || user._id;
                if (!userId) {
                    setError('User ID not found');
                    setLoading(false);
                    return;
                }
                const res = await fetch(`http://localhost:4001/appointments/?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });    if (!res.ok) throw new Error('Failed to fetch appointments');
                const data = await res.json();
                setAppointments(data);
            } catch (err: any) {
                setError(err.message || 'Error fetching appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <div>Loading appointments...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>My Appointments</h2>
            {appointments.length === 0 ? (
                <div>No appointments found.</div>
            ) : (
                <ul>
                    {appointments.map((appt) => (
                        <div key={appt.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                            <strong>Property ID:</strong> {appt.propertyId} <br />
                            <strong>Scheduled Date:</strong> {appt.scheduledDate} <br />
                            <strong>Status:</strong> {appt.status} <br />
                            <strong>Appointment ID:</strong> {appt.id} <br />
                            <strong>Owner ID:</strong> {appt.ownerId} <br />
                            <strong>Created At:</strong> {appt.timestamp}
                            <div>
                                <button style={{ marginTop: '8px', marginLeft: '8px', padding: '8px 16px', backgroundColor: '#e00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={() => deleteBooking(appt.id)}>Delete Booking</button>
                            </div>
                        </div>  
                    
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyAppointmentsPage;