// 권한 타입
export type UserRole = 'admin' | 'user';

// 메뉴 아이템 (최하위 - 실제 클릭 가능한 항목)
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  roles?: UserRole[];  // 접근 가능한 권한 (없으면 모두 접근 가능)
}

// 카테고리 (중간 그룹)
export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
  roles?: UserRole[];  // 접근 가능한 권한 (없으면 모두 접근 가능)
}

// 메인 메뉴 (탑 네비게이션)
export interface MainMenu {
  id: string;
  label: string;
  path?: string;  // 하위 메뉴 없이 바로 이동하는 경우
  categories?: MenuCategory[];
  roles?: UserRole[];  // 접근 가능한 권한 (없으면 모두 접근 가능)
}
