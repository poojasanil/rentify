
'use client'
//   import { useTranslation } from 'react-i18next';
import React from 'react';
import { useAuth } from "@/context/AuthContext";
  
  export default function Header () {

const { user } = useAuth();
    // const { t } = useTranslation()


  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">Rentify</h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          {/* <li><a className="hover:underline">{t("recent")}</a></li>
          <li><a className="hover:underline">{t("top")}</a></li>
            <li> <input id="search">Search</input> </li>
          <li><a className="hover:underline">{t("login")}</a></li> */}
           <li><a className="hover:underline" href='/recent'>Recent</a></li>
          <li><a className="hover:underline" href='/top'>Top</a></li>
            <li> <input type='input' id="search"></input> </li>
          {user ? (
            <>
              <li>Hello {user.name}</li>
              {user.role === "tenant" && (
                <li>
                  <a className="hover:underline" href='/myAppointments'>My Appointments</a>
                </li>
              )}
              {user.role === "owner" && (
                <li>
                  <a className="hover:underline" href='/myProperties'>My Properties</a>   
                  </li>)}
            </>
          ) : (
            <li>
              <a className="hover:underline" href='/login'>Login</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}