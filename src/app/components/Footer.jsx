// import { useTranslation } from 'react-i18next';
import React from 'react';


export default function Footer(){
    // const { t } = useTranslation();
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} copyright @Rentify. All rights reserved.</p>
      </div>
    </footer>
  );
}