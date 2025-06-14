import React from 'react';

function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
        <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-xs uppercase">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Accessories
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Weight
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">3.0 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-2"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-2" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4">No</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$1999</td>
            <td className="px-6 py-4">1.0 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">No</td>
            <td className="px-6 py-4">$99</td>
            <td className="px-6 py-4">0.2 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Apple Watch
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Watches</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">No</td>
            <td className="px-6 py-4">$199</td>
            <td className="px-6 py-4">0.12 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Apple iMac
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">PC</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">7.0 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Apple AirPods
            </th>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">No</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$399</td>
            <td className="px-6 py-4">38 g</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              iPad Pro
            </th>
            <td className="px-6 py-4">Gold</td>
            <td className="px-6 py-4">Tablet</td>
            <td className="px-6 py-4">No</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$699</td>
            <td className="px-6 py-4">1.3 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Magic Keyboard
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">$99</td>
            <td className="px-6 py-4">453 g</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              Apple TV 4K
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">TV</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">No</td>
            <td className="px-6 py-4">$179</td>
            <td className="px-6 py-4">1.78 lb.</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-3"
                  type="checkbox"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                />
                <label htmlFor="checkbox-table-search-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="text-gray-900 dark:text-white whitespace-nowrap px-6 py-4 font-medium"
            >
              AirTag
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4">Yes</td>
            <td className="px-6 py-4">No</td>
            <td className="px-6 py-4">$29</td>
            <td className="px-6 py-4">53 g</td>
            <td className="flex items-center px-6 py-4">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
              >
                Edit
              </a>
              <a
                href="#"
                className="text-red-600 dark:text-red-500 ms-3 font-medium hover:underline"
              >
                Remove
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
