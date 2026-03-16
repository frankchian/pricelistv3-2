import React, { Fragment } from 'react';
import { Category, Product, Availability } from '../data/priceList';
import {
  PlusIcon,
  Trash2Icon,
  StoreIcon,
  UtensilsIcon,
  TruckIcon,
  FolderPlusIcon,
  XCircleIcon,
  SparklesIcon } from
'lucide-react';
export type CustomerType = 'Fish Shop' | 'Restaurant' | 'Wholesale' | null;
interface PriceListTableProps {
  data: Category[];
  activeCustomer: CustomerType;
  onCustomerChange: (type: CustomerType) => void;
  showAddOns: boolean;
  onToggleAddOns: () => void;
  updateItem: (
  categoryId: string,
  itemId: string,
  field: keyof Product,
  value: any)
  => void;
  addItem: (categoryId: string) => void;
  removeItem: (categoryId: string, itemId: string) => void;
  updateCategoryName: (categoryId: string, newName: string) => void;
  addCategory: () => void;
  removeCategory: (categoryId: string) => void;
  isEditing: boolean;
}
export function PriceListTable({
  data,
  activeCustomer,
  onCustomerChange,
  showAddOns,
  onToggleAddOns,
  updateItem,
  addItem,
  removeItem,
  updateCategoryName,
  addCategory,
  removeCategory,
  isEditing
}: PriceListTableProps) {
  const getPrintVisibility = (type: CustomerType) => {
    if (!activeCustomer) return '';
    if (activeCustomer === type) return '';
    return 'print:hidden';
  };
  const getColumnHighlight = (type: CustomerType) => {
    if (activeCustomer === type) return 'bg-blue-50';
    if (activeCustomer && activeCustomer !== type) return 'opacity-40';
    return '';
  };
  const getHeaderHighlight = (type: CustomerType) => {
    if (activeCustomer === type) return 'bg-blue-600 border-blue-700';
    return 'bg-[#1B6B9C] border-[#15567D]';
  };
  const getPrintHeaderLabel = (type: CustomerType, label: string) => {
    if (!activeCustomer) return label;
    if (activeCustomer === type) return 'Price per KG ($)';
    return label;
  };
  const totalCols = 11;
  return (
    <div className="w-full">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-6 h-6 text-[#1B6B9C]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          
          <path d="M2 16s1-4 5-4 5 4 9 4 5-4 5-4" />
          <path d="M2 12s1-4 5-4 5 4 9 4 5-4 5-4" />
          <path d="M12 6c-1.5 0-3-1-4.5-1S4 6 4 6" />
          <circle cx="18" cy="5" r="1.5" fill="currentColor" />
          <path d="M20 4.5c.5-.5 1.5-.5 2 0" />
        </svg>
        <h3 className="text-lg font-bold text-[#0C2340] uppercase tracking-wide">
          Products
        </h3>
      </div>

      {/* Customer Type Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3 print:hidden">
        <span className="text-sm font-semibold text-slate-600 mr-2">
          Print Price List For:
        </span>
        <button
          onClick={() =>
          onCustomerChange(
            activeCustomer === 'Fish Shop' ? null : 'Fish Shop'
          )
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border ${activeCustomer === 'Fish Shop' ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
          
          <StoreIcon className="w-4 h-4" /> Fish Shop
        </button>
        <button
          onClick={() =>
          onCustomerChange(
            activeCustomer === 'Restaurant' ? null : 'Restaurant'
          )
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border ${activeCustomer === 'Restaurant' ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
          
          <UtensilsIcon className="w-4 h-4" /> Restaurant
        </button>
        <button
          onClick={() =>
          onCustomerChange(
            activeCustomer === 'Wholesale' ? null : 'Wholesale'
          )
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border ${activeCustomer === 'Wholesale' ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
          
          <TruckIcon className="w-4 h-4" /> Wholesale
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1"></div>

        <button
          onClick={onToggleAddOns}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border ${showAddOns ? 'bg-amber-500 text-white border-amber-600 shadow-md' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}>
          
          <SparklesIcon className="w-4 h-4" /> Add-Ons
        </button>

        {activeCustomer &&
        <span className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium">
            ✓ PDF/Print will only show <strong>{activeCustomer}</strong> pricing
          </span>
        }
      </div>

      <div className="w-full overflow-x-auto shadow-sm ring-1 ring-slate-300 sm:rounded-lg">
        <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
          <thead className="text-white">
            <tr>
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-2 py-2.5 font-semibold w-20">
                
                Code
              </th>
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-2 py-2.5 font-semibold min-w-[200px]">
                
                Product Description
              </th>
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-2 py-2.5 font-semibold w-28">
                
                Brand
              </th>
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-2 py-2.5 font-semibold text-center w-24">
                
                Grading Size
              </th>
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-2 py-2.5 font-semibold text-center w-20">
                
                Kg Size
              </th>
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-2 py-2.5 font-semibold text-center w-28">
                
                Availability
              </th>
              <th
                scope="col"
                className={`border px-3 py-2.5 font-semibold text-right w-28 transition-colors whitespace-nowrap ${getHeaderHighlight('Fish Shop')} ${getPrintVisibility('Fish Shop')}`}>
                
                <span className="print:hidden">Fish Shop $</span>
                <span className="hidden print:inline">
                  {getPrintHeaderLabel('Fish Shop', 'Fish Shop $')}
                </span>
              </th>
              <th
                scope="col"
                className={`border px-3 py-2.5 font-semibold text-right w-28 transition-colors whitespace-nowrap ${getHeaderHighlight('Restaurant')} ${getPrintVisibility('Restaurant')}`}>
                
                <span className="print:hidden">Restaurant $</span>
                <span className="hidden print:inline">
                  {getPrintHeaderLabel('Restaurant', 'Restaurant $')}
                </span>
              </th>
              <th
                scope="col"
                className={`border px-3 py-2.5 font-semibold text-right w-28 transition-colors whitespace-nowrap ${getHeaderHighlight('Wholesale')} ${getPrintVisibility('Wholesale')}`}>
                
                <span className="print:hidden">Wholesale $</span>
                <span className="hidden print:inline">
                  {getPrintHeaderLabel('Wholesale', 'Wholesale $')}
                </span>
              </th>
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-3 py-2.5 font-semibold text-right w-28 whitespace-nowrap">
                
                Pallet Buy $
              </th>
              {isEditing &&
              <th
                scope="col"
                className="bg-[#1B6B9C] border border-[#15567D] px-1 py-2.5 w-8 print:hidden">
                
                  <Trash2Icon className="w-3 h-3 mx-auto opacity-40" />
                </th>
              }
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((category) =>
            <Fragment key={category.id}>
                <tr className="bg-[#D9E6F2] group/cat">
                  <td
                  colSpan={isEditing ? totalCols : totalCols - 1}
                  className="border border-slate-300 px-2 py-1">
                  
                    <div className="flex items-center gap-2">
                      {isEditing ?
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) =>
                      updateCategoryName(category.id, e.target.value)
                      }
                      className="font-bold text-[#0C2340] bg-transparent flex-1 outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
                      placeholder="Category Name" /> :


                    <span className="font-bold text-[#0C2340] px-1 py-0.5">
                          {category.name}
                        </span>
                    }
                      {isEditing &&
                    <button
                      onClick={() => removeCategory(category.id)}
                      className="shrink-0 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover/cat:opacity-100 focus:opacity-100 print:hidden"
                      title={`Delete category "${category.name}"`}>
                      
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                    }
                    </div>
                  </td>
                </tr>

                {category.items.map((item, itemIndex) =>
              <tr
                key={item.id}
                className={`border-b border-slate-200 group ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-colors`}>
                
                    <td className="border-x border-slate-300 px-1 py-1">
                      {isEditing ?
                  <input
                    type="text"
                    value={item.code}
                    onChange={(e) =>
                    updateItem(
                      category.id,
                      item.id,
                      'code',
                      e.target.value
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-slate-700 font-medium" /> :


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
                    updateItem(
                      category.id,
                      item.id,
                      'description',
                      e.target.value
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-slate-900" /> :


                  <span className="px-1 text-slate-900">
                          {item.description}
                        </span>
                  }
                    </td>
                    <td className="border-x border-slate-300 px-1 py-1">
                      {isEditing ?
                  <input
                    type="text"
                    value={item.brand}
                    onChange={(e) =>
                    updateItem(
                      category.id,
                      item.id,
                      'brand',
                      e.target.value
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-slate-600" /> :


                  <span className="px-1 text-slate-600">
                          {item.brand}
                        </span>
                  }
                    </td>
                    <td className="border-x border-slate-300 px-1 py-1 text-center">
                      {isEditing ?
                  <input
                    type="text"
                    value={item.gradingSize}
                    onChange={(e) =>
                    updateItem(
                      category.id,
                      item.id,
                      'gradingSize',
                      e.target.value
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-center text-slate-700" /> :


                  <span className="px-1 text-slate-700">
                          {item.gradingSize}
                        </span>
                  }
                    </td>
                    <td className="border-x border-slate-300 px-1 py-1 text-center">
                      {isEditing ?
                  <input
                    type="text"
                    value={item.kgSize}
                    onChange={(e) =>
                    updateItem(
                      category.id,
                      item.id,
                      'kgSize',
                      e.target.value
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-center text-slate-600" /> :


                  <span className="px-1 text-slate-600">
                          {item.kgSize}
                        </span>
                  }
                    </td>
                    <td className="border-x border-slate-300 px-1 py-1 text-center">
                      {isEditing ?
                  <select
                    value={item.availability}
                    onChange={(e) =>
                    updateItem(
                      category.id,
                      item.id,
                      'availability',
                      e.target.value as Availability
                    )
                    }
                    className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-center text-slate-700 appearance-none cursor-pointer">
                    
                          <option value="In Stock">In Stock</option>
                          <option value="Limited">Limited</option>
                          <option value="Pre-Order">Pre-Order</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select> :

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.availability === 'In Stock' ? 'bg-green-100 text-green-800' : item.availability === 'Limited' ? 'bg-yellow-100 text-yellow-800' : item.availability === 'Out of Stock' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    
                          {item.availability}
                        </span>
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
                        category.id,
                        item.id,
                        'fishShopPrice',
                        parseFloat(e.target.value) || 0
                      )
                      }
                      className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-right font-medium text-[#0C2340]" /> :


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
                        category.id,
                        item.id,
                        'restaurantPrice',
                        parseFloat(e.target.value) || 0
                      )
                      }
                      className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-right font-medium text-[#0C2340]" /> :


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
                        category.id,
                        item.id,
                        'wholesalePrice',
                        parseFloat(e.target.value) || 0
                      )
                      }
                      className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-right font-medium text-[#0C2340]" /> :


                    <span className="px-1 font-medium text-[#0C2340]">
                            {item.wholesalePrice.toFixed(2)}
                          </span>
                    }
                      </div>
                    </td>
                    <td className="border-x border-slate-300 px-1 py-1">
                      <div className="flex items-center justify-end">
                        <span className="text-slate-400 mr-1">$</span>
                        {isEditing ?
                    <input
                      type="number"
                      step="0.01"
                      value={item.palletBuyPrice}
                      onChange={(e) =>
                      updateItem(
                        category.id,
                        item.id,
                        'palletBuyPrice',
                        parseFloat(e.target.value) || 0
                      )
                      }
                      className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-400 rounded px-1 text-right font-medium text-[#0C2340]" /> :


                    <span className="px-1 font-medium text-[#0C2340]">
                            {item.palletBuyPrice.toFixed(2)}
                          </span>
                    }
                      </div>
                    </td>

                    {isEditing &&
                <td className="border-x border-slate-300 px-1 py-1 text-center print:hidden">
                        <button
                    onClick={() => removeItem(category.id, item.id)}
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
                  colSpan={totalCols}
                  className="border-x border-b border-slate-300 bg-white">
                  
                      <button
                    onClick={() => addItem(category.id)}
                    className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors font-medium">
                    
                        <PlusIcon className="w-4 h-4" /> Add Item to{' '}
                        {category.name}
                      </button>
                    </td>
                  </tr>
              }
              </Fragment>
            )}
          </tbody>
        </table>
      </div>

      {isEditing &&
      <button
        onClick={addCategory}
        className="mt-4 w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center gap-2 transition-colors font-medium print:hidden">
        
          <FolderPlusIcon className="w-5 h-5" /> Add New Category (e.g. Lobster,
          Octopus, Salmon...)
        </button>
      }
    </div>);

}