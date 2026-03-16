import React, { useRef } from 'react';
import { FishIcon, UploadIcon } from 'lucide-react';
export interface HeaderData {
  companyName: string;
  subtitle: string;
  title: string;
  tagline1: string;
  tagline2: string;
  logoUrl: string | null;
}
interface PriceListHeaderProps {
  data: HeaderData;
  onChange: (field: keyof HeaderData, value: string | null) => void;
  isEditing: boolean;
}
export function PriceListHeader({
  data,
  onChange,
  isEditing
}: PriceListHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleLogoClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange('logoUrl', ev.target?.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b-4 border-[#1B6B9C] pb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogoClick}
          className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0C2340] text-white shadow-md overflow-hidden group border-0 p-0 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
          title={isEditing ? 'Click to upload logo' : ''}>
          
          {data.logoUrl ?
          <img
            src={data.logoUrl}
            alt="Logo"
            className="h-full w-full object-cover" /> :


          <FishIcon className="h-8 w-8" />
          }
          {isEditing &&
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity print:hidden">
              <UploadIcon className="h-5 w-5 text-white" />
            </div>
          }
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" />
        
        <div className="flex flex-col">
          {isEditing ?
          <>
              <input
              type="text"
              value={data.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              className="text-2xl font-black tracking-tight text-[#0C2340] uppercase bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 -ml-1 w-full max-w-[300px]"
              placeholder="Company Name" />
            
              <input
              type="text"
              value={data.subtitle}
              onChange={(e) => onChange('subtitle', e.target.value)}
              className="text-sm font-medium text-[#1B6B9C] bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 -ml-1 w-full max-w-[300px]"
              placeholder="Subtitle" />
            
            </> :

          <>
              <h1 className="text-2xl font-black tracking-tight text-[#0C2340] uppercase px-1 -ml-1">
                {data.companyName}
              </h1>
              <p className="text-sm font-medium text-[#1B6B9C] px-1 -ml-1">
                {data.subtitle}
              </p>
            </>
          }
        </div>
      </div>

      <div className="flex-1 md:mx-8">
        <div className="rounded-sm border-2 border-[#1B6B9C] bg-[#F0F7FA] py-2 px-4 text-center shadow-sm">
          {isEditing ?
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            className="text-xl font-bold text-[#0C2340] md:text-2xl bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded w-full text-center"
            placeholder="Document Title" /> :


          <h2 className="text-xl font-bold text-[#0C2340] md:text-2xl">
              {data.title}
            </h2>
          }
        </div>
      </div>

      <div className="hidden text-right md:flex md:flex-col md:items-end">
        {isEditing ?
        <>
            <input
            type="text"
            value={data.tagline1}
            onChange={(e) => onChange('tagline1', e.target.value)}
            className="text-3xl font-black italic text-[#0C2340] opacity-90 bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 text-right w-48" />
          
            <input
            type="text"
            value={data.tagline2}
            onChange={(e) => onChange('tagline2', e.target.value)}
            className="text-lg font-bold tracking-widest text-[#1B6B9C] bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 text-right w-48" />
          
          </> :

        <>
            <div className="text-3xl font-black italic text-[#0C2340] opacity-90 px-1">
              {data.tagline1}
            </div>
            <div className="text-lg font-bold tracking-widest text-[#1B6B9C] px-1">
              {data.tagline2}
            </div>
          </>
        }
      </div>
    </div>);

}