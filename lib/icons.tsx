import { 
  FaGlobe, 
  FaShoppingCart, 
  FaBriefcase, 
  FaCog, 
  FaCode, 
  FaMobileAlt, 
  FaRocket, 
  FaChartLine, 
  FaSearch, 
  FaPlug, 
  FaRobot, 
  FaDatabase,
  FaPalette,
  FaServer,
  FaShieldAlt,
  FaSync,
  FaVideo,
  FaLaptopCode,
  FaStore,
  FaUserTie
} from 'react-icons/fa'

export const SERVICE_ICONS: Record<string, any> = {
  FaGlobe,
  FaShoppingCart,
  FaBriefcase,
  FaCog,
  FaCode,
  FaMobileAlt,
  FaRocket,
  FaChartLine,
  FaSearch,
  FaPlug,
  FaRobot,
  FaDatabase,
  FaPalette,
  FaServer,
  FaShieldAlt,
  FaSync,
  FaVideo,
  FaLaptopCode,
  FaStore,
  FaUserTie
}

export const getServiceIcon = (iconName: string, size: number = 24) => {
  const Icon = SERVICE_ICONS[iconName] || FaGlobe
  return <Icon size={size} />
}
