// components/filters/FilterSidebar.tsx
"use client";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// এই কম্পোনেন্টটি শুধুমাত্র UI দেখাবে। সব লজিক এবং ডেটা props হিসেবে আসবে।
const FilterSidebar = () => {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 space-y-6">
      {/* Price Filter */}
      <div className="p-4 border rounded-md">
        <h3 className="font-semibold mb-4">PRICE</h3>
        <Slider
          range
          min={0}
          max={100000}
          defaultValue={[250, 97400]}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm">
          <input type="number" value="250" readOnly className="w-20 border p-1 rounded-md" />
          <input type="number" value="97400" readOnly className="w-20 border p-1 rounded-md" />
        </div>
      </div>

      {/* Gender Filter */}
      <div className="p-4 border rounded-md">
        <h3 className="font-semibold mb-2">GENDER</h3>
        <div className="space-y-1 text-sm">
          <div><input type="checkbox" id="men" /><label htmlFor="men" className="ml-2">MEN</label></div>
          <div><input type="checkbox" id="unisex" /><label htmlFor="unisex" className="ml-2">UNISEX</label></div>
          <div><input type="checkbox" id="women" /><label htmlFor="women" className="ml-2">WOMEN</label></div>
        </div>
      </div>

      {/* Brands Filter */}
      <div className="p-4 border rounded-md">
        <h3 className="font-semibold mb-2">BRANDS</h3>
        <div className="space-y-1 text-sm h-48 overflow-y-auto">
          {/* Example Brands - This will be dynamic */}
          <div><input type="checkbox" id="clarins" /><label htmlFor="clarins" className="ml-2">CLARINS</label></div>
          <div><input type="checkbox" id="clinique" /><label htmlFor="clinique" className="ml-2">CLINIQUE</label></div>
          <div><input type="checkbox" id="dr-barbara" /><label htmlFor="dr-barbara" className="ml-2">DR. BARBARA STURM</label></div>
          <div><input type="checkbox" id="jo-malone" /><label htmlFor="jo-malone" className="ml-2">JO MALONE</label></div>
        </div>
      </div>
      
      {/* Skincare Category Filter */}
      <div className="p-4 border rounded-md">
        <h3 className="font-semibold mb-2">SKINCARE CATEGORY</h3>
        <div className="space-y-1 text-sm h-48 overflow-y-auto">
           {/* Example Categories - This will be dynamic */}
          <div><input type="checkbox" id="accessory" /><label htmlFor="accessory" className="ml-2">ACCESSORY</label></div>
          <div><input type="checkbox" id="cleansing-oil" /><label htmlFor="cleansing-oil" className="ml-2">CLEANSING OIL</label></div>
        </div>
      </div>
    </aside>
  );
};
export default FilterSidebar;