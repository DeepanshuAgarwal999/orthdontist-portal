# Dentist Profile API Documentation

This document provides detailed information about the Dentist Profile API endpoints for the Dentist Portal backend.

## Overview

The Dentist Profile API allows dentists to register their clinic information and enables public users to find dentists on a map. Key features include:

- **Simple Registration**: Minimal required fields to encourage dentist participation
- **Public Map Display**: Verified dentists appear on public map
- **Admin Verification**: Admin approval system for quality control
- **Location-based Search**: Find dentists by city, state, or radius
- **Professional Details**: Clinic info, hours, specialties, contact details

## Base URL

```
http://localhost:8080/api/v1/dentists
```

## Dentist Profile Model

```typescript
{
  id: string;
  clinicName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  openingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  description?: string; // Max 200 characters
  specialties?: string[];
  website?: string;
  isActive: boolean;
  isVerified: boolean; // Admin verification
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Dentist Routes (Authentication Required - Dentist Role)

#### 1. Create Dentist Profile

```http
POST /api/v1/dentists/profile
Content-Type: application/json
Authorization: Bearer <token>

{
  "clinicName": "Smile Dental Clinic",
  "phoneNumber": "+1-555-123-4567",
  "address": "123 Main Street, Suite 200",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "openingHours": {
    "monday": "9:00-17:00",
    "tuesday": "9:00-17:00",
    "wednesday": "9:00-17:00",
    "thursday": "9:00-17:00",
    "friday": "9:00-16:00",
    "saturday": "10:00-14:00"
  },
  "description": "Modern dental clinic specializing in general dentistry and cosmetic procedures.",
  "specialties": ["General Dentistry", "Cosmetic Dentistry", "Teeth Whitening"],
  "website": "https://smiledental.com"
}
```

#### 2. Get My Profile

```http
GET /api/v1/dentists/profile/me
```

#### 3. Update My Profile

```http
PUT /api/v1/dentists/profile/me
Content-Type: application/json

{
  "clinicName": "Updated Clinic Name",
  "phoneNumber": "+1-555-987-6543",
  "description": "Updated description with new services."
}
```

#### 4. Toggle My Profile Active Status

```http
PATCH /api/v1/dentists/profile/me/toggle-active
```

### Admin Routes (Authentication Required - Admin Role)

#### 1. Get All Dentists (Admin View)

```http
GET /api/v1/dentists/admin?page=1&limit=10&city=NewYork&search=dental
```

#### 2. Get Dentist Statistics

```http
GET /api/v1/dentists/admin/statistics
```

#### 3. Verify/Unverify Dentist

```http
PATCH /api/v1/dentists/admin/:id/verify
Content-Type: application/json

{
  "isVerified": true
}
```

#### 4. Update Any Dentist Profile

```http
PUT /api/v1/dentists/admin/:userId
Content-Type: application/json

{
  "isActive": true,
  "description": "Admin updated description"
}
```

#### 5. Delete Dentist Profile

```http
DELETE /api/v1/dentists/admin/:id
```

### Public Routes (No Authentication Required)

#### 1. Get Verified Dentists for Map

```http
GET /api/v1/dentists?city=NewYork&page=1&limit=20
```

Query Parameters:

- `city` (optional): Filter by city
- `state` (optional): Filter by state
- `search` (optional): Search in clinic name, description
- `specialty` (optional): Filter by specialty
- `latitude` (optional): For radius search
- `longitude` (optional): For radius search
- `radius` (optional): Search radius in kilometers
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

#### 2. Get Dentist by ID

```http
GET /api/v1/dentists/:id
```

## Registration Flow

### For Dentists:

1. **Sign up** as a dentist user
2. **Create profile** with minimal required information
3. **Wait for admin verification**
4. **Profile appears on public map** once verified

### Required Fields (Keep it Simple):

- Clinic Name
- Phone Number
- Full Address (Street, City, State, Zip)
- Opening Hours

### Optional Fields:

- Description (200 chars max)
- Specialties
- Website
- Coordinates (for precise map placement)

## Opening Hours Format

Opening hours are stored as JSON with day names as keys:

```json
{
  "monday": "9:00-17:00",
  "tuesday": "9:00-17:00",
  "wednesday": "9:00-17:00",
  "thursday": "9:00-17:00",
  "friday": "9:00-16:00",
  "saturday": "10:00-14:00",
  "sunday": "closed"
}
```

Format: `"HH:MM-HH:MM"` or `"closed"`

## Map Integration

The API provides coordinates and address information for map display:

```javascript
// Example: Using with Google Maps or other map services
const dentists = await fetch('/api/v1/dentists?city=NewYork');
dentists.data.forEach((dentist) => {
  // Add marker to map
  addMapMarker({
    lat: dentist.latitude,
    lng: dentist.longitude,
    title: dentist.clinicName,
    address: dentist.address,
    phone: dentist.phoneNumber,
    hours: dentist.openingHours,
  });
});
```

## Search Features

### Location-based Search:

```http
GET /api/v1/dentists?latitude=40.7128&longitude=-74.0060&radius=10
```

### Text Search:

```http
GET /api/v1/dentists?search=cosmetic
```

### Specialty Filter:

```http
GET /api/v1/dentists?specialty=Orthodontics
```

## Verification System

- **Unverified**: Profile created but not visible to public
- **Verified**: Admin-approved profile visible on public map
- **Active/Inactive**: Dentist can temporarily hide their profile

## Error Handling

Common error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

### Error Codes:

- `400`: Invalid input data
- `401`: Authentication required
- `403`: Insufficient permissions
- `404`: Profile not found
- `409`: Profile already exists

## Usage Examples

### Register as Dentist:

```bash
curl -X POST http://localhost:8080/api/v1/dentists/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "clinicName": "Downtown Dental",
    "phoneNumber": "555-0123",
    "address": "456 Oak Street",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90210",
    "openingHours": {
      "monday": "8:00-17:00",
      "tuesday": "8:00-17:00",
      "wednesday": "8:00-17:00",
      "thursday": "8:00-17:00",
      "friday": "8:00-16:00"
    }
  }'
```

### Find Nearby Dentists:

```bash
curl "http://localhost:8080/api/v1/dentists?city=Los%20Angeles&limit=5"
```

## Notes

- Keep registration form simple to encourage participation
- Coordinates can be auto-generated from address using geocoding services
- Admin verification ensures quality and prevents spam
- Profile must be both `isVerified: true` and `isActive: true` to appear publicly
- Search radius uses approximate bounding box calculation (can be enhanced with proper geospatial libraries)
