import React from 'react';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  InfoIcon,
  PlusIcon,
  Trash2Icon } from
'lucide-react';
export interface FooterData {
  phone: string;
  email: string;
  address: string;
  terms: string[];
}
interface PriceListFooterProps {
  data: FooterData;
  onChange: (field: keyof FooterData, value: any) => void;
  isEditing: boolean;
}
export function PriceListFooter({
  data,
  onChange,
  isEditing
}: PriceListFooterProps) {
  const updateTerm = (index: number, value: string) => {
    const newTerms = [...data.terms];
    newTerms[index] = value;
    onChange('terms', newTerms);
  };
  const addTerm = () => {
    onChange('terms', [...data.terms, 'New term and condition...']);
  };
  const removeTerm = (index: number) => {
    const newTerms = data.terms.filter((_, i) => i !== index);
    onChange('terms', newTerms);
  };
  return (
    <div className="mt-8 flex flex-col gap-6 border-t-2 border-slate-200 pt-6 md:flex-row md:justify-between">
      {/* Contact Info */}
      <div className="flex-1 space-y-3 text-sm text-slate-600">
        <h3 className="font-bold text-[#0C2340] text-base mb-2">Contact Us</h3>
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-4 w-4 text-[#1B6B9C] shrink-0" />
          {isEditing ?
          <input
            type="text"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 w-full max-w-[300px]" /> :


          <span className="px-1">{data.phone}</span>
          }
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="h-4 w-4 text-[#1B6B9C] shrink-0" />
          {isEditing ?
          <input
            type="text"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 w-full max-w-[300px]" /> :


          <span className="px-1">{data.email}</span>
          }
        </div>
        <div className="flex items-start gap-2">
          <MapPinIcon className="h-4 w-4 text-[#1B6B9C] shrink-0 mt-1" />
          {isEditing ?
          <textarea
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 w-full max-w-[300px] resize-none"
            rows={2} /> :


          <span className="px-1 leading-relaxed">{data.address}</span>
          }
        </div>
      </div>

      {/* Terms & Notes */}
      <div className="flex-1 rounded-md bg-slate-50 p-4 text-xs text-slate-600 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <InfoIcon className="h-4 w-4 text-[#1B6B9C]" />
          <h3 className="font-bold text-[#0C2340] text-sm">
            Terms & Conditions
          </h3>
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {data.terms.map((term, index) =>
          <li key={index} className="group relative">
              <div className="flex items-start gap-2">
                {isEditing ?
              <>
                    <textarea
                  value={term}
                  onChange={(e) => updateTerm(index, e.target.value)}
                  className="bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-200 rounded px-1 w-full resize-none"
                  rows={1} />
                
                    <button
                  onClick={() => removeTerm(index)}
                  className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity print:hidden shrink-0 mt-0.5"
                  title="Remove Term">
                  
                      <Trash2Icon className="w-3 h-3" />
                    </button>
                  </> :

              <span className="px-1 leading-relaxed">{term}</span>
              }
              </div>
            </li>
          )}
        </ul>
        {isEditing &&
        <button
          onClick={addTerm}
          className="mt-3 flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors print:hidden font-medium">
          
            <PlusIcon className="w-3 h-3" /> Add Term
          </button>
        }
      </div>
    </div>);

}