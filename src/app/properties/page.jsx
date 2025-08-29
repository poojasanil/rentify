'use client'

import { useAuth } from "../../context/AuthContext"
import { fetchAllProperties } from "@/slices/propertiesSlice"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"

export default function Properties (){

    const dispatch = useDispatch()
  const { user } = useAuth()
  const { items: properties, loading, error } = useSelector((state) => state?.properties)
  const [propertiess, setPropertiess] = useState({})
  const [selectedBooking, setSelectedBooking] = useState(null)
  const { t } = useTranslation()
  useEffect(() => {
    console.log(user)
    if (user) {
      dispatch(fetchAllProperties)
    }
  }, [dispatch, user])

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      
      const res = await fetch("http://localhost:4001/properties");
      console.log(res)
    const properties = await res.json();
    setPropertiess(properties)
      const propertyDetails = {}
      console.log('Fetching details for properties:', properties)
      // for (const property of properties) {
      //   if (!propertyDetails[property.id]) {
      //     const response = await fetch(`http://localhost:4001/properties/${property.id}`)
      //     const event = await response.json()
      //     console.log('Fetched property details:', event)
      //     propertyDetails[property.id] = event
      //   }
      // }
      // setPropertiess(propertyDetails)
    }
console.log('Properties:', propertiess)
    // if (properties.length > 0) {
      fetchPropertyDetails()
    // }
  }, [])

  // const handleCancelProperty = async (propertyId) => {
  //   if (!confirm('Are you sure you want to cancel this property?')) {
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`http://localhost:4001/invoices/${propertyId}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         status: 'cancelled'
  //       })
  //     });

  //     if (!response.ok) throw new Error('Failed to cancel property');

  //     dispatch(fetchAllProperties);
  //   } catch (error) {
  //     console.error('Error cancelling property:', error);
  //     alert('Failed to cancel property. Please try again.');
  //   }
  // };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your properties</h1>
        {/* <Link 
          href="/login" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Sign In
        </Link> */}
      </div>
    )
  }

  // if (loading) {
  //   return <div className="text-center py-12">Loading your properties...</div>
  // }

  // if (error) {
  //   return <div className="text-center py-12 text-red-600">Error: {error}</div>
  // }

  // if (!properties.length) {
  //   return (
  //     <div className="text-center py-12">
  //       <div className="text-6xl mb-4">😊</div>
  //       <h1 className="text-2xl font-bold mb-4">No properties yet!</h1>
  //       {/* <p className="mb-4">Start exploring events and book your tickets.</p>
  //       <Link 
  //         href="/featured-events" 
  //         className="text-blue-600 hover:text-blue-800 underline"
  //       >
  //         Browse Featured Events
  //       </Link> */}
  //     </div>
  //   )
  // }


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      {/* Add property listing components here */}
      {propertiess && propertiess.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propertiess.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={property.images?.[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                {property.verified && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Verified
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold mb-1">{property.title}</h2>
                <div className="text-gray-600 text-sm mb-2">{property.city}</div>
                <div className="text-gray-800 font-bold mb-2">${property.price}</div>
                <div className="text-xs text-gray-500 mb-2">
                  Posted on: {property.datePosted}
                </div>
                <div className="text-sm mb-2">{property.description}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      property.availability === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {property.availability}
                  </span>
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                    {property.type}
                  </span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <Link
                    href={`/properties/${property.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                  {/* <button
                    onClick={() => handleCancelProperty(property.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Cancel
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😊</div>
          <h1 className="text-2xl font-bold mb-4">No properties yet!</h1>
        </div>
      )}
    </div>
  );
}