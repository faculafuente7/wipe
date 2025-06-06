"use client";

import Link from 'next/link';
import React, { useState } from 'react';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  return (
    <nav style={{ width: '100%', background: '#000', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2rem', height: '4rem' }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src="/quickmenulogo.png" alt="Logo" style={{ height: 'auto', width: '150px', fontSize: '24px' }} />
        </a>
        {/* Desktop Menu */}
        <div className="menu" style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <a href="#soluciones" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Soluciones</a>
          <a href="#precios" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Precios</a>
          <a href="#contacto" style={{ color: '#fff', fontWeight: 500, fontSize: '1.08rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#e0e0e0'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Contacto</a>
          <a href="/comienza-ya" style={{ marginLeft: '1.5rem', padding: '0.7rem 1.7rem', borderRadius: '999px', background: '#00e676', color: '#000', fontWeight: 700, fontSize: '1.08rem', textDecoration: 'none', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)', transition: 'background 0.2s, color 0.2s, transform 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#00c853'; e.currentTarget.style.color = '#fff'; }} onMouseOut={e => { e.currentTarget.style.background = '#00e676'; e.currentTarget.style.color = '#000'; }}>Empieza ahora</a>
        </div>
        {/* Hamburger Icon for Mobile */}
        <button className="hamburger" style={{ display: isMobile ? 'flex' : 'none', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', alignItems: 'center', justifyContent: 'center' }} onClick={() => setDrawerOpen(true)} aria-label="Abrir menú">
          <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>&#9776;</span>
        </button>
      </div>
      {/* Sidebar Drawer */}
      {drawerOpen && (
        <>
          <div className="sidebarOverlay" onClick={() => setDrawerOpen(false)}></div>
          <aside className="sidebar">
            <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '2rem', alignSelf: 'flex-end', marginBottom: '2rem' }} onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú">&times;</button>
            <a href="#soluciones" className="sidebarLink" onClick={() => setDrawerOpen(false)}>Soluciones</a>
            <a href="#precios" className="sidebarLink" onClick={() => setDrawerOpen(false)}>Precios</a>
            <a href="#contacto" className="sidebarLink" onClick={() => setDrawerOpen(false)}>Contacto</a>
            <a href="/comienza-ya" className="sidebarCta" onClick={() => setDrawerOpen(false)}>Empieza ahora</a>
          </aside>
        </>
      )}
    </nav>
  );
};

export default NavBar;