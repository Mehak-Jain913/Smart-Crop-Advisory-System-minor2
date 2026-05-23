import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Grid, Layers, Edit } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios'

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const email=localStorage.getItem('email')
  console.log(email)
   const [profile, setProfile] = useState({
    name: 'Raj Patil',
    location: 'Pune, Maharashtra',
    farmSize: '5 Acres',
    soilType: 'Black Cotton Soil',
    phone: '+91 9876543210'
  });
  useEffect(()=>{
    const res=axios.post('http://localhost:5001/profile',{
      email:email
    })
    .then((r)=>{
      setProfile(r.data.user)
    })
 },[email])
 
 console.log(profile)

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-card border border-border p-6 rounded-2xl shadow-sm relative overflow-hidden">

        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center border-4 border-background shadow-md">
            <User size={48} className="text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
            <p className="text-muted-foreground mt-1 flex items-center space-x-1">
              <MapPin size={16} /> <span>{profile.location}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-primary hover:bg-primary-600 text-primary-foreground px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 shadow-md shadow-primary/20"
        >
          {isEditing ? <span>Save Profile</span> : <><Edit size={16} /> <span>Edit Profile</span></>}
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <Layers className="text-primary" />
          <span>Farm Details</span>
        </h2>
        
        <div className="space-y-4">
          <ProfileField 
            icon={<User size={18} />} 
            label="Full Name" 
            name="name" 
            value={profile.name} 
            isEditing={isEditing} 
            onChange={handleChange} 
          />
          <ProfileField 
            icon={<MapPin size={18} />} 
            label="Location" 
            name="location" 
            value={profile.location} 
            isEditing={isEditing} 
            onChange={handleChange} 
          />
          <ProfileField 
            icon={<Grid size={18} />} 
            label="Farm Size" 
            name="farmSize" 
            value={profile.landArea} 
            isEditing={isEditing} 
            onChange={handleChange} 
          />
          <ProfileField 
            icon={<Layers size={18} />} 
            label="Soil Type" 
            name="soilType" 
            value={profile.soilType} 
            isEditing={isEditing} 
            onChange={handleChange} 
          />
        </div>
      </div>
    </motion.div>
  );
};

const ProfileField = ({ icon, label, name, value, isEditing, onChange }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border/50 last:border-0 group">
    <div className="flex items-center space-x-3 w-1/3 text-muted-foreground font-medium mb-1 sm:mb-0">
      <div className="p-1.5 bg-secondary rounded-md text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span>{label}</span>
    </div>
    <div className="flex-1">
      {isEditing ? (
        <input 
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-secondary border border-border p-2 rounded-md focus:ring-1 focus:ring-primary outline-none transition-all text-foreground text-sm"
        />
      ) : (
        <p className="text-foreground font-medium">{value}</p>
      )}
    </div>
  </div>
);
