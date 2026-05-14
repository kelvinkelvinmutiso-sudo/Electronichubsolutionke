import { useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bolt, 
  Phone, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Plus, 
  Star, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock,
  Menu,
  X,
  ChevronRight,
  Tv,
  Refrigerator,
  WashingMachine,
  Waves,
  Zap,
  Flame,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Wallet,
  Package
} from 'lucide-react';

// --- Types ---
type Category = 'all' | 'tv' | 'fridge' | 'washing' | 'microwave' | 'cooker' | 'lighting' | 'furniture' | 'kitchen' | 'household';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: Category;
  tag?: 'HOT' | 'NEW' | 'DEAL';
  rating: number;
  image: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Synix SoundSpeaker SYN-S60',
    brand: 'Synix',
    price: 12500,
    originalPrice: 15000,
    category: 'tv',
    tag: 'HOT',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1AZ1SCmPGpV0mpYtMRtOM948U5XYmgMzj'
  },
  {
    id: 2,
    name: 'AILYONS FS-1801 Standing Fan',
    brand: 'AILYONS',
    price: 3500,
    originalPrice: 4500,
    category: 'household',
    tag: 'NEW',
    rating: 4,
    image: 'https://lh3.googleusercontent.com/d/1ry1L2kbBBmG2NSxeXRksROQoeEkQ4TkB'
  },
  {
    id: 3,
    name: 'LG 260L Double Door Fridge GN-B262SQCB',
    brand: 'LG',
    price: 42000,
    originalPrice: 50000,
    category: 'fridge',
    tag: 'DEAL',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1u3PYybXdTyDplUOE6GTvZAqS2lvDrq5k'
  },
  {
    id: 4,
    name: 'SAYONA PPS Subwoofer System',
    brand: 'Sayona',
    price: 8500,
    originalPrice: 10500,
    category: 'household',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1W0-OdkBVbjZggBu7KzQrLNraY3w0OUqe'
  },
  {
    id: 5,
    name: 'AILIPU KL-630s Subwoofer System',
    brand: 'Ailipu',
    price: 8500,
    originalPrice: 10500,
    category: 'household',
    tag: 'NEW',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1IxAW5yuuRlnkfCgIpbHmm9Fh_DzOMwap'
  },
  {
    id: 6,
    name: 'Elegant 6-Seater Dining Table',
    brand: 'OakWood',
    price: 45000,
    originalPrice: 55000,
    category: 'furniture',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1AIJ11wsX9d0nL74lAzg1X0rfJoKICedl'
  },
  {
    id: 7,
    name: 'Ramtons 20L Microwave Oven RM/321',
    brand: 'Ramtons',
    price: 6500,
    originalPrice: 8500,
    category: 'microwave',
    tag: 'HOT',
    rating: 5,
    image: '/src/assets/images/regenerated_image_1778679100165.jpg'
  },
  {
    id: 8,
    name: 'Bruhm 4-Burner Gas Cooker with Oven BGC-044SS',
    brand: 'Bruhm',
    price: 18500,
    originalPrice: 22000,
    category: 'cooker',
    rating: 4,
    image: '/src/assets/images/regenerated_image_1778679097327.jpg'
  },
  {
    id: 9,
    name: 'StarWorth Air Cooler ZYY-SLF01',
    brand: 'StarWorth',
    price: 12500,
    originalPrice: 15500,
    category: 'household',
    tag: 'DEAL',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1hxunv7m51JX8yxuzaN_436dlWPpSc5ge'
  },
  {
    id: 10,
    name: 'AILYONS Subwoofer System',
    brand: 'Ailyons',
    price: 8500,
    originalPrice: 10500,
    category: 'household',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1LgL_OtTMaCIMyyeXjNR2q2t2C6y3mhxO'
  },
  {
    id: 11,
    name: 'Roch Refrigerator RFR-180DT-B',
    brand: 'Roch',
    price: 32500,
    originalPrice: 38000,
    category: 'fridge',
    tag: 'NEW',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1HoT9TYdEu0pWlmY5g-fu7A0fpm7no7nr'
  },
  {
    id: 12,
    name: 'Luxury 3-Seater Velvet Sofa',
    brand: 'Palatial',
    price: 45000,
    originalPrice: 55000,
    category: 'furniture',
    tag: 'HOT',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1LX6L3ZQHHgFl_5e0Pj65yZ09EPIlkEFh'
  },
  {
    id: 13,
    name: 'Solid Wood Dining Table',
    brand: 'Royal Home',
    price: 14500,
    originalPrice: 18000,
    category: 'furniture',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1xSr7OQImUtGlkZtrpMIy7EVYwWQFbXI9'
  },
  {
    id: 14,
    name: 'Modern Coffee Table',
    brand: 'OakWood',
    price: 12500,
    originalPrice: 15500,
    category: 'furniture',
    tag: 'NEW',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/182E6cvVlFFey9f-WqojrHVWw27gGlXbX'
  },
  {
    id: 15,
    name: 'Stylish Accent Chair',
    brand: 'OakWood',
    price: 14500,
    originalPrice: 18000,
    category: 'furniture',
    tag: 'HOT',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1vYy632srp3xyCb8RRBqzJ3Ur3X6MX9Ms'
  },
  {
    id: 16,
    name: 'High-Speed HDMI Cable (2m)',
    brand: 'Generic',
    price: 1500,
    originalPrice: 2500,
    category: 'household',
    tag: 'DEAL',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/19cTTaGh0yGWAMS3CbW3TzMTxIvgs1FnP'
  },
  {
    id: 17,
    name: 'ZARYT WATER DESPENSER Z-D753',
    brand: 'Zaryt',
    price: 18500,
    originalPrice: 22000,
    category: 'household',
    tag: 'HOT',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1DpGReN6iHOi4KlPQPX7Mxd0Lx0IWVcXK'
  },
  {
    id: 18,
    name: 'Roch 20L Microwave Oven',
    brand: 'Roch',
    price: 6800,
    originalPrice: 8500,
    category: 'microwave',
    rating: 5,
    image: 'https://lh3.googleusercontent.com/d/1-Wnxa84n-rTVvc9NBB3f78Ys1pgSqq5O'
  }
];

