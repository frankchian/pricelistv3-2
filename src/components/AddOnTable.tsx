import React from 'react';
import { AddOnItem, generateId } from '../data/priceList';
import { PlusIcon, Trash2Icon, SparklesIcon } from 'lucide-react';
import { CustomerType } from './PriceListTable';
interface AddOnTableProps {
  data: AddOnItem[];
  activeCustomer: CustomerType;
  onChange: (newData: AddOnItem[]) => void;
  isEditing: boolean;
}
export function AddOnTable({
  data,
  activeCustomer,
  onChange,
  isEditing
}: AddOnTableProps) {
  const updateItem = (id: string, field: keyof AddOnItem, value: any) => {
    onChange(
      data.map((item) =>
      item.id === id ?
      {
        ...item,
        [field]: value
      } :
      item
      )
    );
  };
  const addItem = () => {
    onChange([
    ...data,
    {
      id: generateId(),
      code: 'AO-NEW',
      description: 'New Add-On',
      unit: 'per KG',
      fishShopPrice: 0,
      restaurantPrice: 0,
      wholesalePrice: 0
    }]
    );
  };
  const removeItem = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };
  const getPrintVisibility = (type: CustomerType) => {
    if (!activeCustomer) return '';
    if (activeCustomer === type) return '';
    return 'print:hidden';
  };
  const getColumnHighlight = (type: CustomerType) => {
    if (activeCustomer === type) return 'bg-amber-100/60';
    if (activeCustomer && activeCustomer !== type) return 'opacity-40';
    return '';
  };
  const getPrintHeaderLabel = (type: CustomerType, label: string) => {
    if (!activeCustomer) return label;
    if (activeCustomer === type) return 'Price ($)';
    return label;
  };
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <SparklesIcon className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-bold text-[#0C2340] uppercase tracking-wide">
          Add-On Services & Extras
        </h3>
      </div>

      <div className="w-full overflow-x-auto shadow-sm ring-1 ring-slate-300 sm:rounded-lg">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <thead className="text-white">
            <tr>
              <th className="bg-amber-600 border border-amber-700 px-2 py-2.5 font-semibold w-20">
                Code
              </th>
              <th className="bg-amber-600 border border-amber-700 px-2 py-2.5 font-semibold min-w-[180px]">
                Description
              </th>
              <th className="bg-amber-600 border border-amber-700 px-2 py-2.5 font-semibold text-center w-24">
                Unit
              </th>
              <th
                className={`bg-amber-600 border border-amber-700 px-2 py-2.5 font-semibold text-right w-28 ${getPrintVisibility('Fish Shop')}`}>
                
                <span className="print:hidden">Fish Shop $</span>
                <span className="hidden print:inline">
                  {getPrintHeaderLabel('Fish Shop', 'Fish Shop $')}
                </span>
              </th>
              <th
                className={`bg-amber-600 border border-amber-700 px-2 py-2.5 font-semibold text-right w-28 ${getPrintVisibility('Restaurant')}`}>
                
                <span className="print:hidden">Restaurant $</span>
                <span className="hidden print:inline">
                  {getPrintHeaderLabel('Restaurant', 'Restaurant $')}
                </span>
              </th>
              <th
                className={`bg-amber-600 border border-amber-700 px-2 py-2.5 font-semibold text-right w-28 ${getPrintVisibility('Wholesale')}`}>
                
                <span className="print:hidden">Wholesale $</span>
                <span className="hidden print:inline">
                  {getPrintHeaderLabel('Wholesale', 'Wholesale $')}
                </span>
              </th>
              {isEditing &&
              <th className="bg-amber-600 border border-amber-700 px-2 py-2.5 w-10 print:hidden"></th>
              }
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item, index) =>
            <tr
              key={item.id}
              className={`border-b border-slate-200 group ${index % 2 === 0 ? 'bg-white' : 'bg-amber-50/40'} hover:bg-amber-50 transition-colors`}>
              
                <td className="border-x border-slate-300 px-1 py-1">
                  {isEditing ?
                <input
                  type="text"
                  value={item.code}
                  onChange={(e) =>
                  updateItem(item.id, 'code', e.target.value)
                  }
                  className="w-full bg-transparent outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 text-slate-700 font-medium" /> :


                <span className="px-1 text-slate-700 font-medium">
                      {item.code}
                    </span>
                }
                </td>
                <td className="border-x border-slate-300 px-1 py-1">
                  {isEditing ?
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                  updateItem(item.id, 'description', e.target.value)
                  }
                  className="w-full bg-transparent outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 text-slate-900" /> :


                <span className="px-1 text-slate-900">
                      {item.description}
                    </span>
                }
                </td>
                <td className="border-x border-slate-300 px-1 py-1 text-center">
                  {isEditing ?
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) =>
                  updateItem(item.id, 'unit', e.target.value)
                  }
                  className="w-full bg-transparent outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 text-center text-slate-600" /> :


                <span className="px-1 text-slate-600">{item.unit}</span>
                }
                </td>
                <td
                className={`border-x border-slate-300 px-1 py-1 transition-colors ${getColumnHighlight('Fish Shop')} ${getPrintVisibility('Fish Shop')}`}>
                
                  <div className="flex items-center justify-end">
                    <span className="text-slate-400 mr-1">$</span>
                    {isEditing ?
                  <input
                    type="number"
                    step="0.01"
                    value={item.fishShopPrice}
                    onChange={(e) =>
                    updateItem(
                      item.id,
                      'fishShopPrice',
                      parseFloat(e.target.value) || 0
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 text-right font-medium text-[#0C2340]" /> :


                  <span className="px-1 font-medium text-[#0C2340]">
                        {item.fishShopPrice.toFixed(2)}
                      </span>
                  }
                  </div>
                </td>
                <td
                className={`border-x border-slate-300 px-1 py-1 transition-colors ${getColumnHighlight('Restaurant')} ${getPrintVisibility('Restaurant')}`}>
                
                  <div className="flex items-center justify-end">
                    <span className="text-slate-400 mr-1">$</span>
                    {isEditing ?
                  <input
                    type="number"
                    step="0.01"
                    value={item.restaurantPrice}
                    onChange={(e) =>
                    updateItem(
                      item.id,
                      'restaurantPrice',
                      parseFloat(e.target.value) || 0
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 text-right font-medium text-[#0C2340]" /> :


                  <span className="px-1 font-medium text-[#0C2340]">
                        {item.restaurantPrice.toFixed(2)}
                      </span>
                  }
                  </div>
                </td>
                <td
                className={`border-x border-slate-300 px-1 py-1 transition-colors ${getColumnHighlight('Wholesale')} ${getPrintVisibility('Wholesale')}`}>
                
                  <div className="flex items-center justify-end">
                    <span className="text-slate-400 mr-1">$</span>
                    {isEditing ?
                  <input
                    type="number"
                    step="0.01"
                    value={item.wholesalePrice}
                    onChange={(e) =>
                    updateItem(
                      item.id,
                      'wholesalePrice',
                      parseFloat(e.target.value) || 0
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-amber-400 rounded px-1 text-right font-medium text-[#0C2340]" /> :


                  <span className="px-1 font-medium text-[#0C2340]">
                        {item.wholesalePrice.toFixed(2)}
                      </span>
                  }
                  </div>
                </td>
                {isEditing &&
              <td className="border-x border-slate-300 px-1 py-1 text-center print:hidden">
                    <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete Row">
                  
                      <Trash2Icon className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
              }
              </tr>
            )}

            {isEditing &&
            <tr className="print:hidden">
                <td
                colSpan={7}
                className="border-x border-b border-slate-300 bg-white">
                
                  <button
                  onClick={addItem}
                  className="w-full py-2 text-sm text-amber-700 hover:bg-amber-50 flex items-center justify-center gap-2 transition-colors font-medium">
                  
                    <PlusIcon className="w-4 h-4" /> Add New Add-On
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>);

}