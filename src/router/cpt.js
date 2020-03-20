import loader from '@/utils/loader'   // 路由懒加载
const UseHook = loader(() => import('@/pages/hook-302'))
const Basic = loader(() => import('@/pages/layout/basic'))
const Home = loader(() => import('@/pages/home')) 
const Life = loader(() => import('@/pages/life'))
const Thunk = loader(() => import('@/pages/thunk'))
export default {
  UseHook,
  Basic,
  Home,
  Life,
  Thunk,
  
}