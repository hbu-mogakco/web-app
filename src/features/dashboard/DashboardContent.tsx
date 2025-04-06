'use client';

import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Lock, MessageCircle, Share2, Trophy, User } from 'lucide-react';

const navigationItems = [
  { icon: MessageCircle, label: '생각 공유', href: '#' },
  { icon: User, label: '프로필보기', href: '#' },
  { icon: Share2, label: '코드 공유', href: '#' },
  { icon: Trophy, label: '도전 현황', href: '#' },
];

export default function DashboardContent() {
  return (
    <div className="flex flex-1">
      {/* Left Navigation */}
      <nav className="w-64 border-r bg-card p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="white"
              className="w-full justify-start gap-2"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <h2 className="text-xl font-semibold">알고리즘 스터디</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">남은 시간: 1:30:00</span>
            <Button variant="white">이용 규칙</Button>
            <Button variant="white">가이드</Button>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4">
                <Image
                  src={`/images/avatar${i}.png`}
                  alt={`참가자 ${i}`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">참가자 {i}</p>
                  <div className="flex gap-2">
                    <span className="text-xs text-green-500">마이크 ON</span>
                    <span className="text-xs text-green-500">비디오 ON</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Chat Area */}
        <Card className="flex-1">
          <div className="h-[calc(100vh-400px)] overflow-y-auto p-4">
            {/* Chat messages will go here */}
          </div>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="white" size="sm">B</Button>
              <Button variant="white" size="sm">I</Button>
              <Button variant="white" size="sm">U</Button>
            </div>
            <textarea
              className="mt-2 w-full resize-none rounded-lg border p-2"
              rows={3}
              placeholder="메시지를 입력하세요..."
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 