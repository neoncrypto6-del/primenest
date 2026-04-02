import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { supabase, Property } from '../lib/supabase';

import {
ChevronLeft,
Share,
Heart,
Loader2,
Home,
Calendar,
Square,
Check,
Phone,
Mail,
X,
MapPin,
Upload
} from 'lucide-react';

export function PropertyDetailPage() {

const { id } = useParams<{ id: string }>();
const navigate = useNavigate();

const [property,setProperty] = useState<Property | null>(null);
const [loading,setLoading] = useState(true);

const [showGallery,setShowGallery] = useState(false);
const [galleryIndex,setGalleryIndex] = useState(0);

/* ---------------------------
SMART IMAGE UPLOAD STATES
----------------------------*/

const [uploadedImages,setUploadedImages] = useState<string[]>([]);

/* ---------------------------
FILE INPUT UPLOAD
----------------------------*/

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

if (!e.target.files) return;

const files = Array.from(e.target.files);

files.forEach(file => {

const reader = new FileReader();

reader.onload = () => {

setUploadedImages(prev => [
...prev,
reader.result as string
]);

};

reader.readAsDataURL(file);

});

};

/* ---------------------------
PASTE IMAGE SUPPORT
----------------------------*/

const handlePaste = useCallback((event: ClipboardEvent) => {

const items = event.clipboardData?.items;

if (!items) return;

for (let i = 0; i < items.length; i++) {

if (items[i].type.indexOf("image") !== -1) {

const blob = items[i].getAsFile();

if (!blob) return;

const reader = new FileReader();

reader.onload = () => {

setUploadedImages(prev => [
...prev,
reader.result as string
]);

};

reader.readAsDataURL(blob);

}

}

}, []);

/* ---------------------------
DRAG & DROP SUPPORT
----------------------------*/

const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {

e.preventDefault();

const files = Array.from(e.dataTransfer.files);

files.forEach(file => {

if (!file.type.startsWith("image")) return;

const reader = new FileReader();

reader.onload = () => {

setUploadedImages(prev => [
...prev,
reader.result as string
]);

};

reader.readAsDataURL(file);

});

};

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
e.preventDefault();
};

/* ---------------------------
PASTE LISTENER
----------------------------*/

useEffect(() => {

window.addEventListener("paste",handlePaste);

return () => {
window.removeEventListener("paste",handlePaste);
};

},[handlePaste]);

/* ---------------------------
FETCH PROPERTY
----------------------------*/

useEffect(() => {

async function fetchProperty() {

if (!id) return;

try {

const { data, error } = await supabase
.from('properties')
.select('*')
.eq('id', id)
.single();

if (error) throw error;

setProperty(data as Property);

}
catch(error){
console.error("Error fetching property",error);
}
finally{
setLoading(false);
}

}

fetchProperty();

},[id]);

if(loading){
return(
<div className="min-h-screen flex flex-col bg-white">
<Navbar/>
<div className="flex-grow flex justify-center items-center">
<Loader2 className="h-12 w-12 animate-spin text-blue-600"/>
</div>
</div>
)
}

if(!property){
return(
<div className="min-h-screen flex flex-col bg-white">
<Navbar/>

<div className="flex-grow flex flex-col justify-center items-center text-center px-4">

<h1 className="text-4xl font-bold text-gray-900 mb-4">
Property Not Found
</h1>

<p className="text-gray-600 mb-8">
The listing you are looking for does not exist.
</p>

<button
onClick={()=>navigate('/listings')}
className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium">

Back to Search

</button>

</div>
</div>
)
}

const images =
property.images && property.images.length > 0
? property.images
: [
'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'
];

const allImages = [...images,...uploadedImages];

return (

<div className="min-h-screen flex flex-col bg-white">

<Navbar/>

<main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">

{/* SMART IMAGE UPLOAD AREA */}

<div className="mb-10">

<h2 className="text-2xl font-bold mb-4">
Add Property Images
</h2>

<div
onDrop={handleDrop}
onDragOver={handleDragOver}
className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 transition cursor-pointer"
>

<Upload className="w-10 h-10 mx-auto text-gray-400 mb-3"/>

<p className="text-gray-600 mb-2">
Drag & drop images here
</p>

<p className="text-sm text-gray-500 mb-4">
or paste with <b>Ctrl + V</b>
</p>

<input
type="file"
multiple
accept="image/*"
onChange={handleFileUpload}
className="hidden"
id="fileUpload"
/>

<label
htmlFor="fileUpload"
className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer"
>

Upload Images

</label>

</div>

</div>

{/* IMAGE PREVIEW */}

{uploadedImages.length > 0 && (

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

{uploadedImages.map((img,index)=>(
<img
key={index}
src={img}
alt="uploaded"
className="rounded-lg object-cover h-40 w-full"
/>
))}

</div>

)}

{/* PROPERTY IMAGES */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

{allImages.map((img,index)=>(
<img
key={index}
src={img}
alt="property"
className="rounded-lg object-cover h-48 w-full"
/>
))}

</div>

</main>

<Footer/>

</div>

)

}
