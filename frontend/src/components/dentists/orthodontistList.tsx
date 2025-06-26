'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Phone, Clock, Calendar, Navigation, ZoomIn, Map, Satellite, X, RotateCcw, PhoneCall } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'
import { OrthodontistService } from '@/service/orthodontist.service'
import axiosInstance from '@/config/axios.instance'
import Link from 'next/link'

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })


interface Orthodontist {
    id: string
    firstName: string
    lastName: string
    location: string
    latitude: string,
    longitude: string,
    clinicName: string
    phone: string
}

const OrthodontistList = () => {
    const [selectedClinic, setSelectedClinic] = useState<Orthodontist | null>(null)
    const [mapView, setMapView] = useState<'map' | 'satellite'>('map')
    const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]) // Mumbai center
    const [mapZoom, setMapZoom] = useState(12)
    const mapRef = useRef<any>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const clinicListRef = useRef<HTMLDivElement>(null)


    // Load Leaflet CSS
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const leafletLink = document.createElement('link')
            leafletLink.rel = 'stylesheet'
            leafletLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
            document.head.appendChild(leafletLink)
        }
    }, [])



    // Mock data - replace with actual data

    const { data, isLoading } = useQuery({
        queryKey: ['orthodontists'],
        queryFn: async () => {
            const response = await axiosInstance.get<{ users: Orthodontist[] }>('/user/coordinates')
            return response.data
        }
    })

    const orthodontists = data?.users || []

    const filteredOrthodontists = orthodontists.filter((clinic) => {
        if (!searchQuery.trim()) return true

        const query = searchQuery.toLowerCase()
        const clinicName = clinic.clinicName.toLowerCase()
        const location = clinic.location.toLowerCase()
        const doctorName = `${clinic.firstName} ${clinic.lastName}`.toLowerCase()

        return clinicName.includes(query) ||
            location.includes(query) ||
            doctorName.includes(query)
    })
    
    useEffect(() => {
        setSelectedClinic(null)
        handleResetMap()
    }, [searchQuery])

    const handleClinicSelect = (clinic: Orthodontist) => {
        setSelectedClinic(clinic)

        // Center map on selected clinic
        const newCenter: [number, number] = [parseFloat(clinic.latitude), parseFloat(clinic.longitude)]
        const newZoom = 15
        setMapCenter(newCenter)
        setMapZoom(newZoom)

        // Update map view if map ref exists
        if (mapRef.current) {
            mapRef.current.setView(newCenter, newZoom)
        }

        // Scroll to the selected clinic card in the list
        if (clinicListRef.current) {
            const selectedCard = clinicListRef.current.querySelector(`[data-clinic-id="${clinic.id}"]`)
            if (selectedCard) {
                selectedCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }
        }
    }
    const handleResetMap = () => {
        const newCenter: [number, number] = [19.0760, 72.8777]
        const newZoom = 12
        setMapCenter(newCenter)
        setMapZoom(newZoom)
        setSelectedClinic(null)

        if (mapRef.current) {
            mapRef.current.setView(newCenter, newZoom)
        }
    }

    const handleZoomIn = () => {
        const newZoom = Math.min(mapZoom + 1, 18)
        setMapZoom(newZoom)
        if (mapRef.current) {
            mapRef.current.setZoom(newZoom)
        }
    }

    const handleZoomOut = () => {
        const newZoom = Math.max(mapZoom - 1, 1)
        setMapZoom(newZoom)
        if (mapRef.current) {
            mapRef.current.setZoom(newZoom)
        }
    }


    // Create simple red marker icon
    const createRedMarkerIcon = (isSelected = false) => {
        if (typeof window !== 'undefined') {
            const L = require('leaflet')

            const markerColor = isSelected ? '#dc2626' : '#ef4444' // Darker red for selected, lighter for normal
            const markerSize = isSelected ? 'scale-110' : 'scale-100'

            const iconHtml = `<div class="text-white p-1 rounded-full shadow-lg ${markerSize} transform transition-transform" style="background-color: ${markerColor};">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            </div>`

            return L.divIcon({
                html: iconHtml,
                className: 'custom-red-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            })
        }
        return null
    }
    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="mt-4 text-lg text-gray-600">Loading...</p>
                <p className="mt-2 text-sm text-gray-500">Getting best dental clinics for you...</p>
            </div>
        </div>)
    }
    return (
        <div className=" bg-neutral-50">
            {/* Search Header */}
            <div>
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4 my-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                            <input
                                type="text"
                                placeholder="Enter a Location"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                            />
                        </div>
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row h-[calc(100vh-100px)]">
                {/* Left Sidebar - Clinic List */}
                <div className="w-full md:w-1/3 bg-white border-r border-neutral-200 overflow-y-auto">
                    {/* Results Header */}
                    <div className="bg-primary-600  px-4 py-3">
                        <h2 className="font-semibold">Orthodontist Clinics Near You: {filteredOrthodontists.length}</h2>
                    </div>

                    {/* Clinic Cards */}
                    <div className="divide-y divide-neutral-200">
                        {filteredOrthodontists?.map((clinic) => (
                            <div
                                key={clinic.id}
                                data-clinic-id={clinic.id}
                                className={`p-4 cursor-pointer hover:bg-gray-100 bg-neutral-50 transition-colors ${selectedClinic?.id === clinic.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                                    }`}
                                onClick={() => handleClinicSelect(clinic)}
                            >
                                <h3 className="font-semibold text-neutral-900 mb-2">{clinic.clinicName}</h3>

                                <div className="space-y-2 text-sm text-neutral-600 pl-2">
                                    <div className="flex items-start space-x-2">
                                        <MapPin className="text-neutral-400 mt-0.5 flex-shrink-0" size={16} />
                                        <span>{clinic.location},</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <PhoneCall className="size-4" />
                                        <Link href={`tel:${clinic.phone}`} className="text-primary-600 hover:underline cursor-pointer">{clinic.phone}</Link>
                                    </div>

                                </div>


                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Map */}
                <div className="flex-1 relative">
                    {/* Map Controls */}
                    <div className="absolute top-4 left-4 z-[1000] flex space-x-2">
                        <button
                            onClick={() => setMapView('map')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${mapView === 'map'
                                ? 'bg-white text-neutral-900 shadow-md'
                                : 'bg-white/80 text-neutral-600 hover:bg-white'
                                }`}
                        >
                            Map
                        </button>
                        <button
                            onClick={() => setMapView('satellite')}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${mapView === 'satellite'
                                ? 'bg-white text-neutral-900 shadow-md'
                                : 'bg-white/80 text-neutral-600 hover:bg-white'
                                }`}
                        >
                            Satellite
                        </button>
                    </div>

                    {/* Reset Map Button */}
                    <div className="absolute top-4 right-4 z-[1000]">
                        <button
                            onClick={handleResetMap}
                            className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
                        >
                            <RotateCcw size={16} />
                            <span>Reset Map</span>
                        </button>
                    </div>

                    {/* Leaflet Map Container */}
                    <div className="w-full h-full">
                        <MapContainer
                            center={mapCenter}
                            zoom={mapZoom}
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                            ref={mapRef}
                        >
                            <TileLayer
                                url={mapView === 'satellite'
                                    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                }
                                attribution={mapView === 'satellite'
                                    ? '&copy; <a href="https://www.esri.com/">Esri</a>'
                                    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                }
                            />

                            {/* Clinic Markers */}
                            {filteredOrthodontists.map((clinic) => (
                                <Marker
                                    key={clinic.id}
                                    position={[parseFloat(clinic.latitude), parseFloat(clinic.longitude)]}
                                    icon={createRedMarkerIcon(selectedClinic?.id === clinic.id)}
                                    eventHandlers={{
                                        click: () => handleClinicSelect(clinic)
                                    }}
                                />
                            ))}
                        </MapContainer>
                    </div>

                    {/* Custom Zoom Controls */}
                    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col space-y-2">
                        <button
                            className="bg-white hover:bg-neutral-50 p-2 rounded-md shadow-md transition-colors"
                            onClick={handleZoomIn}
                        >
                            <ZoomIn size={20} />
                        </button>
                        <button
                            className="bg-white hover:bg-neutral-50 p-2 rounded-md shadow-md transition-colors"
                            onClick={handleZoomOut}
                        >
                            <div className="w-5 h-5 flex items-center justify-center text-lg font-bold">-</div>
                        </button>
                    </div>

                    {/* Selected Clinic Info Popup */}
                    {selectedClinic && (
                        <div className="absolute top-20 left-6 bg-white rounded-lg shadow-xl border border-neutral-200 p-4 max-w-sm z-[1000]">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-neutral-900 mb-1">{selectedClinic.clinicName}</h3>
                                    <p className="text-sm text-neutral-600 mb-2">
                                        {selectedClinic.location}
                                    </p>



                                    <div className="flex space-x-2">
                                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
                                            Direction
                                        </button>
                                        <button
                                            onClick={() => {
                                                const newCenter: [number, number] = [parseFloat(selectedClinic.latitude), parseFloat(selectedClinic.longitude)]
                                                const newZoom = 18
                                                setMapCenter(newCenter)
                                                setMapZoom(newZoom)
                                                if (mapRef.current) {
                                                    mapRef.current.setView(newCenter, newZoom)
                                                }
                                            }}
                                            className="bg-secondary-600 hover:bg-secondary-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                                        >
                                            Zoom
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedClinic(null)}
                                    className="text-neutral-400 hover:text-neutral-600 p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrthodontistList