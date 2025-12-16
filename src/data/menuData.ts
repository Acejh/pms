import type { MainMenu } from '../types/menu';

export const menuData: MainMenu[] = [
  {
    id: 'basic-data',
    label: '기초데이터',
    categories: [
      {
        id: 'measurement',
        label: '계량정보',
        items: [
          { id: 'log', label: '수신로그', path: '/basic-data/measurement/log', roles: ['admin'] },
          { id: 'pending', label: '확정대기', path: '/basic-data/measurement/pending' },
          { id: 'confirmed', label: '확정완료', path: '/basic-data/measurement/confirmed' },
          { id: 'general', label: '일반계량', path: '/basic-data/measurement/general' },
        ]
      },
      {
        id: 'ecoas',
        label: 'EcoAS관리표',
        items: [
          { id: 'collection', label: '수집/운반관리표', path: '/basic-data/ecoas/collection' },
          { id: 'supply', label: '공급/폐기관리표', path: '/basic-data/ecoas/supply' },
        ]
      },
      {
        id: 'tax-invoice',
        label: '세금계산서',
        items: [
          { id: 'purchase', label: '매입 세금계산서 관리', path: '/basic-data/tax-invoice/purchase' },
          { id: 'sales', label: '매출 세금계산서 관리', path: '/basic-data/tax-invoice/sales' },
        ]
      }
    ]
  },
  {
    id: 'matching',
    label: '매칭',
    categories: [
      {
        id: 'measurement-matching',
        label: '계량 매칭',
        items: [
          { id: 'collection', label: '수집/운반', path: '/matching/measurement/collection' },
          { id: 'supply', label: '공급/폐기', path: '/matching/measurement/supply' },
        ]
      },
      {
        id: 'tax-matching',
        label: '세금계산서 매칭',
        items: [
          { id: 'incoming', label: '입고 세금계산서', path: '/matching/tax/incoming' },
          { id: 'outgoing', label: '출고 세금계산서', path: '/matching/tax/outgoing' },
        ]
      }
    ]
  },
  {
    id: 'performance',
    label: '실적정보',
    categories: [
      {
        id: 'performance-items',
        label: '',
        items: [
          { id: 'collection', label: '수집/운반', path: '/performance/collection' },
          { id: 'supply', label: '공급/폐기', path: '/performance/supply' },
        ]
      }
    ]
  },
  {
    id: 'subsidy',
    label: '지원금정산',
    categories: [
      {
        id: 'standard',
        label: '기준정보관리',
        roles: ['admin'],
        items: [
          { id: 'mixture', label: '혼입비 관리', path: '/subsidy/standard/mixture' },
          { id: 'unit-price', label: '지원금 단가 관리', path: '/subsidy/standard/unit-price' },
          { id: 'partner', label: '거래처 관리', path: '/subsidy/standard/partner' },
          { id: 'material', label: '소재구성비 관리', path: '/subsidy/standard/material' },
          { id: 'payment-rate', label: '지급율 관리', path: '/subsidy/standard/payment-rate' },
        ]
      },
      {
        id: 'closing',
        label: '실적마감관리',
        items: [
          { id: 'incoming-target', label: '입고[대상품목]', path: '/subsidy/closing/incoming-target' },
          { id: 'incoming-non-target', label: '입고[비대상품목]', path: '/subsidy/closing/incoming-non-target' },
          { id: 'outgoing-supply', label: '출고[공급]', path: '/subsidy/closing/outgoing-supply' },
          { id: 'outgoing-disposal', label: '출고[폐기]', path: '/subsidy/closing/outgoing-disposal' },
          { id: 'closing-status', label: '실적마감 현황', path: '/subsidy/closing/status', roles: ['admin'] },
        ]
      },
      {
        id: 'calculation',
        label: '실적산출관리',
        items: [
          { id: 'recycling', label: '재활용실적', path: '/subsidy/calculation/recycling' },
          { id: 'recovery', label: '회수실적', path: '/subsidy/calculation/recovery' },
          { id: 'subsidy-category', label: '지원금대상구분', path: '/subsidy/calculation/category' },
          { id: 'subsidy-performance', label: '지원금대상실적', path: '/subsidy/calculation/performance' },
          { id: 'submit-status', label: '실적제출 현황', path: '/subsidy/calculation/submit-status', roles: ['admin'] },
        ]
      },
      {
        id: 'cost',
        label: '비용관리',
        items: [
          { id: 'cost-calculation', label: '비용산출내역', path: '/subsidy/cost/calculation' },
          { id: 'cost-settlement', label: '비용정산내역', path: '/subsidy/cost/settlement' },
          { id: 'cost-payment', label: '비용지급내역', path: '/subsidy/cost/payment' },
        ]
      }
    ]
  },
  {
    id: 'basic-info',
    label: '기본정보',
    categories: [
      {
        id: 'measurement-item',
        label: '계량품목 관리',
        roles: ['admin'],
        items: [
          { id: 'incoming-item', label: '입고 품목', path: '/basic-info/measurement-item/incoming' },
          { id: 'outgoing-item', label: '출고 품목', path: '/basic-info/measurement-item/outgoing' },
        ]
      },
      {
        id: 'basic-info-items',
        label: '',
        items: [
          { id: 'ecoas-item', label: 'EcoAS품목 관리', path: '/basic-info/ecoas-item', roles: ['admin'] },
          { id: 'partner', label: '거래처', path: '/basic-info/partner' },
          { id: 'vehicle', label: '인허가차량', path: '/basic-info/vehicle' },
          { id: 'reduction', label: '감량사유', path: '/basic-info/reduction', roles: ['admin'] },
        ]
      },
      {
        id: 'document',
        label: '등록서류',
        roles: ['admin'],
        items: [
          { id: 'classification', label: '분류관리', path: '/basic-info/document/classification' },
          { id: 'member-document', label: '사업회원 등록서류', path: '/basic-info/document/member' },
        ]
      }
    ]
  },
  {
    id: 'esh',
    label: 'ESH',
    categories: [
      {
        id: 'esh-item-management',
        label: 'ESH항목 관리',
        roles: ['admin'],
        items: [
          { id: 'general-item', label: '일반현황 항목관리', path: '/esh/item/general' },
          { id: 'esh-info', label: 'ESH정보 관리', path: '/esh/item/info' },
          { id: 'check-item', label: '점검항목 관리', path: '/esh/item/check' },
          { id: 'support-period', label: '지원기간 관리', path: '/esh/item/support-period' },
        ]
      },
      {
        id: 'business-status',
        label: '사업장현황',
        items: [
          { id: 'general-status', label: '일반현황', path: '/esh/business/general' },
          { id: 'facility-status', label: '시설장비현황', path: '/esh/business/facility' },
          { id: 'waste-target', label: '영업대상폐기물', path: '/esh/business/waste' },
        ]
      },
      {
        id: 'esh-items',
        label: '',
        items: [
          { id: 'monthly', label: '월간점검', path: '/esh/monthly' },
          { id: 'semi-annual', label: '반기점검', path: '/esh/semi-annual' },
          { id: 'indicator', label: 'ESH 관리 지표', path: '/esh/indicator' },
          { id: 'consulting', label: 'ESH 현장 컨설팅', path: '/esh/consulting' },
          { id: 'regular', label: '정기점검', path: '/esh/regular' },
        ]
      }
    ]
  },
  { id: 'notice', label: '공지사항', path: '/notice' },
];
