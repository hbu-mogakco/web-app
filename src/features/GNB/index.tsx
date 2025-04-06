'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU_ITEMS, type MenuItem } from './constants';

export default function GNB() {
  const pathname = usePathname();
  const [expandedMenuId, setExpandedMenuId] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href;
  const isSubActive = (href: string) => pathname.startsWith(href);

  const handleMenuClick = (menuId: string) => {
    setExpandedMenuId(expandedMenuId === menuId ? null : menuId);
  };

  return (
    <nav className="flex flex-col gap-2 p-4 bg-[#28283B] border-r border-[#3F3F6F]/50 max-w-[270px]">
      {/* 로고 */}
      <div className="flex items-center gap-2 mb-4">
        <Image src="/logo.png" alt="Waddle Up" width={32} height={32} />
        <span className="text-lg font-bold text-white">Waddle Up</span>
      </div>

      {/* 메뉴 아이템 */}
      <div className="flex flex-col gap-2">
        {MENU_ITEMS.map((item) => (
          <div key={item.id} className="flex flex-col">
            <Link
              href={item.href}
              className={`flex items-center gap-2 p-3 rounded-md transition-colors ${
                isActive(item.href) || isSubActive(item.href)
                  ? 'bg-gradient-to-r from-[#2A263F] to-[#6F64A5]'
                  : 'hover:bg-white/5'
              }`}
              onClick={item.subItems ? () => handleMenuClick(item.id) : undefined}
            >
              {item.icon && (
                <Image src={item.icon} alt="" width={20} height={20} className="text-white" />
              )}
              <span className="text-[#EBEBEB]">{item.label}</span>
              {item.subItems && (
                <Image
                  src="/icons/chevron-down.svg"
                  alt=""
                  width={16}
                  height={16}
                  className={`ml-auto transition-transform ${
                    expandedMenuId === item.id ? 'rotate-180' : ''
                  }`}
                />
              )}
            </Link>

            {/* 서브메뉴 */}
            {item.subItems && expandedMenuId === item.id && (
              <div className="flex flex-col ml-8 mt-2 gap-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={subItem.href}
                    className={`p-2 rounded-md text-sm transition-colors ${
                      isActive(subItem.href)
                        ? 'bg-[#2C2C4E] text-white'
                        : 'text-[#C6C6C6] hover:text-white'
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 사용자 프로필 */}
      <div className="mt-auto p-4 bg-[#28283B] border border-gradient rounded-md">
        <div className="w-8 h-8 rounded-full bg-[#1A1A2E] mb-2" />
        <div className="text-white font-bold">deveungi</div>
        <div className="text-xs text-[#ABABAB]">로그인 시간: 2025-04-01</div>
      </div>
    </nav>
  );
}