const WHATSAPP_NUMBER = '254758731970';

// --- Base Components ---
const SectionHead = ({ tag, title, desc, center = false }: { tag: string; title: ReactNode; desc?: string; center?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-14 ${center ? 'text-center' : ''}`}
  >
    <span className="text-blue-primary font-bold text-[0.75rem] uppercase tracking-[2px] block mb-2">{tag}</span>
    <h2 className="text-ink font-extrabold text-[clamp(1.9rem,3.5vw,2.6rem)] leading-[1.3] tracking-[-0.8px] mb-6">{title}</h2>
    {desc && <p className="text-ink-light text-base leading-relaxed max-w-[600px] mx-auto">{desc}</p>}
  </motion.div>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Category>('all');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const orderItem = (name: string) => {
    const msg = encodeURIComponent(`Hello ElectronicsHubSolutionKE, I would like to order: ${name}. Please share price and delivery details.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const filteredProducts = PRODUCTS.filter(p => filter === 'all' || p.category === filter);

  const filterAndScroll = useCallback((cat: Category) => {
    setFilter(cat);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* --- Nav --- */}
      <nav 
        id="nav" 
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
          isScrolled ? 'bg-white/97 backdrop-blur-md shadow-[0_1px_0_var(--color-border)] h-[68px]' : 'h-[80px]'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-[10px]">
            <div className="w-[38px] h-[38px] bg-blue-primary rounded-[10px] grid place-items-center flex-shrink-0">
              <Bolt className="text-white w-5 h-5 fill-white stroke-2" />
            </div>
            <div>
              <div className="syne font-extrabold text-[1.05rem] text-ink tracking-[-0.5px] leading-[1.1]">
                Electronics<span className="text-blue-primary">Hub</span>
              </div>
              <div className="text-[0.65rem] text-muted font-normal tracking-[0.8px] uppercase">SolutionKE</div>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {['Products', 'Categories', 'Delivery', 'About', 'Contact'].map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-[0.9rem] font-medium text-ink-light hover:text-blue-primary transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="hidden md:inline-flex items-center gap-2 font-semibold text-[0.88rem] px-[1.3rem] py-[0.55rem] rounded-[9px] border-[1.5px] border-border text-ink-light hover:border-ink hover:text-ink transition-all">
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <a href="#products" className="hidden sm:inline-flex items-center gap-2 font-semibold text-[0.88rem] px-[1.3rem] py-[0.55rem] rounded-[9px] bg-blue-primary text-white hover:bg-blue-light transition-all shadow-[0_4px_14px_rgba(30,58,138,0.2)]">
               Shop Now
            </a>
            <button className="lg:hidden p-1.5 text-ink" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[68px] left-0 right-0 bottom-0 bg-white z-[998] p-8 flex flex-col gap-2 overflow-y-auto lg:hidden"
          >
            {['Products', 'Categories', 'Delivery', 'About', 'Contact'].map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="text-[1.1rem] font-bold text-ink py-4 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a 
              href="#products" 
              className="mt-4 bg-blue-primary text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop Now <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero --- */}
      <section id="home" className="min-h-screen pt-[68px] bg-[#0E1117] relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
        <div className="hero-orb orb1 absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full bg-[radial-gradient(circle,rgba(30,58,138,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="hero-orb orb2 absolute w-[400px] h-[400px] -bottom-[100px] -left-[100px] rounded-full bg-[radial-gradient(circle,rgba(0,137,123,0.12)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-blue-primary/12 border border-blue-primary/30 text-blue-light text-[0.78rem] font-bold uppercase tracking-[1.5px] px-4 py-1.5 rounded-full mb-2">
              <span className="w-1.5 h-1.5 bg-blue-light rounded-full animate-pulse" />
              Kenya's Affordable Choice
            </div>
            <h1 className="text-[clamp(2.6rem,5.5vw,4.2rem)] font-extrabold text-white leading-[1.25] tracking-[-1.5px]">
              Quality Appliances<br />
              <em className="not-italic text-blue-primary">Delivered</em> to Your<br />
              <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-3 after:w-full after:h-[5px] after:bg-teal-primary after:rounded-full pb-3">Doorstep</span>
            </h1>
            <p className="text-white/60 text-[1.1rem] leading-relaxed max-w-[480px] mx-auto lg:mx-0">
              Shop fridges, TVs, washing machines, microwaves & more at prices every Kenyan household can afford. Fast nationwide delivery, trusted brands.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
              <a href="#products" className="px-8 py-3.5 bg-blue-primary text-white font-bold text-[0.95rem] rounded-xl hover:bg-blue-light hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(30,58,138,0.35)] flex items-center gap-2">
                Browse Products <ChevronRight className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="px-8 py-3.5 border-2 border-white/20 text-white font-bold text-[0.95rem] rounded-xl hover:border-white/40 hover:bg-white/5 transition-all flex items-center">
                <MessageCircle className="w-5 h-5 inline mr-2" /> WhatsApp Us
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-white/8 justify-center lg:justify-start">
              {[
                { icon: Truck, text: 'Free Delivery Over 15k' },
                { icon: ShieldCheck, text: 'Warranty on All Items' },
                { icon: CreditCard, text: 'Pay on Delivery' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/55 text-[0.83rem] font-medium whitespace-nowrap">
                  <item.icon className="w-4 h-4 text-teal-primary stroke-[2.5]" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-3.5"
          >
            {[
              { tag: 'HOT', image: '/src/assets/images/regenerated_image_1778679098819.jpg', name: 'Smart TVs', price: 'Ksh 18,000' },
              { image: 'https://lh3.googleusercontent.com/d/1u3PYybXdTyDplUOE6GTvZAqS2lvDrq5k', name: 'Fridges', price: 'Ksh 42,000' },
              { tag: 'NEW', image: '/src/assets/images/regenerated_image_1778679101623.jpg', name: 'Washers', price: 'Ksh 28,000' },
              { image: '/src/assets/images/regenerated_image_1778679100165.jpg', name: 'Microwaves', price: 'Ksh 6,500' },
              { wide: true, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800', name: 'Gas Cookers & Stoves', price: 'From Ksh 8,500' }
            ].map((card, i) => (
              <div 
                key={i} 
                className={`group relative bg-white/5 border border-white/9 rounded-[18px] p-6 text-center transition-all duration-300 hover:border-blue-primary/35 hover:-translate-y-1 overflow-hidden ${card.wide ? 'col-span-2 flex items-center gap-4 text-left' : ''}`}
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={card.image} 
                    alt={card.name} 
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-ink/60" />
                </div>
                {card.tag && <span className="absolute top-2.5 right-2.5 bg-blue-primary text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full z-10">{card.tag}</span>}
                <div className="relative z-10">
                   <div className="text-white font-bold text-[0.85rem] tracking-tight">{card.name}</div>
                   <div className="text-blue-primary font-bold text-[0.78rem] mt-1">{card.price}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Marquee --- */}
      <div className="bg-blue-primary py-3 overflow-hidden whitespace-nowrap">
        <div className="flex animate-[marquee_22s_linear_infinite] gap-12 text-white font-syne font-bold text-[0.82rem] uppercase tracking-wider">
          {Array(2).fill([
            'Free delivery Nairobi', 
            'Samsung • LG • Hisense • Bruhm • Mika', 
            'Pay on Delivery Available', 
            '12-Month Warranty', 
            'Countrywide Delivery', 
            'Genuine Products Only'
          ]).flat().map((text, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              {text} <span className="text-[0.5rem] opacity-60">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* --- Why Us --- */}
      <section id="why" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <SectionHead 
                tag="Why choose us" 
                title={<>The smarter way to <span className="text-blue-primary">buy appliances</span> in Kenya</>} 
              />
              <div className="flex flex-col gap-6">
                {[
                  { icon: CreditCard, color: 'blue', title: 'Unbeatable Prices', desc: 'We cut out the middleman and pass the savings directly to you. Our prices are among the lowest in Kenya.' },
                  { icon: Truck, color: 'teal', title: 'Fast Nationwide Delivery', desc: 'Order today and receive within 24–72 hours across 40+ counties.' },
                  { icon: ShieldCheck, color: 'blue', title: 'Genuine Products & Warranty', desc: 'Every item is 100% authentic with legal warranty for total peace of mind.' },
                  { icon: MessageCircle, color: 'teal', title: 'Friendly Customer Support', desc: 'WhatsApp, call, or email 7 days a week. Real people who actually care.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className={`w-12 h-12 rounded-[13px] grid place-items-center flex-shrink-0 text-xl ${item.color === 'blue' ? 'bg-blue-pale text-blue-primary' : 'bg-teal-pale text-teal-primary'}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-ink font-bold mb-1">{item.title}</h4>
                      <p className="text-muted text-[0.9rem] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className="bg-ink rounded-[24px] p-10 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(245,93,0,0.2)_0%,transparent_70%)]" />
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {[
                  { num: '5', suffix: 'K+', label: 'Happy customers' },
                  { num: '47', suffix: '+', label: 'Counties served' },
                  { num: '200', suffix: '+', label: 'Products in stock' },
                  { num: '4.8', suffix: '★', label: 'Average rating' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/9 rounded-2xl p-6">
                    <div className="syne text-[2.2rem] font-extrabold text-white leading-none">
                      {stat.num}<span className="text-blue-primary">{stat.suffix}</span>
                    </div>
                    <div className="text-[0.8rem] text-white/50 mt-1.5 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-primary/10 border border-blue-primary/20 rounded-xl p-6 relative z-10">
                <p className="text-[0.9rem] text-white/75 italic leading-relaxed">
                  "Nilinunua fridge ya Samsung, ilifika kesho yake asubuhi. Bei ilikuwa bora sana kuliko madukani!"
                </p>
                <cite className="not-italic text-blue-primary font-bold block mt-2 text-[0.78rem]">
                  — Grace M., Westlands, Nairobi
                </cite>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Products --- */}
      <section id="products" className="py-24 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHead 
            tag="Our products" 
            title={<>Shop Top <span className="text-blue-primary">Home Appliances</span></>}
            desc="Genuine brands, unbeatable prices. All products come with warranty and can be delivered across Kenya."
          />

          <div className="flex flex-wrap gap-2.5 mb-10">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'tv', label: 'TVs' },
              { id: 'fridge', label: 'Fridges' },
              { id: 'washing', label: 'Washers' },
              { id: 'microwave', label: 'Microwaves' },
              { id: 'cooker', label: 'Cookers' },
              { id: 'lighting', label: 'Ring Light' },
              { id: 'furniture', label: 'Furniture' },
              { id: 'kitchen', label: 'Blenders' },
              { id: 'household', label: 'Iron Box' }
            ].map((cat) => (
              <button 
                key={cat.id} 
                className={`px-4.5 py-2 rounded-full font-bold text-[0.85rem] transition-all border-2 ${
                  filter === cat.id 
                    ? 'bg-blue-primary border-blue-primary text-white' 
                    : 'bg-white border-border text-ink-light hover:border-blue-primary hover:text-blue-primary'
                }`}
                onClick={() => setFilter(cat.id as Category)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-card-hover hover:border-blue-primary/20 hover:-translate-y-1.5 transition-all group"
                >
                  <div className="h-[180px] bg-white relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {product.tag && (
                      <span className={`absolute top-3 left-3 text-[0.7rem] font-extrabold px-2.5 py-1 rounded-full text-white z-10 ${
                        product.tag === 'HOT' ? 'bg-blue-primary' : 
                        product.tag === 'NEW' ? 'bg-teal-primary' : 'bg-purple-600'
                      }`}>
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex gap-0.5 mb-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < product.rating ? 'fill-orange-400 text-orange-400' : 'text-border'}`} />
                      ))}
                    </div>
                    <div className="text-[0.72rem] font-bold text-muted uppercase tracking-widest mb-1">{product.brand}</div>
                    <h4 className="text-[1rem] font-bold text-ink leading-relaxed h-14 line-clamp-2 mb-4">{product.name}</h4>
                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-muted text-[0.7rem] font-bold line-through font-sans decoration-ink-light/30 leading-none mb-1">
                          Ksh {product.originalPrice.toLocaleString()}
                        </span>
                        <div className="syne font-extrabold text-[1.25rem] text-blue-primary leading-none">
                          Ksh {product.price.toLocaleString()}
                        </div>
                      </div>
                      <button 
                        onClick={() => orderItem(product.name)}
                        className="w-10 h-10 rounded-xl bg-blue-pale text-blue-primary hover:bg-blue-primary hover:text-white transition-all grid place-items-center"
                      >
                        <Plus className="w-5 h-5 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-12">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-border font-bold text-ink-light hover:border-ink hover:text-ink transition-all">
              View Full Catalogue <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHead 
            tag="How it works" 
            title={<>Order in <span className="text-blue-primary">4 easy steps</span></>}
            desc="Getting your appliance delivered to your door has never been easier."
            center
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-11 left-[15%] right-[15%] h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-border)_0,var(--color-border)_8px,transparent_8px,transparent_16px)]" />
            {[
              { num: 1, title: 'Browse & Pick', desc: 'Find your appliance on our website or WhatsApp us and we\'ll help you choose.' },
              { num: 2, title: 'Place Your Order', desc: 'Order online via our form or directly on WhatsApp. We confirm availability instantly.' },
              { num: 3, title: 'Pay Securely', desc: 'Pay via M-Pesa, bank transfer, or choose Pay on Delivery for select towns.' },
              { num: 4, title: 'Get Delivered', desc: 'Your appliance is carefully packed and delivered — same day or next day.' }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-[52px] h-[52px] rounded-full border-2 border-border bg-white text-muted font-extrabold syne text-xl grid place-items-center mx-auto mb-5 transition-all group-hover:bg-blue-primary group-hover:border-blue-primary group-hover:text-white group-hover:scale-110">
                  {step.num}
                </div>
                <h4 className="text-[0.97rem] font-bold text-ink mb-2">{step.title}</h4>
                <p className="text-[0.85rem] text-ink-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Categories --- */}
      <section id="categories" className="py-24 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHead 
            tag="Shop by category" 
            title={<>Everything your home <span className="text-blue-primary">needs</span></>}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div 
              className="lg:row-span-2 relative h-[314px] lg:h-auto rounded-[20px] overflow-hidden group cursor-pointer"
              onClick={() => filterAndScroll('fridge')}
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1u3PYybXdTyDplUOE6GTvZAqS2lvDrq5k" 
                alt="Fridges" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-syne font-bold text-sm tracking-widest bg-blue-primary px-6 py-2 rounded-full flex items-center gap-2">SHOP FRIDGES <ChevronRight className="w-4 h-4" /></span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-5 border-t border-border/50">
                <h4 className="font-bold text-ink text-lg">Fridges & Freezers</h4>
                <p className="text-muted text-[0.85rem] mt-1">Single door, double door & chest freezers</p>
              </div>
            </div>

            {[
              { id: 'tv', name: 'Smart TVs', sub: '32" to 65" — 4K, FHD & Smart', image: '/src/assets/images/regenerated_image_1778679098819.jpg' },
              { id: 'washing', name: 'Washing Machines', sub: 'Top loaders, front loaders & twin tubs', image: '/src/assets/images/regenerated_image_1778679101623.jpg' },
              { id: 'microwave', name: 'Microwaves', sub: 'Solo, grill & convection models', image: '/src/assets/images/regenerated_image_1778679100165.jpg' },
              { id: 'cooker', name: 'Gas Cookers & Stoves', sub: '2, 3 & 4 burner with oven', image: '/src/assets/images/regenerated_image_1778679097327.jpg' },
              { id: 'lighting', name: 'Ring Fill Light', sub: 'Pro-level studio lighting for creators', image: 'https://lh3.googleusercontent.com/d/1LsB5jE_hecebsRkNti7dgXvJMuxy6PIC' },
              { id: 'furniture', name: 'Furniture', sub: 'Sofas, Tables & Office Chairs', image: 'https://lh3.googleusercontent.com/d/1LX6L3ZQHHgFl_5e0Pj65yZ09EPIlkEFh' },
              { id: 'kitchen', name: 'Binatone Blender, Grinder & Smoothie Maker', sub: 'High-speed blending & efficient grinding', image: 'https://lh3.googleusercontent.com/d/1xKAn3WH84_7RrafwI67_qH3WCokU38Ze' },
              { id: 'household', name: 'Binatone Iron Box', sub: 'Steam & dry irons for crisp clothes', image: 'https://lh3.googleusercontent.com/d/1LVgqq3w7KwKc_fMlz-l2SeRC9Lt3KmFM' }
            ].map((cat) => (
              <div 
                key={cat.id}
                className="relative h-[200px] rounded-[20px] overflow-hidden group cursor-pointer"
                onClick={() => filterAndScroll(cat.id as Category)}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-syne font-bold text-xs tracking-widest bg-blue-primary px-4 py-1.5 rounded-full uppercase flex items-center gap-1.5">Shop {cat.name} <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 border-t border-border/50">
                  <h4 className="font-bold text-ink text-[1rem] leading-tight">{cat.name}</h4>
                  <p className="text-muted text-[0.78rem] mt-1.5 leading-relaxed">{cat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Delivery --- */}
      <section id="delivery" className="py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:32px_32px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-blue-light font-bold text-[0.75rem] uppercase tracking-widest">Delivery</span>
              <h2 className="text-white font-extrabold text-[clamp(1.9rem,3.5vw,2.6rem)] leading-tight tracking-tight mb-4 mt-2">
                We deliver <span className="text-blue-primary">across Kenya</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">Fast and safe delivery to Mombasa, Kisumu, Nakuru & all 47 counties.</p>
              <div className="flex flex-col gap-6">
                {[
                  { icon: MapPin, title: 'Same-Day — Nairobi', desc: 'Order before 11am for same-day delivery in Nairobi.' },
                  { icon: Truck, title: 'Next-Day — Major Towns', desc: 'Mombasa, Kisumu, Nakuru, Eldoret & 30+ towns.' },
                  { icon: Package, title: 'Upcountry — 2 to 3 Days', desc: 'Remote areas delivered via reliable courier partners.' },
                  { icon: Zap, title: 'Free over 15k', desc: 'Free delivery to Nairobi for orders above Ksh 15,000.' }
                ].map((feat, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-primary/12 border border-blue-primary/25 grid place-items-center flex-shrink-0">
                      <feat.icon className="w-5 h-5 text-blue-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-[0.95rem] mb-1">{feat.title}</h4>
                      <p className="text-white/55 text-[0.85rem] leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} 
               whileInView={{ opacity: 1, scale: 1 }} 
               viewport={{ once: true }}
               className="bg-white/4 border border-white/8 rounded-[24px] p-8 text-center"
            >
              <div className="h-56 bg-white/3 rounded-2xl border border-white/10 border-dashed flex flex-col items-center justify-center gap-3 mb-6 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                  alt="Kenya Delivery Map"
                  className="w-full h-full object-cover opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-8 text-[0.8rem] text-white/60 font-bold uppercase tracking-widest">Delivering to all 47 counties</div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika'].map((c) => (
                  <span key={c} className="bg-blue-primary/20 border border-blue-primary/40 text-blue-light text-[0.75rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{c}</span>
                ))}
                {['Machakos', 'Nyeri', 'Meru', 'Kericho', '+ 35 more'].map((c) => (
                  <span key={c} className="bg-white/7 border border-white/10 text-white/70 text-[0.75rem] font-bold px-3 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section id="testimonials" className="py-24 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHead 
            tag="Customer reviews" 
            title={<>What Kenyans are <span className="text-blue-primary">saying</span></>}
            desc="Over 5,000 happy customers across Kenya."
            center
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'James Mwangi', loc: 'Kiambu, Nairobi', initial: 'JM', color: 'bg-blue-primary', txt: "Nilinunua TV ya Hisense 43 inch. Ilifika siku moja baadaye na ilikuwa packed vizuri sana. Bei ilikuwa ndogo sana!" },
              { name: 'Fatuma Abubakar', loc: 'Mombasa', initial: 'FA', color: 'bg-teal-primary', txt: "The washing machine I ordered arrived next day in Mombasa, well packaged. Customer service was responsive on WhatsApp." },
              { name: 'Patricia Odhiambo', loc: 'Lang\'ata, Nairobi', initial: 'PO', color: 'bg-purple-600', txt: "I was skeptical online but they had my LG fridge delivered within 6 hours. Paid on delivery too — no stress." }
            ].map((testi, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="bg-white p-7 rounded-[20px] border border-border hover:shadow-card-hover transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
                </div>
                <p className="text-[0.93rem] text-ink-light leading-relaxed italic mb-5">"{testi.txt}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full grid place-items-center text-white font-extrabold text-[0.9rem] ${testi.color}`}>{testi.initial}</div>
                  <div>
                    <div className="text-[0.9rem] font-bold text-ink">{testi.name}</div>
                    <div className="text-[0.78rem] text-muted flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-blue-primary" /> {testi.loc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section id="cta" className="bg-blue-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:22px_22px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <h2 className="text-white font-extrabold text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight mb-4">
            Ready to upgrade your home?
          </h2>
          <p className="text-white/80 text-[1.05rem] mb-10 max-w-[600px] mx-auto">Chat with us on WhatsApp or place your order now. Delivery anywhere in Kenya.</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="px-8 py-3.5 bg-white text-blue-primary font-bold text-[0.95rem] rounded-xl hover:bg-white/90 hover:-translate-y-0.5 transition-all shadow-xl">
              <MessageCircle className="w-5 h-5 inline mr-1" /> Order on WhatsApp
            </a>
            <a href="#contact" className="px-8 py-3.5 bg-transparent border-2 border-white/50 text-white font-bold text-[0.95rem] rounded-xl hover:bg-white/10 hover:border-white transition-all">
              Contact Us →
            </a>
          </div>
        </div>
      </section>

      {/* --- Contact --- */}
      <section id="contact" className="py-24 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionHead tag="Get in touch" title={<>We'd love to <span className="text-blue-primary">hear from you</span></>} desc="Reach out and we'll get back to you super fast." center />
          
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start mt-10">
            <div className="flex flex-col gap-6">
              {[
                { icon: Phone, title: 'Call or WhatsApp', val: '0758731970', link: `tel:+${WHATSAPP_NUMBER}` },
                { icon: Mail, title: 'Email', val: 'info@electronicshubke.co.ke', link: 'mailto:info@electronicshubke.co.ke' },
                { icon: MapPin, title: 'Based In', val: 'Nairobi, Kenya — Delivering Nationwide' },
                { icon: Clock, title: 'Working Hours', val: 'Mon – Sat: 8am – 8pm\nSunday: 10am – 5pm' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-[46px] h-[46px] rounded-xl bg-blue-pale grid place-items-center text-blue-primary flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[0.95rem] font-bold text-ink mb-0.5">{item.title}</h4>
                    {item.link ? (
                      <a href={item.link} className="text-[0.9rem] text-ink-light hover:text-blue-primary whitespace-pre-wrap">{item.val}</a>
                    ) : (
                      <p className="text-[0.9rem] text-ink-light whitespace-pre-wrap">{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[24px] p-10 border border-border">
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-[0.83rem] font-bold text-ink mb-1.5 uppercase tracking-wide">Your Name</label>
                  <input type="text" placeholder="e.g. Grace Wanjiru" className="w-full px-4 py-3 bg-surface border-2 border-border rounded-xl outline-none focus:border-blue-primary focus:bg-white transition-all text-sm" />
                </div>
                <div>
                   <label className="block text-[0.83rem] font-bold text-ink mb-1.5 uppercase tracking-wide">Phone / WhatsApp</label>
                   <input type="tel" placeholder="+254 7XX XXX XXX" className="w-full px-4 py-3 bg-surface border-2 border-border rounded-xl outline-none focus:border-blue-primary focus:bg-white transition-all text-sm" />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-[0.83rem] font-bold text-ink mb-1.5 uppercase tracking-wide">Email (optional)</label>
                <input type="email" placeholder="you@email.com" className="w-full px-4 py-3 bg-surface border-2 border-border rounded-xl outline-none focus:border-blue-primary focus:bg-white transition-all text-sm" />
              </div>
              <div className="mb-5">
                <label className="block text-[0.83rem] font-bold text-ink mb-1.5 uppercase tracking-wide">What are you looking for?</label>
                <select className="w-full px-4 py-3 bg-surface border-2 border-border rounded-xl outline-none focus:border-blue-primary focus:bg-white transition-all text-sm appearance-none cursor-pointer">
                  <option value="">— Select a category —</option>
                  <option>Smart TV</option>
                  <option>Fridge / Freezer</option>
                  <option>Washing Machine</option>
                  <option>Microwave</option>
                  <option>Gas Cooker / Stove</option>
                  <option>Ring Fill Light</option>
                  <option>Furniture</option>
                  <option>Binatone Blender, Grinder & Smoothie Maker</option>
                  <option>Binatone Iron Box</option>
                </select>
              </div>
              <div className="mb-5">
                <label className="block text-[0.83rem] font-bold text-ink mb-1.5 uppercase tracking-wide">Message or Budget (optional)</label>
                <textarea placeholder="Any specific requirements..." className="w-full px-4 py-3 bg-surface border-2 border-border rounded-xl outline-none focus:border-blue-primary focus:bg-white transition-all text-sm min-h-[110px]" />
              </div>
              <button 
                className="w-full py-4 bg-blue-primary text-white font-bold rounded-xl hover:bg-blue-light transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                onClick={() => alert('Enquiry sent! We will reach out to you on WhatsApp within 15 minutes.')}
              >
                Send Enquiry <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-ink text-white/50 py-16 pb-8 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <a href="#" className="flex items-center gap-[10px] mb-4">
                <div className="w-[38px] h-[38px] bg-blue-primary rounded-[10px] grid place-items-center flex-shrink-0">
                  <Bolt className="text-white w-5 h-5 fill-white stroke-2" />
                </div>
                <div>
                  <div className="syne font-extrabold text-[1.1rem] text-white tracking-tight leading-none">
                    Electronics<span className="text-blue-primary">Hub</span>
                  </div>
                  <div className="text-[0.65rem] text-white/40 font-normal tracking-[0.8px] uppercase">SolutionKE</div>
                </div>
              </a>
              <p className="text-[0.87rem] leading-relaxed mb-6 max-w-[260px]">Most affordable online home appliances store in Kenya. Genuine products & fast delivery.</p>
              <div className="flex gap-2.5">
                {[
                  { icon: Twitter, link: '#' },
                  { icon: Facebook, link: '#' },
                  { icon: Instagram, link: '#' },
                  { icon: Linkedin, link: '#' }
                ].map((s, i) => (
                  <a key={i} href={s.link} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 grid place-items-center hover:bg-blue-primary hover:border-blue-primary hover:text-white transition-all">
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {['Products', 'Company', 'Support'].map((col) => (
              <div key={col}>
                <h5 className="font-syne font-bold text-white text-[0.85rem] uppercase tracking-widest mb-5">{col}</h5>
                <ul className="flex flex-col gap-3">
                  {(col === 'Products' ? ['Smart TVs', 'Fridges', 'Washers', 'Microwaves', 'Cookers'] : 
                    col === 'Company' ? ['About Us', 'Why Us', 'Delivery', 'Reviews', 'Contact'] :
                    ['WhatsApp', 'Call Us', 'Warranty', 'Returns', 'Track Order']).map((link, i) => (
                    <li key={i}><a href="#" className="text-[0.87rem] hover:text-blue-primary transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-6 text-[0.82rem]">
            <p>© 2025 ElectronicsHubSolutionKE. Built for Kenya.</p>
            <div className="flex gap-2">
              {['M-PESA', 'Pay on Delivery', 'KRA Reg.'].map((b) => (
                <span key={b} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-white/30 font-bold uppercase tracking-tighter">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp --- */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        className="fixed bottom-7 right-7 z-[990] bg-[#25D366] w-14 h-14 rounded-full grid place-items-center shadow-2xl hover:scale-110 transition-transform group"
      >
        <span className="absolute right-[calc(100%+15px)] top-1/2 -translate-y-1/2 bg-[#25D366] text-white text-[0.8rem] font-bold px-4 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with us!
        </span>
        <MessageCircle className="text-white fill-white w-7 h-7" />
      </a>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default App;
