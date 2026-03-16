import React, { useState, createElement } from 'react';
import { PriceListHeader, HeaderData } from '../components/PriceListHeader';
import { PriceListTable, CustomerType } from '../components/PriceListTable';
import { AddOnTable } from '../components/AddOnTable';
import { PriceListFooter, FooterData } from '../components/PriceListFooter';
import {
  initialPriceListData,
  initialAddOnData,
  Product,
  generateId } from
'../data/priceList';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  DownloadIcon,
  PrinterIcon,
  PencilIcon,
  EyeIcon,
  RotateCcwIcon,
  LogOutIcon,
  KeyIcon } from
'lucide-react';
import { ChangePasswordModal } from '../components/ChangePasswordModal';
interface PriceListProps {
  onLogout?: () => void;
  onChangePassword?: (newPassword: string) => void;
}
export function PriceList({ onLogout, onChangePassword }: PriceListProps = {}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [data, setData] = useLocalStorage('pl_products', initialPriceListData);
  const [addOnData, setAddOnData] = useLocalStorage(
    'pl_addons',
    initialAddOnData
  );
  const [activeCustomer, setActiveCustomer] = useState<CustomerType>(null);
  const [showAddOns, setShowAddOns] = useState(false);
  const [headerData, setHeaderData] = useLocalStorage<HeaderData>('pl_header', {
    companyName: 'SAMUDRA SEAFOOD',
    subtitle: 'Premium Fresh Seafood Supplier',
    title: 'Price List - March 2026',
    tagline1: 'PREMIUM',
    tagline2: 'QUALITY',
    logoUrl: null
  });
  const [footerData, setFooterData] = useLocalStorage<FooterData>('pl_footer', {
    phone: '+1 (555) 123-4567',
    email: 'sales@samudraseafood.com',
    address: '88 Harbor Pier, Port City, CA 90210',
    terms: [
    'Prices are subject to change without prior notice.',
    'Prices exclude applicable taxes.',
    'Minimum order for free delivery is 50 KG.',
    'Payment terms: Cash Before Delivery unless otherwise agreed.',
    'Goods sold are non-returnable unless quality defects are reported upon receipt.']

  });
  const handleHeaderChange = (
  field: keyof HeaderData,
  value: string | null) =>
  {
    setHeaderData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleFooterChange = (field: keyof FooterData, value: any) => {
    setFooterData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const updateItem = (
  categoryId: string,
  itemId: string,
  field: keyof Product,
  value: any) =>
  {
    setData((prev) =>
    prev.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map((item) =>
        item.id === itemId ?
        {
          ...item,
          [field]: value
        } :
        item
        )
      };
    })
    );
  };
  const addItem = (categoryId: string) => {
    const newItem: Product = {
      id: generateId(),
      code: 'NEW-001',
      description: 'New Product',
      brand: 'Brand Name',
      gradingSize: 'Size',
      kgSize: '10 KG',
      availability: 'In Stock',
      fishShopPrice: 0,
      restaurantPrice: 0,
      wholesalePrice: 0,
      palletBuyPrice: 0
    };
    setData((prev) =>
    prev.map((cat) =>
    cat.id === categoryId ?
    {
      ...cat,
      items: [...cat.items, newItem]
    } :
    cat
    )
    );
  };
  const removeItem = (categoryId: string, itemId: string) => {
    setData((prev) =>
    prev.map((cat) => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.filter((item) => item.id !== itemId)
      };
    })
    );
  };
  const updateCategoryName = (categoryId: string, newName: string) => {
    setData((prev) =>
    prev.map((cat) =>
    cat.id === categoryId ?
    {
      ...cat,
      name: newName
    } :
    cat
    )
    );
  };
  const addCategory = () => {
    setData((prev) => [
    ...prev,
    {
      id: generateId(),
      name: 'NEW CATEGORY',
      items: [
      {
        id: generateId(),
        code: 'NEW-001',
        description: 'New Product',
        brand: 'Brand Name',
        gradingSize: 'Size',
        kgSize: '10 KG',
        availability: 'In Stock' as const,
        fishShopPrice: 0,
        restaurantPrice: 0,
        wholesalePrice: 0,
        palletBuyPrice: 0
      }]

    }]
    );
  };
  const removeCategory = (categoryId: string) => {
    setData((prev) => prev.filter((cat) => cat.id !== categoryId));
  };
  const resetAll = () => {
    if (window.confirm('Reset all data to default? This cannot be undone.')) {
      setData(initialPriceListData);
      setAddOnData(initialAddOnData);
      setHeaderData({
        companyName: 'SAMUDRA SEAFOOD',
        subtitle: 'Premium Fresh Seafood Supplier',
        title: 'Price List - March 2026',
        tagline1: 'PREMIUM',
        tagline2: 'QUALITY',
        logoUrl: null
      });
      setFooterData({
        phone: '+1 (555) 123-4567',
        email: 'sales@samudraseafood.com',
        address: '88 Harbor Pier, Port City, CA 90210',
        terms: [
        'Prices are subject to change without prior notice.',
        'Prices exclude applicable taxes.',
        'Minimum order for free delivery is 50 KG.',
        'Payment terms: Cash Before Delivery unless otherwise agreed.',
        'Goods sold are non-returnable unless quality defects are reported upon receipt.']

      });
    }
  };
  // Export CSV
  const exportCSV = () => {
    let headers: string[];
    if (activeCustomer) {
      headers = [
      'Category',
      'Code',
      'Product Description',
      'Brand',
      'Grading Size',
      'Kg Size',
      'Availability',
      'Price per KG ($)',
      'Pallet Buy Price ($)'];

    } else {
      headers = [
      'Category',
      'Code',
      'Product Description',
      'Brand',
      'Grading Size',
      'Kg Size',
      'Availability',
      'Fish Shop ($)',
      'Restaurant ($)',
      'Wholesale ($)',
      'Pallet Buy ($)'];

    }
    let csvContent = headers.join(',') + '\n';
    data.forEach((category) => {
      category.items.forEach((item) => {
        const base = [
        `"${category.name}"`,
        `"${item.code}"`,
        `"${item.description}"`,
        `"${item.brand}"`,
        `"${item.gradingSize}"`,
        `"${item.kgSize}"`,
        `"${item.availability}"`];

        if (activeCustomer === 'Fish Shop')
        base.push(String(item.fishShopPrice), String(item.palletBuyPrice));else
        if (activeCustomer === 'Restaurant')
        base.push(String(item.restaurantPrice), String(item.palletBuyPrice));else
        if (activeCustomer === 'Wholesale')
        base.push(String(item.wholesalePrice), String(item.palletBuyPrice));else

        base.push(
          String(item.fishShopPrice),
          String(item.restaurantPrice),
          String(item.wholesalePrice),
          String(item.palletBuyPrice)
        );
        csvContent += base.join(',') + '\n';
      });
    });
    csvContent += '\nADD-ON SERVICES\n';
    if (activeCustomer) {
      csvContent += 'Code,Description,Unit,Price ($)\n';
      addOnData.forEach((item) => {
        const price =
        activeCustomer === 'Fish Shop' ?
        item.fishShopPrice :
        activeCustomer === 'Restaurant' ?
        item.restaurantPrice :
        item.wholesalePrice;
        csvContent += `"${item.code}","${item.description}","${item.unit}",${price}\n`;
      });
    } else {
      csvContent +=
      'Code,Description,Unit,Fish Shop ($),Restaurant ($),Wholesale ($)\n';
      addOnData.forEach((item) => {
        csvContent += `"${item.code}","${item.description}","${item.unit}",${item.fishShopPrice},${item.restaurantPrice},${item.wholesalePrice}\n`;
      });
    }
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute(
      'download',
      activeCustomer ?
      `price_list_${activeCustomer.toLowerCase().replace(' ', '_')}.csv` :
      'price_list_all.csv'
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-[1400px] bg-white p-6 shadow-xl sm:p-10 print:max-w-none print:shadow-none print:p-0">
        {/* App Toolbar */}
        <div className="mb-8 rounded-lg bg-slate-800 p-4 text-white print:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            {/* Edit/View Toggle */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${isEditing ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-md' : 'bg-slate-600 hover:bg-slate-500 text-slate-200'}`}>
              
              {isEditing ?
              <>
                  <PencilIcon className="w-4 h-4" /> Editing Mode
                </> :

              <>
                  <EyeIcon className="w-4 h-4" /> View Mode
                </>
              }
            </button>
            {onChangePassword &&
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Change Password">
              
                <KeyIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Change Password</span>
              </button>
            }
            <div className="hidden lg:block">
              <h2 className="font-bold text-sm leading-tight">
                {isEditing ?
                '✏️ Edit mode — click any field to change' :
                '👁️ View mode — read-only'}
              </h2>
              <p className="text-slate-400 text-xs">
                {isEditing ?
                'All changes auto-save to your browser' :
                'Switch to Edit mode to make changes'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {isEditing &&
            <button
              onClick={resetAll}
              className="flex items-center justify-center gap-2 bg-red-600/80 hover:bg-red-500 text-white px-3 py-2 rounded-md transition-colors text-sm font-medium">
              
                <RotateCcwIcon className="w-3.5 h-3.5" /> Reset
              </button>
            }
            <button
              onClick={exportCSV}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md transition-colors font-medium text-sm">
              
              <DownloadIcon className="w-4 h-4" />
              {activeCustomer ? `CSV ${activeCustomer}` : 'Export CSV'}
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors font-medium text-sm">
              
              <PrinterIcon className="w-4 h-4" />
              {activeCustomer ? `Print ${activeCustomer}` : 'Print All'}
            </button>
            {onLogout &&
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition-colors font-medium text-sm ml-2"
              title="Sign Out">
              
                <LogOutIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            }
          </div>
        </div>

        <PriceListHeader
          data={headerData}
          onChange={handleHeaderChange}
          isEditing={isEditing} />
        

        <div className="my-6">
          <PriceListTable
            data={data}
            activeCustomer={activeCustomer}
            onCustomerChange={setActiveCustomer}
            showAddOns={showAddOns}
            onToggleAddOns={() => setShowAddOns(!showAddOns)}
            updateItem={updateItem}
            addItem={addItem}
            removeItem={removeItem}
            updateCategoryName={updateCategoryName}
            addCategory={addCategory}
            removeCategory={removeCategory}
            isEditing={isEditing} />
          
        </div>

        <div className={`my-6 ${showAddOns ? 'block' : 'hidden print:hidden'}`}>
          <AddOnTable
            data={addOnData}
            activeCustomer={activeCustomer}
            onChange={setAddOnData}
            isEditing={isEditing} />
          
        </div>

        <PriceListFooter
          data={footerData}
          onChange={handleFooterChange}
          isEditing={isEditing} />
        

        <div className="mt-8 text-center text-xs text-slate-400">
          Generated on{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          . Confidential - For intended recipient only.
        </div>
      </div>

      {onChangePassword &&
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        onChangePassword={onChangePassword} />

      }
    </div>);

}