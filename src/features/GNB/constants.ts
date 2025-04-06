export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href: string;
  subItems?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'session',
    label: '세션',
    icon: '/icons/monitor.svg',
    href: '/session'
  },
  {
    id: 'communication',
    label: '커뮤니케이션',
    icon: '/icons/globe.svg',
    href: '/communication',
    subItems: [
      {
        id: 'all',
        label: '전체 요약 보기',
        href: '/communication/all'
      },
      {
        id: 'tech',
        label: '기술 이야기',
        href: '/communication/tech'
      },
      {
        id: 'question',
        label: '질문',
        href: '/communication/question'
      },
      {
        id: 'chat',
        label: '잡담',
        href: '/communication/chat'
      },
      {
        id: 'mentoring',
        label: '멘토링 후기',
        href: '/communication/mentoring'
      },
      {
        id: 'study',
        label: '스터디 모집',
        href: '/communication/study'
      }
    ]
  },
  {
    id: 'challenge',
    label: '도전 현황',
    icon: '/icons/rabbit.svg',
    href: '/challenge'
  },
  {
    id: 'my-status',
    label: '내 현황 보기',
    icon: '/icons/user.svg',
    href: '/my-status'
  }
]; 