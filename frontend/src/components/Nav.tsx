import { useAuth } from "../hooks/useAuth";
import { Navigate, Link } from "react-router";
import { House, ReceiptText, Settings } from "lucide-react";

export default function Nav() {
  const { user } = useAuth();
  if(!user) {
    return <Navigate to="/login" replace />;
  }
  
  const currentPath = window.location.pathname;
  const navigation = [
    { name: 'Home', href: '/dashboard/', icon: House, current: currentPath === '/dashboard/' },
    { name: 'Orders', href: '/dashboard/orders', icon: ReceiptText, current: currentPath === '/dashboard/orders' },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: currentPath === '/dashboard/settings' },
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="w-72 h-dvh bg-white border-r border-gray-200 flex flex-col p-4">
      <h2 className="text-lg font-normal py-2 px-4 border border-gray-200 rounded-xl truncated">{user.vendor_name}</h2>
      <nav className="mt-8 flex flex-col gap-0 border-t border-gray-200 pt-8">
        {navigation.map((item) => (
          <Link 
            key={item.name}
            to={item.href}
            className={classNames(
              item.current ? "bg-gray-200 border-gray-200" : "border-white hover:border-gray-100 hover:bg-gray-100",
              `text-md font-normal text-gray-700 flex flex-row gap-4 border 
              rounded-xl py-4 px-4 transition-colors duration-300`
            )}
          >
            {<item.icon />} {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}